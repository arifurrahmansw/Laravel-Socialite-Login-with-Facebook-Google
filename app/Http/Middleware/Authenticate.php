<?php

namespace App\Http\Middleware;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            if(\Session::has('flashMessageError')){
                session()->flash('flashMessageError', session('flashMessageError'));
            }elseif(\Session::has('flashMessageSuccess')){
                session()->flash('flashMessageSuccess', session('flashMessageSuccess'));
            }
            return route('login');
        }
    }
}
