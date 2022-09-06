@if(Session::has('flashMessageSuccess'))
    <div class="alert alert-success alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>
        {{ Session::get('flashMessageSuccess') }}
    </div>
@endif

@if(Session::has('flashMessageAlert'))
    <div class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>
        {{ Session::get('flashMessageAlert') }}
    </div>
@endif

@if(Session::has('flashMessageError'))
    <div class="alert alert-danger alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>
        <?= Session::get('flashMessageError') ?>
    </div>
@endif

@if(Session::has('flashMessageWarning'))
    <div class="alert alert-warning alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>
        {{ Session::get('flashMessageWarning') }}
    </div>
@endif
