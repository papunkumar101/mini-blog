<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutCtrl extends Controller
{
    function index(){
        return view('about');
    }
}
