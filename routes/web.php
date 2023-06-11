<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeCtrl;
use App\Http\Controllers\PriceCtrl;
use App\Http\Controllers\AboutCtrl;
use App\Http\Controllers\ContactCtrl;
use App\Http\Controllers\UserCtrl;
use App\Http\Controllers\GeneralCtrl;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::group(['middleware' => 'ChangeLanguage'], function(){
    
    Route::get('/',[HomeCtrl::Class,'index']);
    Route::get('/about',[AboutCtrl::Class,'index']);
    Route::get('/contact',[ContactCtrl::Class,'index']);
    Route::post('/login',[UserCtrl::Class,'UserLogin']);
    Route::post('/register',[UserCtrl::Class,'UserRegister']);
    Route::get('/price',[PriceCtrl::Class,'index']);

    Route::post('/contact',[ContactCtrl::Class,'formSubmit']);
    Route::post('/change-lang',[GeneralCtrl::Class,'ChangeLanguages']);
});
