
<div class="mobile-bottom-nav d-xl-none fixed-bottom bg-white shadow-lg">
   <div class="d-flex justify-content-around align-items-center">
      <a href="{{ url('web/index') }}" class="mobile-menu-link text-reset flex-grow-1 text-center py-3 border-right bg-soft-primary @yield('home') ">
    <span class="d-inline-block position-relative px-2 mobile-footer-icon">
      <i class="icon icon-home"></i>
      <span class="mobile-menu-title">@lang('website.home')</span>
    </span>
      </a>
      <a href="{{ url('web/wishlist') }}" class="mobile-menu-link text-reset flex-grow-1 text-center py-3 border-right @yield('wishlist') ">
      <span class="d-inline-block position-relative px-2 mobile-footer-icon">
      <i class="icon icon-heart-o"></i>
      <span class="mobile-menu-title">@lang('website.wishlist')</span>
      </span>
      </a>
      <a href="{{ url('cart') }}" class="mobile-menu-link text-reset flex-grow-1 text-center py-3 border-right  @yield('cart')"  data-toggle="modal" data-target="#cartModal">
      <span class="d-inline-block position-relative px-2 mobile-footer-icon">
      <i class="icon-cart-plus"></i>
      <span class="mobile-menu-title">@lang('website.cart')</span>
      </span>
      </a>
        @guest
        <a href="#" class="mobile-menu-link text-reset flex-grow-1 text-center py-3 @yield('login')" data-toggle="modal" data-target="#signin-modal">
        <span class="d-inline-block position-relative px-2 mobile-footer-icon">
            <i class="fa fa-sign-in"></i>
            <span class="mobile-menu-title">@lang('website.login')</span>
        </span>
    </a>
        @else
        <a href="{{ url('profile/dashboard') }}"  class="mobile-menu-link text-reset flex-grow-1 text-center py-3  @yield('profile')">
            <span class="d-inline-block position-relative px-2 mobile-footer-icon">
            <i class="icon icon-user" aria-hidden="true"></i>
            <span class="mobile-menu-title">@lang('website.myProfile')</span>
            </span>
        </a>
        @endguest
   </div>
</div>
<footer class="footer">
   <div class="footer-middle">
      <div class="container">
         <div class="row">
            <div class="col-6 col-md-3">
               <div class="widget widget-about footer-widget">
                
                  </div>
                  <ul class="footer-payments list-inline list-unstyled d-flex">
                    <li class="d-inline-block">
                    </li>
                    <li class="d-inline-block">
                    </li>
                 </ul>
               </div>
            </div>
            <div class="col-6 col-md-3">
               <div class="widget footer-widget">
                  <h4 class="widget-title footer-text">@lang('website.pages')</h4>
                  <ul class="widget-list">
                     <li></li>
                  </ul>
               </div>
            </div>
            <div class="col-6 col-md-3">
               <div class="widget footer-widget">
                  <h4 class="widget-title footer-text"> @lang('website.customer_service')</h4>
                    <ul class="widget-list">
                       
                    </ul>
               </div>
            </div>
            <div class="col-6 col-md-3">
               <div class="widget footer-widget">
                  <h4 class="widget-title footer-text">@lang('website.my_account')</h4>
                  <ul class="widget-list">
                     @if(Request::path() !== 'login')
                     <li><a class="footer-text" href="#signin-modal" data-toggle="modal">@lang('website.login')</a></li>
                     @endif
                     <li><a class="footer-text" href="{{ url('cart') }}">@lang('website.view_cart')</a></li>
                     <li><a class="footer-text" href="{{ url('web/wishlist') }}">@lang('website.Wishlist') </a></li>
                     <li><a class="footer-text" href="{{ url('profile/my-orders') }}">@lang('website.track_order') </a></li>
                     <li><a class="footer-text" href="{{ url('web/contact') }}">@lang('website.contact_us')</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</footer>
<div class="footer-bottom d-none d-md-block">
   <div class="container">
      <div class="row">
         <div class="col-md-6 text-md-left">
           
            <p class="footer-copyright">Copyright © {{ date('Y') }} abc tech. All Rights Reserved.</p>
         </div>
         <div class="col-md-6">
            <figure class="footer-payments float-right">
               
            </figure>
         </div>
      </div>
   </div>
</div>