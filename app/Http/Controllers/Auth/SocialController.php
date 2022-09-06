<?php
namespace App\Http\Controllers\Auth;
use DB;
use Auth;
use App\User;
use Socialite;
use App\Reseller;
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
        $this->middleware('guest:customer,reseller')->except('logout');
        $this->user     = $user;
    }
    public function getLogin(){
        return view('auth.login');
    }

    public function redirectToProvider(string $provider,$id = 1) : RedirectResponse
    {
        session(['user_type' => $id]);
        return Socialite::driver($provider)->redirect();
    }

    public function redirectToProviderReseller(string $provider,$id = 2) : RedirectResponse
    {
        session(['user_type' => $id]);
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider) : RedirectResponse
    {
        $type = session('user_type');
        try {
            $data = Socialite::driver($provider)->stateless()->user();
            return $this->handleUser($data, $provider, $type);
        } catch (\Exception $e) {
            Toastr::error('Login failed. Please try again');
            return redirect()->back();
        }
    }

    public function handleUser(object $data, string $provider,$type) : RedirectResponse
    {
        $old_session        = Session::getId();
        if($type==1){
            $check_deactive = Customer::where('EMAIL',$data->email)->where('IS_ACTIVE',0)->first();
            $check_deleted = Customer::where('EMAIL',$data->email)->where('IS_ACTIVE',2)->first();
        }
        else{
            $check_deactive = Reseller::where('EMAIL',$data->email)->where('IS_ACTIVE',0)->first();
            $check_deleted = Reseller::where('EMAIL',$data->email)->where('IS_ACTIVE',2)->first();
        }
        if(!empty($check_deactive)){
            Toastr::error('oops! your account has been deactivated! please contact website administrator');
            return redirect()->route('login.user-login.get');
        }
        if(!empty($check_deleted)){
            Toastr::error('Your account has been deleted ! Please create new account using a different email and/or mobile number');
            return redirect()->route('login.user-login.get');
        }
        if($provider == 'google'){
            $social_id = 'GOOGLE_ID';
        }
        else{
            $social_id = 'FB_ID';
        }
        try {
            if($type==1){
                $isUser  = User::where(['EMAIL' => $data->email])->first();
                if(!empty($isUser)){
                    $isUser->update([
                        'PROFILE_PIC_URL' => $data->avatar,
                        'PROVIDER'        => $provider,
                        'TOKEN'           => $data->token,
                        $social_id        => $data->id,
                        // 'IS_ACTIVE'       => 1
                    ]);
                    Auth::shouldUse('customer');
                    Auth::login($isUser);
                    $this->cartInt->updateCartSession($old_session);
                }
                else{
                    $this->createUser($data, $provider);
                }
            }
            else{

                $isUser  = Reseller::where(['EMAIL' => $data->email])->first();
                if(!empty($isUser)){
                    $isUser->update([
                        'PROFILE_PIC_URL' => $data->avatar,
                        'PROVIDER'        => $provider,
                        'TOKEN'           => $data->token,
                        $social_id        => $data->id,
                        // 'IS_ACTIVE'       => 1
                    ]);
                    Auth::shouldUse('reseller');
                    Auth::login($isUser);
                }
                else{
                $this->createReseller($data, $provider);
                }
            }
        return redirect()->route('web.index');
        } catch (Exception $e) {
            dd($e->getMessage());
            Toastr::error('Login failed. Please try again');
            return redirect()->route('login.user-login.get');
        }
    }

    public function createUser(object $data, string $provider)
    {

        $old_session           = Session::getId();
        DB::beginTransaction();
        try {
            $user              = new User;
            $user->NAME        = $data->name;
            $user->EMAIL       = $data->email;
            $user->PROFILE_PIC_URL      = $data->avatar;
            $user->PROVIDER    = $provider;
            $user->IS_ACTIVE   = 1;
            if($provider == 'google'){
            $user->GOOGLE_ID   = $data->id;
            }
            else
            {
            $user->FB_ID       = $data->id;
            }
            $user->save();
            Auth::shouldUse('customer');
            Auth::login($user);
        } catch (\Exception $e) {
            DB::rollback();
            Toastr::error('Login failed. Please try again');
            return redirect()->route('login.user-login.get');
            }
            DB::commit();
            return redirect()->route('web.index');
    }

 
}
