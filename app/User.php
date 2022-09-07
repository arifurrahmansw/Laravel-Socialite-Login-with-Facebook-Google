<?php
namespace App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

        protected $table        = 'users';
        protected $primaryKey   = 'id';

        protected $fillable = [
            'name','email'
        ];
 
        protected $casts = [
            'email_verified_at' => 'datetime',
        ];
       

}
