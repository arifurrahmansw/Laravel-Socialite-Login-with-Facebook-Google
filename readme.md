<h2> Step 1</h2>
<div class="highlight">
    <pre class="highlight plaintext">
    <code>
    composer create-project --prefer-dist laravel/laravel socialite
    </code>
    </pre>
</div>
<p>
install laravel/ui package in order to generate authentication in laravel 9.
</p>
<pre class="highlight plaintext"><code>
composer require laravel/ui
</code></pre>
<p>
And than
</p>
<pre class="highlight plaintext"><code>
php artisan ui bootstrap --auth
</code></pre>
<h2> Step 2</h2>
<div class="highlight"><pre class="highlight plaintext"><code>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=social
DB_USERNAME=root
DB_PASSWORD=
</code></pre></div>
<div class="highlight">
<pre class="highlight plaintext">
<code>
    php artisan serve
</code>
</pre>
</div>
<h2>Step 3</h2>
<div class="highlight"><pre class="highlight plaintext"><code>composer require laravel/socialite
</code></pre></div>

<p>In the providers array, of config/app.php add</p>
<div class="highlight"><pre class="highlight plaintext"><code>Laravel\Socialite\SocialiteServiceProvider::class,
</code></pre></div>

<p>In the aliases array</p>

<p>In the providers array, of config/app.php add</p>
<div class="highlight"><pre class="highlight plaintext">
<code>
    'Socialite' => Laravel\Socialite\Facades\Socialite::class,
</code></pre></div>
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
<div class="highlight"><pre class="highlight plaintext">
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
</code></pre></div>


<p>Run php artisan migrate command</p>


<p>Make Controlle</p>

<div class="highlight"><pre class="highlight plaintext">
<code>
php artisan make:controller SocialController
</code></pre></div>


<div class="highlight"><pre class="highlight plaintext">
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
<div class="highlight"><pre class="highlight plaintext">
<code>
 use Socialite;
</code></pre>
</div>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>



## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[British Software Development](https://www.britishsoftware.co)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- [UserInsights](https://userinsights.com)
- [Fragrantica](https://www.fragrantica.com)
- [SOFTonSOFA](https://softonsofa.com/)
- [User10](https://user10.com)
- [Soumettre.fr](https://soumettre.fr/)
- [CodeBrisk](https://codebrisk.com)
- [1Forge](https://1forge.com)
- [TECPRESSO](https://tecpresso.co.jp/)
- [Runtime Converter](http://runtimeconverter.com/)
- [WebL'Agence](https://weblagence.com/)
- [Invoice Ninja](https://www.invoiceninja.com)
- [iMi digital](https://www.imi-digital.de/)
- [Earthlink](https://www.earthlink.ro/)
- [Steadfast Collective](https://steadfastcollective.com/)
- [We Are The Robots Inc.](https://watr.mx/)
- [Understand.io](https://www.understand.io/)
- [Abdel Elrafa](https://abdelelrafa.com)
- [Hyper Host](https://hyper.host)

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
