$(document).on('click','[id=nav-li]', function(){
    // $(document).on('click','[id=nav-li"]',function(){
    $('.nav-tabs li').removeClass('active');
    $(this).addClass('active');
})
$(document).on('click','[id=retuen_note]', function(){
    var note = $(this).data('note');
    // var res = note.split("~!");
    $('#note_body').html('');
    $('#note_body').html(note);
    // for (let i = 1; i <= res.length;i++) {
    //     // i++;
    //     $('#note_body').append(i+'. ');
    //     // i--;
    //     $('#note_body').append(res[i-1]);
    //     $('#note_body').append('<br>');
    // }
})
$(document).on('change','#saved-address',function(){
    var address_id = $(this).val();
    // alert(address_id);
        var get_url = $('#base_url').val();
    $.ajax({
        type:'get',
        url:get_url+'/ajax/get-address/'+address_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        success: function (res) {
            if(res.status==true){
                $('#shipping_first_name').val(res.data.NAME);
                $('#shipping_last_name').val(res.data.LAST_NAME);
                $('#shipping_phone').val(res.data.TEL_NO);
                $('#shipping_phone').attr('disabled',true);
                $('#shipping_address_line_1').val(res.data.ADDRESS_LINE_1);
                $('#shipping_address_line_2').val(res.data.ADDRESS_LINE_2);
                $('#city2').html('<option value="">Select City</option><option value="'+res.data.CITY+'" selected="">'+res.data.city_name+'</option>');
                $('#city2').val(res.data.CITY).change();
                $('#city2').attr('disabled',true);
                $('#state2').html('<option value="">Select State</option><option value="'+res.data.STATE+'" selected="">'+res.data.state_name+'</option>');
                $('#state2').val(res.data.STATE).change();
                $('#state2').attr('disabled',true);
                $('#post_code_2').val(res.data.POST_CODE);
                $('#post_code_hidden_2').val(res.data.POST_CODE);
                $('#post_code_2').attr('disabled',true);
                $('#country3').val(res.data.F_COUNTRY_NO).change();
                $('#country3').attr('disabled',true);
                $('#address_update_btn').text('Update');
            }
            else{
                $('#shipping_first_name').val('');
                $('#shipping_last_name').val('');
                $('#shipping_phone').val('');
                $('#shipping_phone').attr('disabled',false);
                $('#shipping_address_line_1').val('');
                $('#shipping_address_line_2').val('');
                $('#city2').html('<option value="">Select City</option>');
                $('#city2').attr('disabled',false);
                $('#state2').html('<option value="">Select State</option>');
                $('#state2').attr('disabled',false);
                $('#post_code_2').val('');
                $('#post_code_2').attr('disabled',false);
                $('#country3').attr('disabled',false);
                $('#address_update_btn').text('Add New Address');
            }
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
})
$(document).on('change','#country3', function(){
    var selected_country_dial = $('#country3').find(":selected").data('dial_code');
    $('#phonecode3').text(selected_country_dial);
});
$(function () { $("input,select").not("[type=submit]").jqBootstrapValidation(); } );
// $(document).on('click','#print_order_invoice', function(){
//     var booking_pk = $('#booking_no').val();
//     var get_url = $('#base_url').val();

//     $.ajax({
//         type:'get',
//         url:get_url+'/ajax/get-order-invoice/'+booking_pk,
//         async :true,
//         beforeSend: function () {
//             $("body").css("cursor", "progress");
//         },
//         success: function (res) {
//             if(res.status==1){
//                 return res;
//             }
//             else{
//                 alert('Please try again !');
//             }
//         },
//         complete: function (data) {
//             $("body").css("cursor", "default");
//         }
//     });
// });
