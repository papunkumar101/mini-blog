<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeCtrl extends Controller
{
 public function index()
 {
    $news = \Http::get('https://dummyjson.com/posts');
    // echo $news;exit;
    // dd(json_decode($news)->posts[0]->title); 
    // $one = json_decode($news);
//    echo '<pre/>';print_r($one);exit;
    return view('index');
 }
}
