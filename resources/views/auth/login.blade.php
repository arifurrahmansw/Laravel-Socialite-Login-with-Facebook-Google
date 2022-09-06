@extends('layouts.app')
@section('content')
@section('title') Sign in @endsection
<nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ url('/') }}">@lang('website.home')</a></li>
            <li class="breadcrumb-item active" aria-current="page">Sign in</li>
        </ol>
    </div>
</nav>
<div class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style="background-image: url('assets/images/backgrounds/login-bg.jpg')">
    <div class="container">
        <div class="form-box">
            <div class="row">
                <div class="col-md-12">
                    @include('layouts.includes.flash')
                </div>
            </div>
            <div class="form-tab">
                <ul class="nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="signin-tab-2" data-toggle="tab" href="#signin-2" role="tab" aria-controls="signin-2" aria-selected="true">
                           Social Login
                        </a>
                    </li>
                 
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="signin-2" role="tabpanel" aria-labelledby="signin-tab-2">
                          <div class="form-choice">
                            <div class="row">
                                <div class="col-sm-6">
                                    <a href="{{ route('social.login', 'google') }}" class="btn btn-login btn-g">
                                        <i class="icon-google"></i>
                                        Login With Google
                                    </a>
                                </div>
                                <div class="col-sm-6">
                                    <a href="{{ route('social.login', 'facebook') }}" class="btn btn-login btn-f">
                                        <i class="icon-facebook-f"></i>
                                        Login With Facebook
                                    </a>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('custom_js')
@endpush
