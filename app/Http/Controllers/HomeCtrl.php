<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeCtrl extends Controller
{
    function index(){
        $news = \Http::get('https://dummyjson.com/posts');
        $news = json_decode($news);
        return view('home',compact('news'));
    }
}
