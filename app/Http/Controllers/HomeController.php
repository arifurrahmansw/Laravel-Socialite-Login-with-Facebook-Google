<?php
namespace App\Http\Controllers;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
class HomeController extends Controller
{


    public function index(Request $request)
    {
		$data = [];
 
        return view('index')->withData($data);
    }




}
