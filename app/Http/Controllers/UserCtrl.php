<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserCtrl extends Controller
{
    function index(){
        return view('user');
    }


    function UserLogin(Request $request){
        $validation = $request->validate([
            'EmailId' => 'required | email',
            'password' => 'required | min:8 | max:20'
        ]);
        // dd($request);

    }

    function UserRegister(Request $request){
        dd($request);
    }


}
