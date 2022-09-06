<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{ config('app.name') }} - @yield('title')</title>
    <meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">   
    <meta property="fb:admins" content=""/>
    <link rel="stylesheet" href="{{ asset('assets/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/toastr.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/form-validation.min.css')}}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.min.css') }}?v=1.1.6">
  
</head>
<body>

    <div class="page-wrapper">
    @include('layouts.navbar')
        <main class="main">
        @yield('content')
        </main>
    @include('layouts.footer')
  </div>
  @yield('popup')
  <script src="{{ asset('assets/js/toastr.min.js') }}?v=2.1.3"></script>
  @stack('custom_js')
    {!! Toastr::message() !!}
</body>
</html>
