$(function() {
    $("input:checkbox:not(:checked)").each(function(){
        $(this).siblings("label[for='"+ this.id +"']").css("color","");
    });
});
$(document).on('click','#self-collect',function(){
    if ($(this).is(":checked")) {
        $(".pickup-location").show(500);
        $(".shipping-address").hide(500);
        $(".shipping-address-section").hide(500);
        $('#pickup-location').attr( 'checked', true );
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').removeAttr('required');
        $(".shipping-address input,select,textarea").jqBootstrapValidation("destroy");
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').attr('required',true);
        $(".billing-address").show(500);
        $(".billing-list").hide(500);
        $("#billing_add_name").show(500);
    }else {
    }
})
$(document).on('click','#new_customer',function(){
    if ($(this).is(":checked")) {
        $(".new_customer").show(500);
        $(".existing_customer").hide(500);
    }
})
$(document).on('click','#existing_customer',function(){
    if ($(this).is(":checked")) {
        $(".new_customer").hide(500);
        $(".existing_customer").show(500);
    }
})
$(document).on('click','#checkout_submit',function(){
    $("#loader").fadeIn(300);
})
$(document).ready(function(){
    if ($('#different-address').is(":checked") && $('#courier-delivey').is(":checked")) {
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').attr('required',true);
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').attr('required');
    }else if($('#self-collect').is(":checked")){
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').attr('required',true);
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').removeAttr('required');
        $(".shipping-address input,select,textarea").jqBootstrapValidation("destroy");
    }else{
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').attr('required');
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').removeAttr('required');
        $(".billing-address input,select,textarea").jqBootstrapValidation("destroy");
    }
    if ( $('#self-collect').is(":checked")) {
        $(".pickup-location").show(500);
        $(".shipping-address").hide(500);
        $(".shipping-address-section").hide(500);
        $('#pickup-location').attr( 'checked', true );
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').removeAttr('required');
        $(".shipping-address input,select,textarea").jqBootstrapValidation("destroy");
        $(".billing-address").show(500);
        $(".billing-list").hide(500);
        $("#billing_add_name").show(500);
    }
    var saved_address = $('#saved-address').find(":selected").val();
    if (saved_address > 0) {
        // $('#shipping_phone').attr('disabled',true);
        // $('#city2').attr('disabled',true);
        // $('#state2').attr('disabled',true);
        // $('#post_code_2').attr('disabled',true);
        // $('#shipping-country').attr('disabled',true);
    }
    // 3 installments
    split_ins('downpayment_90',3,1);
    // 6 installments
    split_ins('downpayment_180',6,0);

    if($('#coupon_regular_discount').val() > 0){
        // $('#accrodon_2').fadeOut();
        // $('#accrodon_3').fadeOut();
        // $('#accrodon_1 .card-header').trigger('click');
        // $('#accrodon_1 .card-header').find('input[type=radio]').attr( 'checked', true );
        // $('#collapseOne').addClass('show');
    }
})
$(document).on('change keypress paste keyup input','#downpayment_90',function() {
    // split_ins('downpayment_90',3,1);
    calc_ins_amounts('downpayment_90',3,1);
})
$(document).on('change keypress paste keyup input','#downpayment_180',function() {
    // split_ins('downpayment_180',6,0);
    calc_ins_amounts('downpayment_180',6,0);
})
//pickup-location
function ReplaceNumberWithCommas(Number) {
    //Seperates the components of the number
    var n= Number.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}
