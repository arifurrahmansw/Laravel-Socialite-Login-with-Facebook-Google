$(window).on('load', function() {
    $('#status').fadeOut();
   // $('#preloader').delay(200).fadeOut('slow');
  //  $('#preloader').fadeOut();
   // $('body').delay(200).css({'overflow':'visible'});
   $('body').css({'overflow':'visible'});

  //  $("#cartModal").modal("show");
  })
  $("[id*=registerForm]").find('input').jqBootstrapValidation();
  $("[id*=loginForm]").find('input').jqBootstrapValidation();
  $("[id*=register-form]").find('input').jqBootstrapValidation();
  $("[id*=login-form]").find('input').jqBootstrapValidation();
  $("[id*=updateCredential]").find('select').jqBootstrapValidation();
  $("[id*=updateCredential]").find('input').jqBootstrapValidation();
  $(function(e){
  $("#preloader").fadeOut();
  $("body").css("overflow", "visible");
});

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
$(document).on('click','.btn-quickview',function(e){
    e.preventDefault();
    var variant_id = ($(this).attr("data-id"));
    var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        url:get_url+'/product/product-quickview/'+variant_id,
        async :true,
        beforeSend: function () {
           // $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (data) {
            $("#quickView").empty();
            $("#quickView").append(data);
            $("body").css("cursor", "default");
            setTimeout(function(){
                $("#loader").fadeOut(300);
              },500);
            $("#quickview-modal").modal("show");
        },
        complete: function (data) {
           // $("body").css("cursor", "default");
        }
    });
})

$(document).on('click','.variant-thumb',function(e){
    e.preventDefault();
    var variant_id = ($(this).attr("data-id"));
    var master_id = ($(this).attr("data-master"));
    var section = ($(this).attr("data-section"));
    var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        data:{master_id:master_id,section:section },
        url:get_url+'/ajax/get-variant/'+variant_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("a").css("cursor", "progress");
            // $("#loader").fadeIn(300);
        },
        success: function (data) {
            var product  = 'prd-master-'+master_id;
            $('.'+product).empty();
            $('.'+product).append(data);
            //$('.product-nav-slider').owlCarousel();
            $('.product-nav-slider').owlCarousel({
                loop: false,
                //nav: true,
                navText: [
                    "<i class='icon-angle-left'></i>",
                    "<i class='icon-angle-right'></i>"
                ],
                dots: false,
                autoplay: false,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                    items: 3,
                    nav: true,
                    },
                    380: {
                    items: 3,
                    nav: true,
                    },
                    600: {
                    items: 5,
                    nav: true,
                    },
                    1000: {
                    items: 4,
                    nav: false
                    },
                    1100: {
                    items: 4,
                    nav: false
                    },
                    1300: {
                    items: 4,
                    nav: false
                    },
                    1301: {
                    items: 5,
                    nav: false
                        }
                }

            })
        },
        complete: function (data) {
          $("body").css("cursor", "default");
          $("a").css("cursor", "pointer");
        }
    });
})

$(document).on('click','.btn-cart-modal',function(e){
    e.preventDefault();
    var variant_id = ($(this).attr("data-id"));
    var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        url:get_url+'/cart/get-cart-modal/'+variant_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            //$("#loader").fadeIn();
        },
        success: function (data) {
            $("#addCart").empty();
            $("#addCart").append(data);
            //$("#loader").fadeOut();
            $("#addCart-modal").modal("show");
        },
        complete: function (data) {
            $("body").css("cursor", "default");
           // $("#loader").fadeOut();
        },
        error: function () {
            toastr.error('something wrong');
          //  $("#loader").fadeOut();
        }
    });
})
 //payplan -popup
$(document).on('click','.payplan-modal-btn',function(e){
    e.preventDefault();
    var variant_id = ($(this).attr("data-id"));
    var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        url:get_url+'/product/paypaln-popup/'+variant_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (data) {
            $(".payplan-box").empty();
            $(".payplan-box").append(data);
            $.magnificPopup.open({
                    items: {
                        src: '#payplan-modal',
                        type: 'inline'
                    }
                });
            setTimeout(function(){
                $("#loader").fadeOut(300);
              },500);
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
})

jQuery(document).on('click', '.btn-wishlist,.btn-wishlist-detals', function(e) {
    var wishlist_id = $(this).attr("data-id");
    var get_url = $('#base_url').val();
    e.preventDefault();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
        },
        url:get_url+'/wishlist/add-to-wishlist',
        type: "POST",
        data: {
            "wishlist_id": wishlist_id,
        },
        success: function(res) {
            // console.log(res);
            if(res.status==true){
                toastr.success(res.msg);
                $(".btn-wishlist").attr("disabled", false);
                if(res){
                   $(".wishlist-count").html(res.data);
                   $('.wishlist-'+wishlist_id).addClass('wishlist-added');
                }else{
                }
            }
            else{
                toastr.warning(res.msg);
            }
        },
    });
});

