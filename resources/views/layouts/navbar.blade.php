<header class="header">
   <div class="header-top d-none d-md-block">
      <div class="container">
         <div class="header-left">
            <div class="header-dropdown"  id="lang-change">
                <strong class="text-danger">BETA</strong>
            </div>
         </div>
         <div class="header-right">
            <ul class="top-menu">
               <li>
                  <a href="#">Links</a>
               </li>
            </ul>
         </div>
      </div>
   </div>
   <div class="header-middle sticky-header">
      <div class="container">
         <div class="header-left">
            <button class="mobile-menu-toggler">
            <span class="sr-only">Toggle mobile menu</span>
            <i class="icon-bars"></i>
            </button>
            <a href="{{ route('web.index') }}" class="logo">LOGO
               </a>
            <nav class="main-nav">
               <ul class="menu sf-arrows">
                  <li class="@yield('/')">
                     <a href="{{ route('web.index') }}">@lang('website.home')</a>
                  </li>
         
                  <li class="@yield('news') link_news">
                     <a href="{{ url('news') }}">@lang('website.news')</a>
                  </li>
               </ul>
            </nav>
         </div>

      </div>
   </div>
</header>
