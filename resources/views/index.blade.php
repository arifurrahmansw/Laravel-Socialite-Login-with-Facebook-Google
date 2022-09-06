@extends('layouts.app')
@section('home','active')
@section('title')
@endsection
@section('home','active')
@section('content')
<div class="blog-posts py-4  mb-sm-1 pb-md-7 bg-light">
    <div class="container">
        <div class="card">
            <div class="card-header d-flex mb-md-3 align-items-baseline border-bottom mb-sm-1 pb-1">
                <h4 class="h4 fw-700 mb-0">
                    <span class="border-bottom border-primary border-width-2 pb-sm-2 d-inline-block section-title">@lang('website.From our News')</span>
                </h4>
                <a class="ml-auto mr-0 view-all" href="{{ route('news') }}">@lang('website.view_all')</a>
            </div>
            <div class="card-body">
                
            </div>
        </div>
    </div>
</div>
@endsection
@push('custom_js')
@endpush




