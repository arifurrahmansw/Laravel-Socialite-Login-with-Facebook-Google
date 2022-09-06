<?php
$best_sell              = $data['bestSell'] ?? [];
$newarrival             = $data['newArrival'] ?? [];
$image_path             = getImagePath();
$offer_varinat_list     = $data['offer_varinat_list'] ?? [];
$settings               = getWebSettings();
?>
@extends('layouts.app')
@section('meta_tag')
<meta name="keywords" content="404,azuramart 404" />
<meta name="description" content="We are sorry, the page you've requested is not available" />
<meta property="og:url" content="{{Request::url()}}" />
<meta name="twitter:url" content="{{Request::url()}}" />
<meta property="og:title" content="404" />
<meta property="og:description" content="We are sorry, the page you've requested is not available" />
<meta name="twitter:title" content="404">
<meta name="twitter:card" value="{{ asset('assets/images/no-items-found-clolor.png') }}">
<meta name="twitter:description" content="">
<meta name="twitter:site" content="@azuramart" />
<link rel="canonical" href="{{Request::url()}}">
<meta property="og:image" content="{{ asset('assets/images/no-items-found-clolor.png') }}" />
<meta name="twitter:image" content="{{ asset('assets/images/no-items-found-clolor.png') }}">
@endsection
@section('title')
    404
@endsection
@section('content')
<main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('web.index') }}">@lang('website.home')</a></li>
                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                <li class="breadcrumb-item active" aria-current="page">404</li>
            </ol>
        </div>
    </nav>
    <div class="error-content text-center">
        <div class="container py-md-4">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-section">
                        <h3>We are sorry, the page you've requested is not available.</h3>
                        <a href="{{ route('web.index') }}" class="btn btn-outline-primary-2 btn-minwidth-lg">
                            <span>BACK TO HOMEPAGE</span>
                            <i class="icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            @if(!empty($best_sell) && count($best_sell)>0)
            <div class="row">
                <div class="col-md-12">
                    <div class="deal-section my-md-5">
                        <div class="container mb-md-6">
                            <div class="card">
                                <div class="card-header d-flex mb-md-3 align-items-baseline border-bottom">
                                    <h4 class="h4 fw-700 mb-0">
                                        <span class="border-bottom border-primary border-width-2 pb-sm-2 d-inline-block section-title">@lang('website.best_sell')</span>
                                    </h4>
                                    <a class="ml-auto mr-0 shadow-md view-all" href="{{ route('category',['categorySlug' => 'all']) }}?section=best_sales">@lang('website.view_all')</a>
                                </div>
                                <div class="card-body">
                                    <div class="best-sale-slider owl-carousel owl-simple carousel-equal-height carousel-with-shadow">
                                        @foreach ($best_sell as $key => $product)
                                         @include('common.product-layout2')
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endif

            @if(!empty($newarrival) && count($newarrival)>0)
            <div class="row">
                <div class="col-md-12">
                    <div class="deal-section my-md-5">
                        <div class="container mb-md-6">
                            <div class="card">
                                <div class="card-header d-flex mb-md-3 align-items-baseline border-bottom">
                                    <h4 class="h4 fw-700 mb-0">
                                        <span class="border-bottom border-primary border-width-2 pb-sm-2 d-inline-block section-title">@lang('website.new_arrivals')</span>
                                    </h4>
                                    <a class="ml-auto mr-0 shadow-md view-all"  href="{{ route('category',['categorySlug' => 'all']) }}?section=new" >@lang('website.view_all')</a>
                                </div>
                                <div class="card-body">
                                    <div class="best-sale-slider owl-carousel owl-simple carousel-equal-height carousel-with-shadow">
                                        @foreach ($newarrival as $key => $product)
                                        @include('common.product-layout1')
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</main>
@endsection