$(document).on('click','.payment-card .card-header',function(){
    $('.payment-card').find('input[type=radio]').attr( 'checked', false );
    var price_type = $(this).find('input[type=radio]').val();
    // if (price_type == 'azuramart-180') { //installment price
    var item_price      = 0;
    var item_qty        = 0;
    var line_total      = 0;
    var sub_total       = 0;
    var total           = 0;
    var postage_cost    = 0;
    var discount        = price_type == 'azuramart-180' ? $('#coupon_ins_discount').val() : $('#coupon_regular_discount').val();
    $('#checkout_summary > #cart_item').each(function (i, row) {
        var rows            = $(row);
        item_price          = price_type == 'azuramart-180' ? rows.find('#installment_price').val() : rows.find('#regular_price').val();
        if (rows.hasClass('bundle_tr')) {
            sub_total           += Number(item_price);
            var saved_amount = price_type == 'azuramart-180' ? rows.find('#ins_saved_amount').val() : rows.find('#regular_saved_amount').val();
            $(this).closest('tr').prev().find('[id*=offer_price]').html('Offer Value RM '+ReplaceNumberWithCommas(parseFloat(item_price).toFixed(2))+', You saved RM '+ReplaceNumberWithCommas(parseFloat(saved_amount).toFixed(2)));
        }else{
            item_qty            = Number(rows.find('#item_qty').text());
            line_total          = item_price*item_qty;
            sub_total           += line_total;
            line_total          = parseFloat(line_total).toFixed(2);
            line_total          = ReplaceNumberWithCommas(line_total)
            item_price          = parseFloat(item_price).toFixed(2);
            item_price          = ReplaceNumberWithCommas(item_price)
            rows.find('#line_total').html(line_total);
            rows.find('#price').html(item_price);
        }
    });

    $('#checkout_summary2 > #cart_item').each(function (i, row2) {
        rows                = $(row2);
        item_price          = price_type == 'azuramart-180' ? rows.find('#installment_price').val() : rows.find('#regular_price').val();
        if (rows.hasClass('bundle_tr')) {
            var saved_amount = price_type == 'azuramart-180' ? rows.find('#ins_saved_amount').val() : rows.find('#regular_saved_amount').val();
            rows.closest('tr').prev().find('[id*=offer_price]').html('Offer Value RM '+ReplaceNumberWithCommas(parseFloat(item_price).toFixed(2))+', You saved RM '+ReplaceNumberWithCommas(parseFloat(saved_amount).toFixed(2)));
        }else{
            item_qty            = Number(rows.find('#item_qty').text());
            line_total          = item_price*item_qty;
            line_total          = parseFloat(line_total).toFixed(2);
            line_total          = ReplaceNumberWithCommas(line_total)
            item_price          = parseFloat(item_price).toFixed(2);
            item_price          = ReplaceNumberWithCommas(item_price)
            rows.find('#line_total').html(line_total);
            rows.find('#price').html(item_price);
        }
    });
    total                   = sub_total
    postage_cost            = Number($('#postage_cost').text());
    sub_total               = sub_total.toFixed(2)
    sub_total               = ReplaceNumberWithCommas(sub_total)
    $('[id*=sub_total]').text(sub_total);
    if (postage_cost > 0) {
        total           += postage_cost;
    }
    if (discount > 0) {
        total           -= discount;
        $('[id*=coupon_discount]').html(ReplaceNumberWithCommas(parseFloat(discount).toFixed(2)));
    }
    total               = total.toFixed(2)
    total               = ReplaceNumberWithCommas(total)
    $('[id*=total_price]').text(total);
    $(this).find('input[type=radio]').attr( 'checked', true );
})
function split_ins(id,ins_count,is_regular) {
    var downpayment = Number($('#'+id).val());
    var total_price = is_regular == 1 ? Number($('#total_price_hidden').val()) : Number($('#total_price_ins_hidden').val());
    // total_price += Number($('#postage_cost').text());
    // var total_price = Number($('#total_price_hidden').val());
    var spare_amount = total_price-downpayment;
    var ins_amount = spare_amount/ins_count;
    ins_amount = Math.floor(ins_amount);
    var last_ins = 0;
    var middle_ins = 0;
    for (let i = 1; i < ins_count; i++) {
        middle_ins += ins_amount;
        $('#'+id+'_'+i).val(ins_amount);
        $('#'+id+'_'+i).attr('data-value',ins_amount);
    }
    middle_ins = parseFloat(middle_ins);
    last_ins = total_price-(downpayment+middle_ins);
    $('#'+id+'_'+ins_count).val(last_ins);
    $('#'+id+'_'+ins_count).attr('data-value',last_ins);

}
function calc_ins_amounts(id,ins_count,is_regular) {
    var new_val = Number($('#'+id).val());
    var init_value = Number($('#'+id).attr('min'));
    var p_difference = new_val-init_value;

    for (var i = 0; i < ins_count+1; i++) {
        if (i > 0) {
            var input_val = Number($('#'+id+'_'+i).data('value'));
            if (new_val <= init_value) {
                $('#'+id+'_'+i).val(input_val+(init_value-new_val));
            }else if(new_val > init_value ){
                if (p_difference >= input_val) {
                    $('#'+id+'_'+i).val(0);
                    p_difference -= input_val;
                }else{
                    $('#'+id+'_'+i).val(input_val-p_difference);
                    p_difference = 0;
                }
            }
        }
    }
}
$(document).on('click','#courier-delivey',function(){
    if ($(this).is(":checked")) {
        $(".shipping-address").show(500);
        $(".pickup-location").hide(500);
        $(".shipping-address-section").show(500);
        $('#pickup-location').attr( 'checked', false );
        $(".billing-address").hide(500);
        $(".billing-list").show(500);
        $('#different-address').attr( 'checked', false );
        $('#different-address').prop( 'checked', false );
        $("#billing_add_name").hide(500);
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').attr('required',true);
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').removeAttr('required');
        $(".billing-address input,select,textarea").jqBootstrapValidation("destroy");
    } else {
        $(".shipping-address").hide();
        $(".pickup-location").show();
        $(".shipping-address-section").hide(500);
    }
})
$(document).on('change','#saved-address',function(){
    var address_id = $(this).val();
     var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        url:get_url+'/ajax/get-address/'+address_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (res) {
            if(res.status==true){
                $('#shipping_first_name').val(res.data.NAME);
                $('#shipping_last_name').val(res.data.LAST_NAME);
                $('#shipping_phone').val(res.data.TEL_NO);
                $('#shipping_address_line_1').val(res.data.ADDRESS_LINE_1);
                $('#shipping_address_line_2').val(res.data.ADDRESS_LINE_2);
                $('#city2').html('<option value="">Select City</option><option value="'+res.data.CITY+'" selected="">'+res.data.city_name+'</option>');
                $('#city2').val(res.data.CITY).change();
                $('#state2').html('<option value="">Select State</option><option value="'+res.data.STATE+'" selected="">'+res.data.state_name+'</option>');
                $('#state2').val(res.data.STATE).change();
                $('#post_code_2').val(res.data.POST_CODE);
                $('#post_code_hidden_2').val(res.data.POST_CODE);
                // $('#shipping_phone').attr('disabled',true);
                // $('#city2').attr('disabled',true);
                // $('#state2').attr('disabled',true);
                // $('#post_code_2').attr('disabled',true);
                // $('#shipping-country').attr('disabled',true);
                $("#loader").fadeOut(300);
            }
            else{
                $('#shipping_first_name').val('');
                $('#shipping_last_name').val('');
                $('#shipping_phone').val('');
                $('#shipping_address_line_1').val('');
                $('#shipping_address_line_2').val('');
                $('#city2').html('<option value="">Select City</option>');
                $('#state2').html('<option value="">Select State</option>');
                $('#post_code_2').val('');
                // $('#shipping_phone').attr('disabled',false);
                // $('#city2').attr('disabled',false);
                // $('#state2').attr('disabled',false);
                // $('#post_code_2').attr('disabled',false);
                // $('#shipping-country').attr('disabled',false);
                $("#loader").fadeOut(300);
            }
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
})
$(document).on('click','#custom_address',function(){
    if ($(this).is(":checked")) {
        $("#shipping-city").hide();
        $("#custom-city-div").show();
        $("#shipping-state").hide();
        $("#custom-state-div").show();
        $("#post_code_").val('');
        $("#city").val('');
        $("#state").val('');
        $("#shipping-postcode").hide();
        $("#custom-postcode-div").show();
    } else {
        $("#shipping-city").show();
        $("#custom-city-div").hide();
        $("#shipping-state").show();
        $("#custom-state-div").hide();
        $("#shipping-postcode").show();
        $("#custom-postcode-div").hide();
        $("#shipping-postcode").val('');
    }
})
$(document).on('click','#sameas-billing',function(){
    if ($(this).is(":checked")) {
        $(".shipping-address").hide(500);
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').removeAttr('required');
        $(".shipping-address input,select,textarea").jqBootstrapValidation("destroy");
    } else {
        $(".shipping-address").show();
        $('#shipping_first_name,#shipping_address_line_1,#post_code_2,#shipping-country,#shipping_phone,#city2,#state2').attr('required',true);
    }
})
$(document).on('click','#different-address',function(){
    if ($(this).is(":checked")) {
        $(".billing-address").show(500);
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').attr('required',true);
    }
    else{
        $(".billing-address").hide(500);
        $('#billing_first_name,#billing_address,#post_code_,#billing-country,#billing_phone,#city,#state').removeAttr('required');
        $(".billing-address input,select,textarea").jqBootstrapValidation("destroy");
    }
})

$(document).on('change','#checkout-terms-conditions',function(e){
    if(this.checked) {
        $('#terms_conditions_modal').modal('show');
    }
});

$('#city2,#state2').on('click', function (e) {
    if( $('#post_code_2').val().length === 0 ) {
     $('#post_code_2').css('border-color','#dc3545');
     var msg = "Please provide a valid postcode first";
     $('.post_code_alert').show().html(msg);
    }
});
$('#city,#state').on('click', function (e) {
    if( $('#post_code_').val().length === 0 ) {
     $('#post_code_').css('border-color','#dc3545');
     var msg = "Please provide a valid postcode first";
     $('.post_code_alert_2').show().html(msg);
    }
});
$("#post_code_2").on("keyup change", function(e) {
    $('#post_code_2').css('border-color','#d5d5d5');
    $('.post_code_alert').hide(500);
})
$("#post_code_").on("keyup change", function(e) {
    $('#post_code_').css('border-color','#d5d5d5');
    $('.post_code_alert_2').hide(500);
})

$(document).on('click', '#step_0_submit',function(e){
    $('.help-error').remove();
    $('input[required],select[required]').not('input[name="coupon_code"]').each(function() {
        if( $(this).val() == ''){
          $(this).addClass('inputError');
          var message = $(this).attr("data-validation-required-message") ?? 'This field is required';
          $(this).after('<span class="help-error d-block text-danger"> '+message+' </span>');
        }
    });
    if($('#checkout-terms-conditions').prop('checked')){
        $('#checkbox-error').hide();
    }
    else{
        var message = $('#checkout-terms-conditions').attr("data-validation-required-message") ?? 'This field is required';
        $('#checkbox-error').html('<span class="help-error d-block text-danger"> '+message+' </span>');
    }

    if( $('#password').val() !== ''){
        if($("#password").val().replace(/ /g,'').length < 6){
            var message = 'Password length must be at least 6 characters';
            $('#pass-val').html('<span class="help-error d-block text-danger"> '+message+' </span>');
            return false;
        }

    }

})

$(document).on('change keyup','.inputError',function(e){
    $(this).removeClass('inputError');
    $(this).parent().find(".help-error").remove();
    if( $('#post_code_hidden_2').val() !== ''){
        $('#city2,#state2').parent().find(".help-error").remove();
        $('#city2,#state2').removeClass('inputError');
    }
    if( $('#post_code_').val() !== ''){
        $('#city,#state').parent().find(".help-error").remove();
        $('#city,#state').removeClass('inputError');
    }
})

$(document).on('change','#checkout-terms-conditions',function(e){
    if ($(this).is(':checked')) {
        $('#checkbox-error').hide(300);
    }
    else{
         $('#checkbox-error').show(300);
    }
});
$(document).on('change keyup','#password',function(e){
    $('.toggle-password').show();
    if($("#password").val().replace(/ /g,'').length > 5){
        $('#pass-val').hide();
    }
});
$(document).on('click','.toggle-password',function(e){
    $(this).toggleClass("fa-eye fa-eye-slash");
    input = $(this).parent().find("input");
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(function() {
    if($('#password').val() == ''){
        $('.toggle-password').hide();
    }
    else{
        $('.toggle-password').show();
    }
});
$(document).on('click','#apply_coupon',function (){
    $('#coupon_form .help-error').remove();
    var form = $("#coupon_form");
    if ($('input[id="coupon_code"]').val() == '') {
        var message = $('input[id="coupon_code"]').attr("data-validation-required-message") ?? 'This field is required';
        $('input[id="coupon_code"]').after('<span class="help-error d-block text-danger"> '+message+' </span>');
        $('input[id="coupon_code"]').addClass('inputError');
        return false;
    }
    $('input[id="coupon_code2"]').val($('input[id="coupon_code"]').val());
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="_csrfToken"]').val());
            $("#apply_coupon").attr('disabled',true);
            $(".fa-spin").fadeIn();
        },
        type: "POST",
        data:form.serialize(),
        url:form.attr('action'),
        success: function(res) {
            if(res.status==true){
                $("[id*=total_price]").text(ReplaceNumberWithCommas(parseFloat((res.data.regular_price+res.data.postage_cost)-res.data.regular_coupon_discount).toFixed(2)));
                toastr.success(res.msg);
                if (res.data.is_reset == 1) {
                    $("#apply_coupon span").text('Apply');
                    $("#coupon_code").val('');
                    $("#apply_coupon2 span").text('Apply');
                    $("#coupon_code2").val('');
                    $("#coupon_code").attr('disabled',false);
                    $("#coupon_code2").attr('disabled',false);
                    $("[id*=discount_tr]").fadeOut();
                    $("[id*=coupon_status_msg]").html('');
                    $("#coupon_regular_discount").val(0);
                    $("#coupon_ins_discount").val(0);
                    // $('#accrodon_3').fadeIn();
                    // $('#accrodon_2').fadeIn();
                }else{
                    var discount_amount = ReplaceNumberWithCommas(parseFloat(res.data.regular_coupon_discount).toFixed(2));
                    $("#apply_coupon span").text('Reset');
                    $("#apply_coupon2 span").text('Reset');
                    $("[id*=discount_tr]").css('display','table-row');
                    // $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM'+discount_amount+' ('+res.data.discount+'% off)');
                    if (res.data.coupon_type == 1) {
                        $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM'+discount_amount+' ('+res.data.discount+'% off)');
                    }else{
                        $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM '+discount_amount);
                    }
                    $("[id*=coupon_discount]").text(discount_amount);
                    $("#coupon_regular_discount").val(res.data.regular_coupon_discount);
                    $("#coupon_ins_discount").val(res.data.ins_coupon_discount);
                    // $('#accrodon_2').fadeOut();
                    // $('#accrodon_3').fadeOut();
                    // $('#accrodon_1 .card-header').trigger('click');
                    // $('#accrodon_1 .card-header').find('input[type=radio]').attr( 'checked', true );
                    $("#coupon_code").attr('disabled',true);
                    $("#coupon_code2").attr('disabled',true);
                }
                var total_price_reg = res.data.regular_price+res.data.postage_cost-res.data.regular_coupon_discount;
                var downpayment_90 = (20/100)*(total_price_reg);
                $('#total_price_hidden').val(total_price_reg);
                downpayment_90 = Math.round(downpayment_90);
                $('input[name="downpayment_90"]').val(downpayment_90);
                $('input[name="downpayment_90"]').attr('min',downpayment_90);
                $('input[name="downpayment_90"]').attr('max',total_price_reg);

                var total_price_ins = res.data.ins_price+res.data.postage_cost-res.data.ins_coupon_discount;
                var downpayment_180 = (20/100)*(total_price_ins);
                $('#total_price_ins_hidden').val(total_price_ins);
                downpayment_180 = Math.round(downpayment_180);
                $('input[name="downpayment_180"]').val(downpayment_180);
                $('input[name="downpayment_180"]').attr('min',downpayment_180);
                $('input[name="downpayment_180"]').attr('max',total_price_ins);
                // 3 installments
                split_ins('downpayment_90',3,1);
                // 6 installments
                split_ins('downpayment_180',6,0);
            }else{
                toastr.warning(res.msg);
                $("#apply_coupon").attr('disabled',false);
                $(".fa-spin").fadeOut();
            }
        },
        complete: function (data) {
            $("#apply_coupon").attr('disabled',false);
            $(".fa-spin").fadeOut();
        }
    });
});
$(document).on('click','#apply_coupon2',function (){
    $('#coupon_form2 .help-error').remove();
    var form = $("#coupon_form2");
    if ($('input[id="coupon_code2"]').val() == '') {
        var message = $('input[id="coupon_code2"]').attr("data-validation-required-message") ?? 'This field is required';
        $('input[id="coupon_code2"]').after('<span class="help-error d-block text-danger"> '+message+' </span>');
        $('input[id="coupon_code2"]').addClass('inputError');
        return false;
    }
    $('input[id="coupon_code"]').val($('input[id="coupon_code2"]').val());
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="_csrfToken"]').val());
            $("#apply_coupon2").attr('disabled',true);
            $(".fa-spin").fadeIn();
        },
        type: "POST",
        data:form.serialize(),
        url:form.attr('action'),
        success: function(res) {
            if(res.status==true){
                $("[id*=total_price]").text(ReplaceNumberWithCommas(parseFloat((res.data.regular_price+res.data.postage_cost)-res.data.regular_coupon_discount).toFixed(2)));
                toastr.success(res.msg);
                if (res.data.is_reset == 1) {
                    $("#apply_coupon span").text('Apply');
                    $("#apply_coupon2 span").text('Apply');
                    $("#coupon_code").val('');
                    $("#coupon_code2").val('');
                    $("#coupon_code").attr('disabled',false);
                    $("#coupon_code2").attr('disabled',false);
                    $("[id*=discount_tr]").fadeOut();
                    $("[id*=coupon_status_msg]").html('');
                    $("#coupon_regular_discount").val(0);
                    $("#coupon_ins_discount").val(0);
                    // $('#accrodon_3').fadeIn();
                    // $('#accrodon_2').fadeIn();
                }else{
                    var discount_amount = ReplaceNumberWithCommas(parseFloat(res.data.regular_coupon_discount).toFixed(2));
                    $("#apply_coupon span").text('Reset');
                    $("#apply_coupon2 span").text('Reset');
                    $("[id*=discount_tr]").css('display','table-row');
                    // $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM'+discount_amount+' ('+res.data.discount+'% off)');
                    if (res.data.coupon_type == 1) {
                        $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM'+discount_amount+' ('+res.data.discount+'% off)');
                    }else{
                        $("[id*=coupon_status_msg]").html('Coupon applied !<br>'+'-RM '+discount_amount);
                    }
                    $("[id*=coupon_discount]").text(discount_amount);
                    $("#coupon_regular_discount").val(res.data.regular_coupon_discount);
                    $("#coupon_ins_discount").val(res.data.ins_coupon_discount);
                    // $('#accrodon_2').fadeOut();
                    // $('#accrodon_3').fadeOut();
                    // $('#accrodon_1 .card-header').trigger('click');
                    // $('#accrodon_1 .card-header').find('input[type=radio]').attr( 'checked', true );
                    $("#coupon_code").attr('disabled',true);
                    $("#coupon_code2").attr('disabled',true);
                }
                var total_price_reg = res.data.regular_price+res.data.postage_cost-res.data.regular_coupon_discount;
                var downpayment_90 = (20/100)*(total_price_reg);
                $('#total_price_hidden').val(total_price_reg);
                downpayment_90 = Math.round(downpayment_90);
                $('input[name="downpayment_90"]').val(downpayment_90);
                $('input[name="downpayment_90"]').attr('min',downpayment_90);
                $('input[name="downpayment_90"]').attr('max',total_price_reg);

                var total_price_ins = res.data.ins_price+res.data.postage_cost-res.data.ins_coupon_discount;
                var downpayment_180 = (20/100)*(total_price_ins);
                $('#total_price_ins_hidden').val(total_price_ins);
                downpayment_180 = Math.round(downpayment_180);
                $('input[name="downpayment_180"]').val(downpayment_180);
                $('input[name="downpayment_180"]').attr('min',downpayment_180);
                $('input[name="downpayment_180"]').attr('max',total_price_ins);
                // 3 installments
                split_ins('downpayment_90',3,1);
                // 6 installments
                split_ins('downpayment_180',6,0);
            }else{
                toastr.warning(res.msg);
                $("#apply_coupon2").attr('disabled',false);
                $(".fa-spin").fadeOut();
            }
        },
        complete: function (data) {
            $("#apply_coupon2").attr('disabled',false);
            $(".fa-spin").fadeOut();
        }
    });
});