jQuery(document).on('click', '.remove-wishlist', function(e) {
    var wishlist_id = $(this).attr("data-wishlist");
    if (!confirm("Do you want to delete")){
        return false;
        }
    var get_url = $('#base_url').val();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
        },
        url:get_url+'/wishlist/remove-wishlist',
          type: "POST",
        data: {
            "wishlist_id": wishlist_id,
        },
        success: function(res) {
            if(res.status==true){
                toastr.success(res.msg);
                $('.wishlist-'+wishlist_id).remove();
                $(".btn-wishlist").attr("disabled", false);
                $(".btn-wishlist span").text('Add to wishlist');
                if(res.data.wishlist_count > 0){
                    $(".wishlist-count").text(res.data.wishlist_count);
                }else{
                    $(".wishlist-count").addClass('d-none').text(0);
                }
                $(".wishlist-total-price").text(res.data.wishlist_total);
            }
            else{
                toastr.warning(res.msg);
            }
        },
    });
});

jQuery(document).on('click', '.btn-remove,.remove-cart', function(e) {
    e.preventDefault();
    var qty = $(this).closest('.row').find('input').val();
    var cart_id     = $(this).attr("data-cart");
    var product_id  = $(this).attr("product-id");
    var the = this;
    // if (!confirm("Do you want to delete")){
    //     return false;
    //     }
    var get_url = $('#base_url').val();
    jQuery.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('[name="csrf-token"]').attr('content'));
            $("#loader").fadeIn(300);
        },
        url:get_url+'/cart/remove-cart',
        type: "POST",
        data: {
            "cart_id": cart_id,
            "qty": qty,
        },
        success: function(res) {
            if(res.status==true){
               // toastr.success(res.msg);
               $(the).closest('.cart-'+cart_id).remove();
                $(".btn-cart,.btn-cart-modal").attr("disabled", false);
                $(".btn-cart span").text('Add to cart');
                $('.cart-btn-'+product_id).text('Add to cart');
                $('.cart-btn-'+product_id).addClass('btn-cart-modal').attr("disabled", false);
                $(".btn-cart").addClass('btn-cart-modal');
                if(res.data.cart_count > 0){
                    $(".cart-count").text(res.data.cart_count);
                }else{
                    $(".cart-count").addClass('d-none').text(0);
                }
                $('#order-info').empty();
                $('#order-info').html(res.data.checkout_content);
                $('#mob-order-info').empty();
                $('#mob-order-info').html(res.data.checkout_content);
                if(res.data.cart_count == 0){
                    $('#cart-list').html('');
                }
                if (res.data.check_offer_variant !== null) {
                    if (res.data.cart_content !== '') {
                        $('#cart-list').html('');
                        $('#cart-list').html(res.data.cart_content);
                        $(".cart-total-price").text('RM '+$('#grand_total').val());
                        $(".subtotal").text('RM '+$('#grand_total').val());
                    }
                    // $(".cart-total-price").text(res.data.offer.grand_total);
                }else{
                    var total_price = 0;
                    $("#cart-list .cart-item").each(function(i, row){
                        if(res.data.cart_count == 0){
                            $('#cart-list').html('');
                        }
                        if (res.data.cart_content !== '') {
                            $('#cart-list').html('');
                            $('#cart-list').html(res.data.cart_content);
                        }
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
            }
            else{
                toastr.warning(res.msg);
            }
            $("#loader").fadeOut(300);
        },
    });
});

