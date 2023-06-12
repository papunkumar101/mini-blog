<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeneralCtrl extends Controller
{
    function ChangeLanguages(Request $request){
        // dd($request);
        \Session::put('locale',$request->lang);
        
        $language = $request->lang == 'en'? 'English':'Hindi';
        $status['msg'] = "Change to $language Language.";
        $status['code'] = 200;

        return $status;
    }


    function PostDetails(Request $request){
        $url = "https://dummyjson.com/post/".$request->id;
        $post = \Http::get($url);
        $post = json_decode($post);

        $news = \Http::get('https://dummyjson.com/posts');
        $news = json_decode($news);
        return view('postDetails',compact('post','news'));
    }
}
