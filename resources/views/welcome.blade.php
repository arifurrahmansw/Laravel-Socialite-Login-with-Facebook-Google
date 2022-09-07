<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css" integrity="sha512-vebUliqxrVkBy3gucMhClmyQP9On/HAWQdKDXRaAlb/FKuTbxkjPKUyqVOxAcGwFDka79eTF+YXwfke1h3/wfg==" crossorigin="anonymous" referrerpolicy="no-referrer" />


        <!-- Styles -->
        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.dark\:text-gray-500{--tw-text-opacity:1;color:#6b7280;color:rgba(107,114,128,var(--tw-text-opacity))}}
        </style>

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            html * {
                  font-family: 'Montserrat', sans-serif;
                  box-sizing: border-box;
            }

            body {
                background: #4688F1;
                padding: 0;
                margin: 0;
            }

            .login-box {
                background: #fff;
                padding: 20px;
                max-width: 480px;
                margin: 25vh auto;
                text-align: center;
                letter-spacing: 1px;
                position: relative;
            }

            .login-box:hover {
                  box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            }

            .login-box h2 {
                margin: 20px 0 20px;
                padding: 0;
                text-transform: uppercase;
                color: #4688F1;
            }

            .social-button {
                  background-position: 25px 0px;
                box-sizing: border-box;
                color: rgb(255, 255, 255);
                cursor: pointer;
                display: inline-block;
                height: 50px;
                  line-height: 50px;
                text-align: left;
                text-decoration: none;
                text-transform: uppercase;
                vertical-align: middle;
                width: 100%;
                  border-radius: 3px;
                margin: 10px auto;
                outline: rgb(255, 255, 255) none 0px;
                padding-left: 20%;
                transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #facebook-connect {
                background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook.svg?sanitize=true') no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
                border: 1px solid rgb(60, 90, 154);
            }

            #facebook-connect:hover {
                  border-color: rgb(60, 90, 154);
                  background: rgb(60, 90, 154) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook-white.svg?sanitize=true') no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
                  -webkit-transition: all .8s ease-out;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease-out;
            }

            #facebook-connect span {
                  box-sizing: border-box;
                color: rgb(60, 90, 154);
                cursor: pointer;
                text-align: center;
                text-transform: uppercase;
                border: 0px none rgb(255, 255, 255);
                outline: rgb(255, 255, 255) none 0px;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #facebook-connect:hover span {
                  color: #FFF;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #google-connect {
                background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus.png') no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
                border: 1px solid rgb(220, 74, 61);
            }

            #google-connect:hover {
                  border-color: rgb(220, 74, 61);
                  background: rgb(220, 74, 61) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus-white.png') no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
                  -webkit-transition: all .8s ease-out;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease-out;
            }

            #google-connect span {
                  box-sizing: border-box;
                color: rgb(220, 74, 61);
                cursor: pointer;
                text-align: center;
                text-transform: uppercase;
                border: 0px none rgb(220, 74, 61);
                outline: rgb(255, 255, 255) none 0px;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #google-connect:hover span {
                  color: #FFF;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #twitter-connect {
                background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/twitter.png') no-repeat scroll 5px 1px / 45px 45px padding-box border-box;
                border: 1px solid rgb(85, 172, 238);
            }

            #twitter-connect:hover {
                  border-color: rgb(85, 172, 238);
                  background: rgb(85, 172, 238) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/twitter-white.png') no-repeat scroll 5px 1px / 45px 45px padding-box border-box;
                  -webkit-transition: all .8s ease-out;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease-out;
            }

            #twitter-connect span {
                  box-sizing: border-box;
                color: rgb(85, 172, 238);
                cursor: pointer;
                text-align: center;
                text-transform: uppercase;
                border: 0px none rgb(220, 74, 61);
                outline: rgb(255, 255, 255) none 0px;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #twitter-connect:hover span {
                  color: #FFF;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #linkedin-connect {
                background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/linkedin.svg?sanitize=true') no-repeat scroll 13px 0px / 28px 45px padding-box border-box;
                border: 1px solid rgb(0, 119, 181);
            }

            #linkedin-connect:hover {
                  border-color: rgb(0, 119, 181);
                  background: rgb(0, 119, 181) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/linkedin-white.svg?sanitize=true') no-repeat scroll 13px 0px / 28px 45px padding-box border-box;
                  -webkit-transition: all .8s ease-out;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease-out;
            }

            #linkedin-connect span {
                  box-sizing: border-box;
                color: rgb(0, 119, 181);
                cursor: pointer;
                text-align: center;
                text-transform: uppercase;
                border: 0px none rgb(0, 119, 181);
                outline: rgb(255, 255, 255) none 0px;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }

            #linkedin-connect:hover span {
                  color: #FFF;
                  -webkit-transition: all .3s ease;
                -moz-transition: all .3s ease;
                -ms-transition: all .3s ease;
                -o-transition: all .3s ease;
                transition: all .3s ease;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
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

                <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                @auth
                <div class="login-box">
                    <a href="#" class="social-button" > <span>{{Auth::user()->name}}</span></a>
                    <a href="#" class="social-button" > <span>{{Auth::user()->email}}</span></a>
                </div>
                @else
                <div class="login-box">
                    <h2>Social Login</h2>
                    <a href="{{ route('social.login', 'facebook') }}" class="social-button" id="facebook-connect"> <span>Connect with Facebook</span></a>
                    <a href="{{ route('social.login', 'google') }}" class="social-button" id="google-connect"> <span>Connect with Google</span></a>
                    <a href="#" class="social-button" id="twitter-connect"> <span>Connect with Twitter</span></a>
                    <a href="#" class="social-button" id="linkedin-connect"> <span>Connect with LinkedIn</span></a>
                </div>
                @endauth

                                  <!-- <div class="form-choice">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <a href="{{ route('social.login', 'google') }}" class="btn btn-info btn-block">
                                            <i class="lab la-google"></i>
                                                Login With Google
                                            </a>
                                        </div>
                                        <div class="col-sm-6">
                                            <a href="{{ route('social.login', 'facebook') }}" class="btn btn-success">
                                            <i class="lab la-facebook"></i>
                                                Login With Facebook
                                            </a>
                                        </div>
                                    </div>
                            </div> -->
                       
                </div>
            </div>
        </div>
        <!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>

    </body>
</html>
