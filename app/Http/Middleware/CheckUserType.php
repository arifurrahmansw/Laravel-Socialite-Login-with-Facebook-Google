<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use Redirect;
use App\Services\Access;
use Auth;

class CheckUserType
{
    public function handle($request, Closure $next)
    {
        // $access = new Access();

        if (Auth::guard('reseller')->check()) { //Default guard
            return $next($request);
        }elseif (Auth::check()) {
            return $next($request);
        }
        // $roles = array_slice(func_get_args(), 2); // [default, customer, reseller]

        // foreach ($roles as $role) {

        //     try {
        //         if ($role == 'customer' && isset(Auth::user()->CUSTOMER_NO)) {
        //             return $next($request);
        //         }elseif($role == 'reseller' && isset(Auth::user()->RESELLER_NO)) {
        //             return $next($request);
        //         }
        //     } catch (ModelNotFoundException $exception) {

        //         dd('Could not find role ' . $role);
        //     }
        // }
        echo '<pre>';
        echo '======================<br>';
        print_r('middleware '.Auth::user());
        echo '<br>======================<br>';
        exit();
        // return redirect()->back()->with('flashMessageAlert','You do not have the permission to access the page !');
        return redirect()->route('login');
    }
}
