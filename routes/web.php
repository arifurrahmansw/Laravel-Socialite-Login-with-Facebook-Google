<?php
use Illuminate\Support\Facades\Auth;

Route::get('login/{provider}', ['as' => 'social.login', 'uses' => 'Auth\SocialController@redirectToProvider']);
Route::get('auth/{provider}/callback', ['as' => 'social.callback', 'uses' => 'Auth\SocialController@handleProviderCallback']);

// User Profile
Route::group(['prefix' => 'profile'], function() {
    Route::get('dashboard', ['as' => 'profile.dashboard', 'uses' => 'DashboardController@getProfile']);
});


Route::post('login/user-login', [ 'as' => 'login.user-login.post', 'uses' => 'Auth\AuthController@postLogin']);
Route::post('user/user-register', [ 'as' => 'user.user-register', 'uses' => 'Auth\AuthController@postRegister']);
Route::post('user/check-email', [ 'as' => 'user.check-email', 'uses' => 'Auth\AuthController@checkDuplicateEmail']);
Route::get('/', [ 'as' => 'login.user-login.get', 'uses' => 'Auth\SocialController@getLogin']);
Route::post('logouts', [ 'as' => 'custom-logout', 'uses' => 'Auth\AuthController@logout']);
Route::get('product/{slug}', ['as' => 'product.details', 'uses' => 'ProductController@getProductDetails']);
Route::get('forget/password', [ 'as' => 'forget.password', 'uses' => 'Auth\AuthController@forgetPassword']);
Route::post('reset/password', [ 'as' => 'reset.password.post', 'uses' => 'Auth\AuthController@resetPassword']);
Route::get('reset/password/{type}/{token}', [ 'as' => 'reset.password.get', 'uses' => 'Auth\AuthController@getresetPassword']);
Route::post('reset/new/password', [ 'as' => 'reset.new.password.post', 'uses' => 'Auth\AuthController@resetNewPassword']);


Auth::routes();


