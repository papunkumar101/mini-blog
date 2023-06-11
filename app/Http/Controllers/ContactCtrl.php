<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactCtrl extends Controller
{
    function index(){
        return view('contact');
    }

    function formSubmit(Request $request){
    //    dd($request);
    $request->validate([
        'fullName' => 'required',
        'emailId' => 'required | email',
        'messageText' => 'required'
    ]);

 
    // $contact = Contact::create([
    //         'name' => $request['fullName'],
    //         'email' => $request['emailId'],
    //         'message' => $request['messageText']
    //     ]); 
    $contact_obj =  new Contact();
    $contact_obj->name = $request['fullName'];
    $contact_obj->email = $request['emailId'];
    $contact_obj->message = $request['messageText'];
    
    $contact_obj->save();

    return redirect('/contact')->with('success','Thank you for Contacting');
    }
}
