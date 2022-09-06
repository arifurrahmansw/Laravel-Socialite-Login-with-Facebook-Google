<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'name'                  => 'required',
            'email'                 => 'required|email',
            'phone_no'              => 'required|min:5',
            'subject'               => 'required|min:1',
            'your_message'          => 'required',
        ];
        return $rules;
    }
    public function messages()
    {
        return [
           'name.required'          => 'This field is required',
           'email.required'         => 'This field is required',
           'phone_no.required'      => 'This field is required',
           'subject.required'       => 'This field is required',
           'your_message.required'  => 'This field is required',
        ];
    }


}
