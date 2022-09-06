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
