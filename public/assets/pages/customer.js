/*customer radio button events*/
$('input[type=radio][name=scustomer]').change(function() {
    if (this.value == 'ukshop') {
        var type = 'ukshop';
    }
    else if (this.value == 'reseller') {
        var type = 'reseller';
    }
    var get_url  = $('#base_url').val();

    var pageurl  = get_url+'/parent-root/'+type;
    $.ajax({
        type:'get',
        url:pageurl,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        success: function (data) {
            $('#booking_under').html(data);
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
});
$('#checkbox1').change(function() {
    if(this.checked) {
        $('#display_none').fadeIn();
    }else{
        $('#display_none').fadeOut();
    }
});

function destroycreatetypeahead(country) {
    $(".search-input4").typeahead("destroy");
    call_typeahead(country);
}
function destroycreatetypeahead2(country) {
    $(".search-input8").typeahead("destroy");
    call_typeahead2(country);
}
$(document).on('click','[id*=edit-address-popup]', function(){
    var address_id      = $(this).data('address_id');
    var type            = $(this).data('type');
    var get_url         = $('#base_url').val();

    $.ajax({
        type:'get',
        url:get_url+'/getCustomerAddressEdit/'+address_id+'/'+type,
        async :true,
        dataType: 'json',
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        success: function (data) {
            $('#cus_add_modal').html('').append(data.html);
            $('#address_type').val(type);
            // $('#address_book').fadeOut();
            // $('#add_new_btn').remove();
            var country = $('#country_h').val();
            destroycreatetypeahead(country);
            if (type == 'shipping') {
                $('#addresstype option[value=1]').attr('selected','selected');
                $('.custom-control.custom-checkbox').css('display','block');
            }else{
                $('#addresstype option[value=2]').attr('selected','selected');
                $('.custom-control.custom-checkbox').css('display','none');
            }
            $('#addresstype').css("pointer-events", 'none');
            $('#action_btn').text(' Update Address')
            // $('#post_code_').val(post_code);
            $('#post_code_hidden').val($('#post_code_').val());
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
});
$(document).on('click','[id=add-address-popup]', function(){
    var type = $(this).data('type');
    $('#is_update').val(0);
    if (type == 'shipping') {
        $('#add_addresstype').val(1).change();
    }else{
        $('#add_addresstype').val(2).change();
    }
    destroycreatetypeahead2(2);

    $('#add_addresstype').css("pointer-events", 'none');
});
$(document).on('click','[id=add_new_btn]', function(){
    var type = $('#address_type').val();
    $('#is_update').val(0);

    $('#checkbox1').prop('checked', false);
    destroycreatetypeahead(2);
    $('#addresstype option[value=1]').attr('selected','selected');
    $('#addresstype').css("pointer-events", 'none');
    $('#customeraddress').val('');
    $('#customeraddress_last').val('');
    $('#country').val(2);
    $('#city').html('<option>Select City</option>');
    $('#state').html('<option>Select State</option>');
    $('#post_code_').val('');
    $('#mobilenoadd').val('');
    $('#ad_1_').val('');
    $('#ad_2_').val('');
    $('#action_btn').text(' Add Address');
});
