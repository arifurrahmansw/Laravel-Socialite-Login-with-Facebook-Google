<h2> Step 1</h2>
<div class="highlight">
<pre class="highlight plaintext">
<code>
    composer create-project --prefer-dist laravel/laravel social login
</code>
</pre>
</div>
<p>
   install laravel/ui package in order to generate authentication in laravel 8.
</p>
<pre class="highlight plaintext"><code>
composer require laravel/ui
</code></pre>
<p>
   And than
</p>
<pre class="highlight plaintext">
    <code>
        php artisan ui bootstrap --auth
    </code>
</pre>
<h2> Step 2</h2>
<div class="highlight">
   <pre class="highlight plaintext"><code>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=social
DB_USERNAME=root
DB_PASSWORD=
</code></pre>
</div>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
    php artisan serve
</code>
</pre>
</div>
<h2>Step 3</h2>
<div class="highlight">
   <pre class="highlight plaintext"><code>composer require laravel/socialite
</code></pre>
</div>
<p>In the providers array, of config/app.php add</p>
<div class="highlight">
   <pre class="highlight plaintext"><code>Laravel\Socialite\SocialiteServiceProvider::class,
</code></pre>
</div>
<p>In the aliases array</p>
<p>In the providers array, of config/app.php add</p>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
    'Socialite' => Laravel\Socialite\Facades\Socialite::class,
</code></pre>
</div>
<p>add services to you services.php so go to config/services </p>
<pre class="highlight plaintext">
<code>
'facebook'      => [
    'client_id'     => env('FACEBOOK_CLIENT_ID'),
    'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
    'redirect'      => env('FACEBOOK_CALLBACK_URL')
],
'google' => [
    'client_id'     => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect'      => env('GOOGLE_CALLBACK_URL')
],
</code></pre>
<p>Add the following to .env</p>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
    FACEBOOK_CLIENT_ID=""
    FACEBOOK_CLIENT_SECRET=""
    FACEBOOK_CALLBACK_URL="https://your-site.com/auth/facebook/callback"
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    GOOGLE_CALLBACK_URL="https://your-site.com/auth/google/callback"
</code>
</pre>
</div>


<h2>Step 4</h2>
<p>Go to your database/migration folder, replace the user schema with the following</p>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
    <?php
    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreateUsersTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('users', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('email')->unique();
                $table->string('profile_pic_url');
                $table->string('provider');
                $table->string('token');
                $table->string('google_id');
                $table->string('facebook_id');
                $table->string('password');
                $table->string('is_active');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::dropIfExists('users');
        }
    }
</code></pre>
</div>
<p>Run php artisan migrate command</p>


<h2>Step 5</h2>
<p>Make Controlle</p>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
php artisan make:controller SocialController
</code></pre>
</div>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
 
    class SocialController extends Controller
    {
        protected $user;
        public function __construct(
            User            $user
        )
        {
            $this->user     = $user;
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
                $isUser  = User::where(['email' => $data->email])->first();
                    if(!empty($isUser)){
                        $isUser->update([
                            'profile_pic_url' => $data->avatar,
                            'provider'        => $provider,
                            'token'           => $data->token,
                            $social_id        => $data->id,
                        ]);
                        Auth::login($isUser);
                    }
                    else{
                        $this->createUser($data, $provider);
                    }           
            return redirect()->back();
            } catch (Exception $e) {
                dd($e->getMessage());
                return redirect()->back()->with('flashMessageWarning', 'Login failed. Please try again');
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
                DB::rollback();
                return redirect()->back()->with('flashMessageWarning', 'Login failed. Please try again !');
                }
                DB::commit();
                return redirect()->back();
        }

 
    }

</code></pre>
</div>
<p>Dont't forget to add</p>
<div class="highlight">
   <pre class="highlight plaintext">
<code>
 use Socialite;
</code></pre>
</div>
## Thank you