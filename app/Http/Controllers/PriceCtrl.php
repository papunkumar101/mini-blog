<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PriceCtrl extends Controller
{
    function index(){ 
        return view('price');
    }

    function searchData(Request $request) {
        $data = [];
        $skip = $request->skip ? $request->skip : 0;
        $limit = $request->SHOW_ENTRIES ? $request->SHOW_ENTRIES : 10; 
        $search = $request->SEARCH_TEXT ? $request->SEARCH_TEXT : '';
        // $date = $request->TO_DATE && $request->FROM_DATE ? dd($request->TO_DATE, $request->FROM_DATE) : '';

        $api_url = $search !== '' ? 'https://dummyjson.com/products/products/search?q='.$search : 'https://dummyjson.com/products'; 
        $response = \Http::get($api_url, ['skip' => $skip,'limit' => $limit]);
        if ($response->successful()) { 
            $data = $response->body(); 
            $data = $response->json();  
            $data['status'] = 200;
        } else { 
            $data['statusCode'] = $response->status();
            $data['errorMessage'] = $response->body();  
        } 

        return $data;
    }
}
