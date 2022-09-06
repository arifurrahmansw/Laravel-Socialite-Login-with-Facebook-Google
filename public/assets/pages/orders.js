$(document).on('click','#add-payment',function(){
    var booking_id = $(this).data('booking_id');
    var get_url = $('#base_url').val();
    // var newWindow = window.open("","_blank",'toolbar=0,location=0,menubar=0,height=800,width=1000').blur();
    $.ajax({
        type:'get',
        url:get_url+'/ajax/get-order-payments/'+booking_id,
        async :true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (res) {
            if(res.msg != ''){
                alert(res.msg);
            }else if (res.payment_type == 'azuramart-180' || res.payment_type == 'azuramart-90') {
                $('#CustomerOrderPayment').modal('show');
                $('#payment_html').html('');
                $('#payment_html').html(res.html);
                if (res.payment_type == 'azuramart-180') {
                    // installment6(res);
                    var pay_amount = Number($('#azuramart180').find('.quantity.max_val_check.min_val_check').val());
                    $('#payment').text(pay_amount);
                }else if(res.payment_type == 'azuramart-90'){
                    // installment3(res);
                    var pay_amount = Number($('#azuramart90').find('.quantity.max_val_check.min_val_check').val());
                    $('#payment').text(pay_amount);
                }
            }else if(res.bil_pay == 1 && res.url != ''){
                // var win = window.open(res.url, '_blank');
                // if (win) {
                //     //Browser has allowed it to be opened
                //     win.focus();
                // } else {
                //     //Browser has blocked it
                //     alert('Please allow popups for this website');
                // }
                // newWindow.location.href = res.url;
                // newWindow.focus();
                window.open(res.url, '_self');
                // $('#btn_for_payment').attr('href','');
                // $('#btn_for_payment').attr('href',res.url);
                // $("#btn_for_payment span").trigger("click");
                // $('#btn_for_payment').attr('href','');
            }else{
                // newWindow.close();
            }
            $('#order_id').val(booking_id);
        },
        complete: function (data) {
            $("body").css("cursor", "default");
            $("#loader").fadeOut(300);
        }
    });
});
$(document).on('click','#pay_installment',function(){
    var amount = Number($('.quantity.max_val_check.min_val_check').val());
    var booking_id = Number($('#order_id').val());
    var get_url = $('#base_url').val();
    $('#CustomerOrderPayment').modal('hide');
    $.ajax({
        type:'get',
        url:get_url+'/ajax/pay-ins-order-payments/'+booking_id+'/'+amount,
        beforeSend: function () {
            $("body").css("cursor", "progress");
            $("#loader").fadeIn(300);
        },
        success: function (res) {
            if(res.msg != ''){
                alert(res.msg);
            }else if(res.bil_pay == 1 && res.url != ''){
                window.open(res.url, '_self');
            }
        },
        complete: function (data) {
            $("body").css("cursor", "default");
            $("#loader").fadeOut(300);
        }
    });
});
function installment6(res)
{
    var total_price = res.order_value;
    var isset_max_min = 0;
    var spare_amount = 0;
    $('#order_value').val(total_price);
    var total_paid = 0;
    if ((res.payments && res.payments[0].IS_PAID == 0) || res.payments == null) {
        var downpayment = total_price*.2;
        downpayment = Math.round(downpayment);
        $('#downpayment_180_0').val(downpayment);

        $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('min',downpayment);
        $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('max',total_price);
        isset_max_min = 1;
    }
    for (var i = 0; i < 7; i++) {
        var input_val = Number($('#downpayment_180_'+i).val());
        if (input_val != '') {
            total_paid += input_val;
        }else{
            break;
        }
    }

    if(i < 7){
        spare_amount = total_price-total_paid;
        var ins_amount = spare_amount/(7-i);
        ins_amount = Math.floor(ins_amount);
        var last_ins = 0;
        var middle_ins = 0;
        for (var j = i; j < 6; j++) {
            middle_ins += ins_amount;
            $('#downpayment_180_'+j).val(ins_amount);
        }
        middle_ins = parseFloat(middle_ins);
        last_ins = total_price-(total_paid+middle_ins);
        $('#downpayment_180_'+6).val(last_ins);
    }
    var pay_amount = Number($('#azuramart180').find('.quantity.max_val_check.min_val_check').val());
    $('#total').text(total_price);
    $('#paid').text(total_paid);
    $('#payment').text(pay_amount);
    $('#due').text(spare_amount-pay_amount);

    if (isset_max_min == 0) {
        if (i<6) {
            $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('min',ins_amount);
            $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('max',spare_amount);
        }else{
            $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('min',last_ins);
            $('#azuramart180').find('.quantity.max_val_check.min_val_check').attr('max',last_ins);
        }
    }
}
function installment3(res)
{
    var total_price = res.order_value;
    var isset_max_min = 0;
    $('#order_value').val(total_price);
    var total_paid = 0;
    if ((res.payments && res.payments[0].IS_PAID == 0) || res.payments == null) {
        var downpayment = total_price*.2;
        downpayment = Math.round(downpayment);
        $('#downpayment_90_0').val(downpayment);

        $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('min',downpayment);
        $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('max',total_price);
        isset_max_min = 1;
    }
    for (var i = 0; i < 4; i++) {
        var input_val = Number($('#downpayment_90_'+i).val());
        if (input_val != '') {
            total_paid += input_val;
        }else{
            break;
        }
    }
    if(i < 4){
        var spare_amount = total_price-total_paid;
        var ins_amount = spare_amount/(4-i);
        ins_amount = Math.floor(ins_amount);
        var last_ins = 0;
        var middle_ins = 0;
        for (var j = i; j < 3; j++) {
            middle_ins += ins_amount;
            $('#downpayment_90_'+j).val(ins_amount);
        }
        middle_ins = parseFloat(middle_ins);
        last_ins = total_price-(total_paid+middle_ins);
        $('#downpayment_90_'+3).val(last_ins);
    }
    var pay_amount = Number($('#azuramart90').find('.quantity.max_val_check.min_val_check').val());
    $('#total').text(total_price);
    $('#paid').text(total_paid);
    $('#payment').text(pay_amount);
    $('#due').text(spare_amount-pay_amount);
    if (isset_max_min == 0) {
        if (i<3) {
            $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('min',ins_amount);
            $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('max',spare_amount);
        }else{
            $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('min',last_ins);
            $('#azuramart90').find('.quantity.max_val_check.min_val_check').attr('max',last_ins);
        }
    }
}
$(document).on('change keypress paste keyup input','.quantity.max_val_check.min_val_check',function(){
    if ($(this).attr('name') == 'downpayment_180') {
        var type = 'downpayment_180_';
        var installments = 6;
    }else{
        var type = 'downpayment_90_';
        var installments = 3;
    }

    // var init_value = Number($(this).data('min_amount'));
    var new_val = Number($('.quantity.max_val_check.min_val_check').val());         //994
    var init_value = Number($('.quantity.max_val_check.min_val_check').attr('min'));//344
    var flag = 0;
    var p_difference = new_val-init_value; //680
    var n_difference = init_value-new_val;
    console.log(init_value);
    console.log(new_val);
    console.log(p_difference);

    var total_price = Number($('#order_value').val());
    var total_paid = Number($('#total_paid').val());

    $('#due').text(total_price-total_paid-new_val);

    for (var i = 0; i < installments+1; i++) {
        if ($('#'+type+i).hasClass('paid') || $('#'+type+i).hasClass('max_val_check')) {
            console.log('continue');
            continue;
        }else{
            var input_val = Number($('#'+type+i).data('value'));
            if (new_val <= init_value) {
                console.log('218 '+input_val+' '+new_val+' '+init_value);
                $('#'+type+i).val(input_val+(init_value-new_val));
            }else if(new_val > init_value ){
                if (p_difference >= input_val) {
                    $('#'+type+i).val(0);
                    p_difference -= input_val;
                    console.log('224 '+input_val+' '+p_difference);
                }else{
                    $('#'+type+i).val(input_val-p_difference);
                    console.log('228 '+input_val+' '+p_difference);
                    p_difference = 0;
                }
            }
        }
    }

    // var total_price = Number($('#order_value').val());
    // var total_paid = 0;
    // var flag = 0;
    // for (var i = 0; i < installments+1; i++) {
    //     var input_val = Number($('#'+type+i).val());
    //     if(flag == 1){
    //         break;
    //     }
    //     if ($('#'+type+i).hasClass('paid')) {
    //         total_paid += input_val;
    //     }else{
    //         total_paid += input_val;
    //         flag = 1;
    //     }
    // }
    // if(i < installments+1){
    //     var spare_amount = total_price-total_paid;
    //     var ins_amount = spare_amount/((installments+1)-i);
    //     ins_amount = Math.floor(ins_amount);
    //     var last_ins = 0;
    //     var middle_ins = 0;
    //     for (var j = i; j < installments; j++) {
    //         middle_ins += ins_amount;
    //         $('#'+type+j).val(ins_amount);
    //     }
    //     middle_ins = parseFloat(middle_ins);
    //     last_ins = total_price-(total_paid+middle_ins);
    //     $('#'+type+installments).val(last_ins);
    // }
    $('#payment').text($(this).val());
    // $('#due').text(spare_amount);
});

