<?php
use Illuminate\Support\Facades\Auth;

Route::get('login/{provider}', ['as' => 'social.login', 'uses' => 'Auth\SocialController@redirectToProvider']);
Route::get('auth/{provider}/callback', ['as' => 'social.callback', 'uses' => 'Auth\SocialController@handleProviderCallback']);

Route::post('login/user-login', [ 'as' => 'login.user-login.post', 'uses' => 'Auth\AuthController@postLogin']);
Route::get('/', [ 'as' => 'login.user', 'uses' => 'Auth\SocialController@getLogin']);
Route::get('web', [ 'as' => 'web.index', 'uses' => 'Auth\SocialController@getLogin']);




Auth::routes();


