<?php
namespace App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

        protected $table        = 'SLS_CUSTOMERS';
        protected $primaryKey   = 'PK_NO';
        const CREATED_AT        = 'SS_CREATED_ON';
        const UPDATED_AT        = 'SS_MODIFIED_ON';

        protected $fillable = [
            'NAME','EMAIL','UKSHOP_PASS','FB_ID','GOOGLE_ID'
        ];
        public function getAuthPassword()
        {
            return $this->UKSHOP_PASS;
        }
        protected $casts = [
            'email_verified_at' => 'datetime',
        ];
        public static function boot()
        {
           parent::boot();
           static::creating(function($model)
           {
               $user = Auth::user();
               $model->F_SS_CREATED_BY = '';
           });
           static::updating(function($model)
           {
               $user = Auth::user();
               $model->F_SS_MODIFIED_BY = '';
           });
       }

    public function country() {
        return $this->hasOne('App\Models\Country', 'PK_NO', 'F_COUNTRY_NO');
    }

    public function getSocialAttribute($value)
    {
        return json_decode($value);
    }
}
