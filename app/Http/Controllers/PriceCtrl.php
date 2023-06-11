<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PriceCtrl extends Controller
{
    function index(){
        return view('price');
    }
}
