jQuery(document).on('click', '.btn-cart', function(e) {
    var flag = true;
    var qty = $('#qty').val();
    var cart_type = $(this).data('popup');
    var warehouse = $(this).closest('form').find("input[type='radio'].warehouse-radio:checked").val();
    var payment_plan = $("input[name='payment_plan']:checked").val();
    if(warehouse == undefined){
        alert('Please Select Stock Location');
        flag = false;
        return false;
    }
    var warehouse = $("input[type='radio'].warehouse-radio:checked").attr("warehouse");
    var shippment = $("input[type='radio'].warehouse-radio:checked").attr("shippment_no");
    $("input[name='warehouse']").val(warehouse);
    $("input[name='shippment_no']").val(shippment);
    var product_id  = $("input[name='product_id']").val();

    if(flag == true){
        if (cart_type == 'quickview') {
            var form = $("#addToCartQuickView");
        }else{
            var form = $("#addToCart");
        }
        jQuery.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('[name="_csrfToken"]').val());
                $("#loader").fadeIn(300);
         },
        type: "POST",
        data:form.serialize(),
        url:form.attr('action'),
        success: function(res) {
            if(res.status==true){
                toastr.success(res.msg).fadeOut(2000);

                var this_cart  = 'cart-btn-'+product_id;
                $(".btn-cart").attr("disabled", true);
                $('.'+this_cart).html("Added").attr("disabled", true);
                $('.'+this_cart).removeClass('btn-cart-modal');
                $(".cart-count").removeClass('d-none').text(res.data.cart_count);
                $("#addCart-modal").modal("hide");
                $("#quickview-modal").modal("hide");
                $("#cartModal").modal("show");
                // if (res.data.check_offer_variant !== null && res.data.offer.bundle !== '') {
                if ((typeof res.data.offer !== "undefined") && (typeof res.data.offer.data !== "undefined") && (typeof res.data.offer.data.bundle !== "undefined") && res.data.cart_content !== ''){
                    $('#cart-list').html('');
                    $('#cart-list').html(res.data.cart_content);
                    $(".cart-total-price").text('RM '+$('#grand_total').val());
                    $(".subtotal").text('RM '+$('#grand_total').val());
                }else{
                    if(res.data.cart_content !== ''){
                        // $('#cart-list').prepend(res.data.cart_content);
                        $('#cart-list').html('');
                        $('#cart-list').html(res.data.cart_content);
                    }
                    var total_price = 0;
                    $("#cart-list .cart-item").each(function(i, row){
                        var rows  = $(row);
                        var bundle_price = Number(rows.find('#cart_bundle_item_price').val());
                        var price = Number(rows.find('#cart_item_price').val());
                        var qty   = Number(rows.find('.product-qty').val());
                        if (!isNaN(bundle_price)) {
                            total_price += bundle_price;
                        }else{
                            if (!isNaN(price)) {
                                total_price += price*qty;
                            }
                        }
                    });
                    $(".cart-total-price").text('RM '+ReplaceNumberWithCommas(parseFloat(total_price).toFixed(2)));
                    $(".subtotal").text('RM '+ReplaceNumberWithCommas(parseFloat(total_price).toFixed(2)));
                }
            }else{
                toastr.warning(res.msg).fadeOut(2000);
            }
        },
        complete: function (data) {
            $("#loader").fadeOut(300);
        }
    });
    }
});
jQuery(document).on('click', '.change-pick', function(e) {
    var cart_id = $(this).attr("data-id");
    var get_url = $('#base_url').val();
    e.preventDefault();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
           $("#preloader").fadeIn(300);
        },
        url:get_url+'/ajax/update-cart-location',
        type: "POST",
        data: {
            "cart_id": cart_id,
        },
        success: function(data) {
            if (data.status == false) {
                toastr.warning(data.msg).fadeOut(3000);
                $("#preloader").fadeOut(300);
            }else{
                $(".cart-popup-body").empty();
                $(".cart-popup-body").append(data);
                $.magnificPopup.open({
                        items: {
                            src: '#update-cart',
                            type: 'inline'
                        }
                    });
                setTimeout(function(){
                    $("#preloader").fadeOut(300);
                },500);
            }
        },
    });
});
$(document).on('click','.warehouse-radio',function(){
    var id              = $(this).data('id');
    var key             = $(this).data('key');
    var available       = $(this).data('available');
    var variant_id      = $(this).attr("variant-id");
    var warehouse       = $(this).attr("warehouse"); //WAREHOUSE
    var cart_id         = $(this).attr("cart-id");
    var shippment       = $(this).attr("data-shippment");
    var price_plan_div  = 'price-plan-'+key+'-'+variant_id;
    var price_regular   = 'regular-price-'+key+'-'+variant_id;
    var arrive_form     = 'label-'+key+'-'+variant_id;
    var point           = 'point_'+variant_id;
    $('.'+point+' .warehouse-radio').prop('checked', false);
    $('.'+point+' .warehouse-radio').removeAttr("checked");
    // $(this).prop('checked', true);
    // $(this).attr('checked', 'checked');

    $('.qty_'+cart_id).prop('max',available);
    $('.qty_'+cart_id).change();
    if ($(this).is(":checked")) {
        // $('.'+point+' .price-radio').prop('checked', false);
        $('.'+price_plan_div).fadeIn();
        // $('#'+price_regular).prop('checked', true);
        $('.'+point+' .price-plan').not('.'+price_plan_div).hide();
        $('.'+arrive_form).css({ "color": "#F78902"});
        $('.custom-control-label').not('.'+arrive_form).removeAttr('style');

        $('.warehouse-radio').each(function () {
            var thisVariant   = (this.checked ? $(this).attr('variant-id') : "");
            var thisKey       = (this.checked ? $(this).data('key') : "");
            var checkedCss    = 'label'+'-'+ thisKey+'-'+thisVariant;
            $('.'+checkedCss).css({ "color": "#F78902"});
        });
    }else {
        $(".price-plan").hide(500);
    }
    if (!isNaN(cart_id)) {
        updatePickPoint(warehouse,cart_id,shippment);
    }else{
        $('.qty_').prop('max',available);
    }
    // $('input[id='+arrive_form+']').prop('checked', true);
    // $(this).attr('checked',true);
    var input_id = $(this).attr('id');
    $('[id*='+input_id+']').prop('checked',true);
    $('[id*='+input_id+']').attr('checked','checked');
})
function updatePickPoint(warehouse,cart_id,shippment){
    var warehouse   = warehouse;
    var cart_id     = cart_id;
    var shippment   = shippment;
    var get_url = $('#base_url').val();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
        },
        url:get_url+'/cart/update_pick_point',
        type: "POST",
        cache : false,
        data: {
            "warehouse": warehouse,
            "cart_id": cart_id,
            "shippment": shippment,
        },
        success: function(res) {
            if(res.status==true){
                toastr.success(res.msg).fadeOut(2000);
                $('#update-cart').hide();
                $('.mfp-container').hide();
            }else{
                toastr.warning(res.msg).fadeOut(3000);
            }
        },
        complete: function (data) {
            location.reload(true);
        }
    });

}
//count line total
function countLinePrice(thisVariant,thisPrice,thisQty){
    var linetotal        = 0;
    linetotal            = parseFloat(linetotal) + parseFloat(thisPrice * thisQty);
    var total            = linetotal.toFixed(2);
    var total_col        = 'total_col_'+thisVariant;
    var total_line_price  = 'total_line_'+thisVariant;
    $('.'+total_col).text(total);
    $('.'+total_line_price).val(total);
    setGrandTotal();
}
//set grand total
function setGrandTotal(){
    var freightCost     = 0;
    var total_tax       = 0;
    var subtotal        = 0;
    var order_qty       = 0;
    var shipping_cost   = 0;
    var coupon_amount   = 0;
    // $(".linetotal").each(function( index ) {
    //     subtotal += Number( $( this ).val());
    // });
    $(".line_price").each(function( index ) {
        subtotal +=  Number( $( this ).val());
    });
    $("[id*=product-qty]").each(function( index ) {
        order_qty += Number( $( this ).val());
    });
    var order_price     = subtotal+total_tax+shipping_cost-coupon_amount;
    $('.subtotal').text(order_price.toFixed(2));
    $('.itemCounter').text(order_qty);
    // $('.cart-total-price').html(order_price.toFixed(2));
}
$(document).on('change','.product-qty',function(){
    var thisVariant     = $(this).attr('variant-id');
    var thisCart        = $(this).attr('cart-id');
    var total_col       = 'price_'+thisVariant;
    var thisPrice       = $('.'+total_col).val();
    var thisQty         = $(this).val() ?? 1;
    var thisPrevValue   = $(this).attr("data-value");
    // countLinePrice(thisVariant,thisPrice,thisQty);
    // setGrandTotal();
    if (!isNaN(thisCart) && thisCart !== null && thisCart != '') {
        updateQuty(thisCart,thisVariant,thisQty,thisPrevValue,this);
    }
})
function updateQuty(thisCart,thisVariant,thisQty,thisPrevValue,the){
    var variant_id      = thisVariant;
    var cart_id         = thisCart;
    var qty             = thisQty;
    var prev_value      = thisPrevValue;
    var get_url = $('#base_url').val();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
            $("#loader").fadeIn(300);
        },
        url:get_url+'/cart/update_cart_qty',
        type: "POST",
        async :false,
        cache : false,
        data: {
            "variant_id": variant_id,
            "cart_id": cart_id,
            "prev_value": prev_value,
            "qty": qty,
        },
        success: function(res) {
            if(res.status==true){
                $(the).attr('data-value',thisQty);
                $('#order-info').empty();
                $('#order-info').html(res.data.checkout_content);
                $('#mob-order-info').html(res.data.checkout_content);
                // $(".cart-count").removeClass('d-none').text(res.data.cart_count);
                // if (res.data.check_offer_variant !== null && res.data.cart_content !== '') {
                if ((typeof res.data.offer !== "undefined") && (typeof res.data.offer.data !== "undefined") && (typeof res.data.offer.data.bundle !== "undefined") && res.data.cart_content !== '') {
                    $('#cart-list').html('');
                    $('#cart-list').html(res.data.cart_content);
                    $(".cart-total-price").text('RM '+$('#grand_total').val());
                    $(".subtotal").text('RM '+$('#grand_total').val());
                    // $(".saved_amount").text('RM '+$('#grand_regular').val());
                }else{
                    if(res.data.cart_content !== '') {
                        $('#cart-list').html('');
                        $('#cart-list').html(res.data.cart_content);
                    }
                    var total_price = 0;
                    $("#cart-list .cart-item").each(function(i, row){
                        var rows  = $(row);
                        var bundle_price = Number(rows.find('#cart_bundle_item_price').val());
                        var price = Number(rows.find('#cart_item_price').val());
                        var qty   = Number(rows.find('.product-qty').val());
                        if (!isNaN(bundle_price)) {
                            total_price += bundle_price;
                        }else{
                            if (!isNaN(price)) {
                                total_price += price*qty;
                            }
                        }
                    });
                    $(".cart-total-price").text('RM '+ReplaceNumberWithCommas(parseFloat(total_price).toFixed(2)));
                    $(".subtotal").text('RM '+ReplaceNumberWithCommas(parseFloat(total_price).toFixed(2)));
                }
                $(".cart-count").removeClass('d-none').text(res.data.cart_count);
                toastr.success(res.msg).fadeOut(2000);
            }
            else{
                toastr.warning(res.msg);
                $(the).attr('data-value',prev_value);
                $(the).val(prev_value);
            }
        },
        complete: function (data) {
            $("#loader").fadeOut(300);
        }
    });
}
$(document).on('click','#add_order_note',function(){
    var order_note = $('#order_note').val();
    var get_url = $('#base_url').val();

    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
        },
        url:get_url+'/cart/update_order_note',
        type: "POST",
        data: {
            "order_note": order_note,
        },
        success: function(res) {
            if(res.status==true){
                toastr.success(res.msg).fadeOut(2000);
            }
            else{
                toastr.warning(res.msg).fadeOut(3000);
            }
        },
    });
});
function ReplaceNumberWithCommas(Number) {
    //Seperates the components of the number
    var n= Number.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}