function duplicateEmail(e) {
    var email = $(e).val();
    var get_url = $('#base_url').val();
    $.ajax({
        type: "POST",
        url:get_url+'/user/check-email',
        data: {
            email: email
        },
        dataType: "json",
        success: function (data) {
            if (data == true) {
                toastr.error('User Already Exist');
                $('#email').val('');
            }
        },
        error: function (jqXHR, exception) {}
    });
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(document).on('submit', "#registerForm", function (e) {
    e.preventDefault();

    var form = $("#registerForm");
    $.ajax({
        type: 'post',
        data: form.serialize(),
        url: form.attr('action'),
        async: true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (data) {
            if (data.status == true) {
                toastr.success(data.msg);
                location.reload();
                $('#registerForm')[0].reset();
                $('#signin-modal').modal('hide');
            } else {
                toastr.error(data.msg);
            }
            // console.log(data);
        },
        error: function (jqXHR, exception) {
            toastr.error('something wrong');
            $("#loader").fadeOut();
        },
        complete: function (data) {
            $("body").css("cursor", "default");
            $("#loader").fadeOut();
        }
    });
});
$(document).on('submit', "#loginForm", function (e) {
    e.preventDefault();
    var form = $("#loginForm");
    var is_modal = form.find('#is_modal').val();
    var get_url = $('#base_url').val();
    $.ajax({
        type: 'post',
        data: form.serialize(),
        url: form.attr('action'),
        async: true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (data) {
            console.log(data);
            if (data.status == true) {
                if (is_modal == 1) {
                    toastr.success(data.msg);
                    $('#loginForm')[0].reset();
                    $('#signin-modal').modal('hide');
                    location.reload();
                }else{
                    window.open(get_url, '_self');
                    toastr.success(data.msg);
                }
            }
            else{
                toastr.error(data.msg);
            }
        },
        error: function (jqXHR, exception) {
            toastr.error('Oppes! You have entered invalid credentials').fadeOut(9999);
            $("#loader").fadeOut();
        },
        complete: function (data) {
            $("body").css("cursor", "default");
            $("#loader").fadeOut();
        }
    });
});

$(document).on('submit', "#subscriberForm", function (e) {
    e.preventDefault();

    // var email =  $(this).find('#email');
    // alert(email);



    if ($(this).find('#email').val().length == 0) {
        alert('Please Enter Your Email Address');
        return false;
    }
    var form = $("#subscriberForm");
    $.ajax({
        type: 'post',
        data: form.serialize(),
        url: form.attr('action'),
        async: true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (data) {
            // console.log(data);
            if (data.status == true) {
                toastr.success(data.msg);
                $('#subscriberForm')[0].reset();
            } else {
                toastr.error(data.msg);
            }
            $("body").css("cursor", "default");
            setTimeout(function(){
                $("#loader").fadeOut(300);
              },500);
        },
        error: function (jqXHR, exception) {
            toastr.error('something wrong');
            setTimeout(function(){
                $("#loader").fadeOut(300);
              },500);
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
});


$("#leftside-navigation .sub-menu > a").click(function(e) {
    $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
    e.stopPropagation()
  })
  $(document).on('click', '.has_offer', function(e){
    $(this).closest('.hotsale-img').find('.offer_body').toggleClass('d-none');
    $(this).toggleClass('d-none');
})
/* ====================================================================== *
        GO TO WHATSAPP
 * ====================================================================== */
$(document).on('click', '#open-chat-box', function(e){
    $('#chat-box').show('popup-box-on');
    $('#open-chat-box i').removeClass("fa-whatsapp").addClass('fa-times',{duration:300});
    $('#open-chat-box').removeClass("chat-open-btn").addClass('chat-close-btn',{duration:300});
    e.preventDefault()
})
$(document).on('click', '.chat-close-btn', function(e){
    $('#chat-box').fadeOut('popup-box-on');
    $('#open-chat-box i').removeClass("fa-times").addClass('fa-whatsapp',{duration:300});
    $('#open-chat-box').removeClass("chat-close-btn").addClass('chat-open-btn',{duration:300});
    e.preventDefault()
})
$(document).on('click', '.hide-icon', function(e){
    $('#open-chat-box,.chat-btn-label').hide(300);
    $('#chat-r-icon').removeClass('hide-icon').addClass('open-icon',{duration:300});
    $('#chat-r-icon i').removeClass("fa-angle-right").addClass('fa-angle-left',{duration:300});
    e.preventDefault()
})
$(document).on('click', '.open-icon', function(e){
    $('#open-chat-box,.chat-btn-label').show(300);
    $('#chat-r-icon').removeClass('open-icon').addClass('hide-icon',{duration:300});
    $('#chat-r-icon i').removeClass("fa-angle-left").addClass('fa-angle-right',{duration:300});
    e.preventDefault()
})

$(document).on('click', '.popup-person', function(e){
    var $this = $(this);
    if(!$this.hasClass('popup-person-offline')){
        var defaultMsg = $this.attr('data-default-msg');
        if($this.attr('data-default-msg') !== undefined){
            defaultMsg = $this.attr('data-default-msg').split('{{url}}').join(window.location.href);
        }
        go_to_whatsapp($this.attr('data-number'), defaultMsg);
    }
})

function go_to_whatsapp(number, text){
    var WhatsAppUrl = 'https://web.whatsapp.com/send';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        WhatsAppUrl = 'https://api.whatsapp.com/send';
    }
    var url         = WhatsAppUrl+'?phone='+number+'&text='+text;
    // console.log(url);
    var win         = window.open(url, '_blank');
    win.focus();
}


$(document).on('click', '#sku', function(e) {
    e.preventDefault();
        var copyText = $(this).attr('data-sku');
        var textarea = document.createElement("textarea");
        textarea.textContent = copyText;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toastr.success('Copied the SKU '+copyText, {timeOut: 5000})
});

$(document).on('input change keyup keypress', '.max_val_check',function(e){
    var val = Number($(this).val());
    var max = Number($(this).attr('max'));
    if (val > max) {
        $(this).val(max);
        $(this).change();
        // console.log(max);
    }
});
$(document).on('change', '.min_val_check',function(e){
    var val = Number($(this).val());
    var min = Number($(this).attr('min'));
    if (val < min) {
        $(this).val(min);
        $(this).change();
    }
});
$(document).on("keyup paste change keypress",".quantity", function (evt) {
    var self = $(this);
    self.val(self.val().replace(/[^0-9\.]/g, ''));
    if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
    {
        evt.preventDefault();
    }
});
$(document).on('input', '.remove_first_zero', function(e) {
    if((this.value+'').match(/^0/)) {
        this.value = (this.value+'').replace(/^0+/g, '');
    }
});

