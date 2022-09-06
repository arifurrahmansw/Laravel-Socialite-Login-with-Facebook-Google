<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {


        $rules = [
            '_token'                => 'required',
            'email'                 => 'required|email',
            'password'              => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6'
        ];
        return $rules;
    }

    public function messages()
    {
        return [
           'email.required'         => 'Please Enter Your Email',
           'password.required'      => 'Please Enter Your Password',

        ];
    }


}
