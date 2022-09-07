<?php
namespace App\Http\Controllers\Auth;
use DB;
use Auth;
use App\User;
use Socialite;
use AuthenticatesUsers;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;
class SocialController extends Controller
{
    protected $user;
    public function __construct(
        User            $user
    )
    {
        $this->user     = $user;
    }
    public function getLogin(){
        return view('auth.login');
    }

    public function redirectToProvider(string $provider) : RedirectResponse
    {
        
        return Socialite::driver($provider)->redirect();
    }
 

    public function handleProviderCallback(string $provider) : RedirectResponse
    {
        try {
            $data = Socialite::driver($provider)->stateless()->user();
            return $this->handleUser($data, $provider);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->with('flashMessageWarning', 'Login failed. Please try again');
        }
    }

    public function handleUser(object $data, string $provider) : RedirectResponse
    {
        if($provider == 'google'){
            $social_id = 'google_id';
        }
        else{
            $social_id = 'facebook_id';
        }
        try {
            $existUser  = User::where(['email' => $data->email])->first();
                if(!empty($existUser)){
                    $existUser->update([
                        'profile_pic_url' => $data->avatar,
                        'provider'        => $provider,
                        'token'           => $data->token,
                        $social_id        => $data->id,
                    ]);
                    Auth::login($existUser);
                }
                else{
                    $this->createUser($data, $provider);
                }           
        return redirect()->back();
        } catch (Exception $e) {
            dd($e->getMessage());
            return redirect()->route('home')->with('flashMessageWarning', 'Login failed. Please try again');
        }
    }

    public function createUser(object $data, string $provider)
    {
        DB::beginTransaction();
        try {
            $user              = new User;
            $user->name        = $data->name;
            $user->email       = $data->email;
            $user->profile_pic_url = $data->avatar;
            $user->provider    = $provider;
            $user->is_active   = 1;
            if($provider == 'google'){
                $user->google_id   = $data->id;
            }
            else
            {
                $user->facebook_id       = $data->id;
            }
            $user->save();

            Auth::login($user);
        } catch (\Exception $e) {
            dd($e->getMessage());
            DB::rollback();
            return redirect()->route('home')->with('flashMessageWarning', 'Login failed. Please try again !');
            }
            DB::commit();
            return redirect()->route('home');
    }

 
}
