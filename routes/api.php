<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('v1')->group(function () {

    Route::post('login', ['uses' => 'Api\AuthController@postLogin']);
    Route::post('registration', ['uses' => 'Api\AuthController@postRegister']);
    Route::post('google-signing', ['uses' => 'Api\AuthController@postgoogleAuth']);
    Route::post('get-otp', ['uses' => 'Api\AuthController@postOtp']);
    Route::post('verify-otp', ['uses' => 'Api\AuthController@postVerifyOtp']);
    Route::post('reset-password', ['uses' => 'Api\AuthController@postResetPassword']);
    Route::post('change-password', ['uses' => 'Api\AuthController@postChangePassword']);
    Route::post('change-email', ['uses' => 'Api\AuthController@postChangeEmail']);
    Route::post('change-personal-info', ['uses' => 'Api\AuthController@postChangePersonalInfo']);
    Route::post('upload-user-image', ['uses' => 'Api\AuthController@postUploadUserImage']);
    Route::get('app-setting', ['uses' => 'Api\CommonApiController@getSetting']);
    Route::get('check-update', ['uses' => 'Api\CommonApiController@checkUpdate']);
    Route::get('get-instagram-feed', ['uses' => 'Api\CommonApiController@getInstagram']);
    Route::post('subscriber/save-subscriber', ['uses' => 'Api\SubscriberController@postStore']);


    Route::group(['middleware' => ['chckt'], 'namespace' => 'Api'], function ($router) {

        Route::post('get-user', ['middleware' => 'api-acl', 'uses' => 'UserController@getUserList']);
        // Route::post('catogory-list', ['middleware' => 'api-acl', 'uses' => 'ProductController@getCategorytList']);
    });
    Route::group(['namespace' => 'Api'], function ($router) {

        Route::post('whatsapp-list', ['uses' => 'CommonApiController@getWhatsAppList']);
        Route::post('user-address-list', ['uses' => 'UserController@getUserAddressList']);
        Route::post('user-payment-list', ['uses' => 'UserController@getUserPaymentList']);
        Route::post('user-balance-list', ['uses' => 'UserController@getUserBalanceList']);
        Route::post('payment-details', ['uses' => 'UserController@getUserPaymentDetails']);
        Route::post('check-user-exists', ['uses' => 'UserController@getCheckUserExists']);
        Route::post('customer/deletion_request', ['uses' => 'UserController@postDeletion']);


        Route::post('category-list', [ 'uses' => 'ProductApiController@getCategorytList']);
        Route::post('category-brand-details', [ 'uses' => 'ProductApiController@getCategoryBrandDetails']);
        Route::post('category-products', [ 'uses' => 'ProductApiController@getCategoryProducts']);
        Route::post('feature-product', [ 'uses' => 'ProductApiController@getFeatureProductList']);
        Route::post('home-banner', [ 'uses' => 'ProductApiController@getHomeBanner']);
        Route::post('new-arrival-product', [ 'uses' => 'ProductApiController@getNewArrival']);
        Route::post('model-search', [ 'uses' => 'ProductApiController@getModelSearch']);
        Route::post('model-product-search', [ 'uses' => 'ProductApiController@getModelProductSearch']);
        Route::post('all-brand', [ 'uses' => 'ProductApiController@getAllBrandList']);
        Route::post('brand-list', [ 'uses' => 'ProductApiController@getBrandList']);
        Route::post('brand-details', [ 'uses' => 'ProductApiController@getBrandDetails']);
        Route::post('brand-product', [ 'uses' => 'ProductApiController@getBrandProduct']);
        Route::post('brand/{brandSlug}', [ 'uses' => 'ProductApiController@getBrandProductList']);
        Route::post('search-short-result', [ 'uses' => 'ProductApiController@getShortSearchResult']);
        Route::post('search-result', [ 'uses' => 'ProductApiController@getSearchResult']);
        Route::post('coupon-product-list', [ 'uses' => 'ProductApiController@getCouponProductList']);
        Route::post('coupon-list', [ 'uses' => 'ProductApiController@getCouponList']);
        Route::post('coupon-home', [ 'uses' => 'ProductApiController@getCouponHome']);

        Route::post('add-to-cart', [ 'uses' => 'CartApiController@getAddToCart']);
        Route::post('cart-list', [ 'uses' => 'CartApiController@getCartlist']);
        Route::post('cart-qty-update', [ 'uses' => 'CartApiController@getCartQtyUpdate']);
        Route::post('cart-location-update', [ 'uses' => 'CartApiController@getCartLocationUpdate']);
        Route::post('update-cart', [ 'uses' => 'CartApiController@getUpdateCart']);
        Route::post('cart-count', [ 'uses' => 'CartApiController@getCartCount']);
        Route::post('apply-coupon', ['uses' => 'CartApiController@postApplyCoupon']);

        Route::post('add-wish', [ 'uses' => 'WishListApiController@getAddWishList']);
        Route::post('wish-list', [ 'uses' => 'WishListApiController@getViewWishList']);

        Route::post('post-code-list', [ 'uses' => 'OrderApiController@getPostCode']);
        Route::post('save-address', [ 'uses' => 'OrderApiController@postAddress']);
        Route::post('make-order', [ 'uses' => 'OrderApiController@postOrder']);
        Route::post('order-list', [ 'uses' => 'OrderApiController@postOrderList']);
        Route::post('order-details', [ 'uses' => 'OrderApiController@postOrderDetails']);
        Route::post('get-order-payment', [ 'uses' => 'OrderApiController@getOrderPayment']);
        Route::post('post-order-payment', [ 'uses' => 'OrderApiController@postOrderPayment']);
       // Route::post('offer-variant', [ 'uses' => 'ProductApiController@offerVariant']);

        Route::get('blog/{slug}', [ 'uses' => 'CommonApiController@getFeatureDetails']);
        Route::post('blog-feature-list', [ 'uses' => 'CommonApiController@getFeatureBlog']);

        Route::post('page-about-us', [ 'uses' => 'CommonApiController@getAboutUs']);
        Route::post('faq', [ 'uses' => 'CommonApiController@getFAQ']);
        Route::post('page-list', [ 'uses' => 'CommonApiController@getPageList']);
        Route::post('page/{slug}', [ 'uses' => 'CommonApiController@getPageDetails']);

        Route::post('blog-feature-list', [ 'uses' => 'CommonApiController@getFeatureBlog']);

        Route::post('best-sell-list', [ 'uses' => 'ProductApiController@getBestVariant']);
        Route::post('offer-list', [ 'uses' => 'ProductApiController@getOfferList']);
        Route::post('offer/{offerSlug}', [ 'uses' => 'ProductApiController@getOfferDetails']);
        Route::post('product/{slug}', [ 'uses' => 'ProductApiController@getVariantDetails']);
        Route::post('{categorySlug}/{subcategorySlug?}', [ 'uses' => 'ProductApiController@getCatSubcatProducts']);


    });
});
