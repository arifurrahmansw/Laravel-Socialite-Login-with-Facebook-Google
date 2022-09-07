<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('social-login/{provider}', ['as' => 'social.login', 'uses' => 'Auth\SocialController@redirectToProvider']);
Route::get('auth/{provider}/callback', ['as' => 'social.callback', 'uses' => 'Auth\SocialController@handleProviderCallback']);
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
