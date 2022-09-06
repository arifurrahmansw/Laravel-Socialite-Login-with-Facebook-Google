<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\HasAccess;
use App\Traits\ApiResponse;

class CheckTokenMiddleware
{
    use ApiResponse;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        $access = new HasAccess();
        $client = $request->header('user-agent');
        $access_token = $request->header('Authorization');

        if ($access_token == '') {
            $response = $this->errorResponse(200, 'Missing access token !', null, 0);

            return response()->json($response, 200);
        }

        $isValidToken = $access->hasTokenValidity($access_token, $client);

        if (!$isValidToken) {
            $response = $this->errorResponse(200, 'Trying by invalid token !', null, 0);

            return response()->json($response, 200);
        }

        return $next($request);
    }
}
