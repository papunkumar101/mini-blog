@extends('includes.layout')
@section('title','Home Page')


@section('main-content-section')
<div class="container my-3">
    <h1 class="text-center my-3">{{__('message.home_page')}}</h1>
    <?php //"<pre/>";print_r($news);exit;?>
@foreach($news->posts as $result)
    <div class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <span class="navbar-text">
                <h2><a href="post-details/{{$result->id}}" style="text-decoration:none">{{$result->title}}</a></h2>
                <p>{{$result->body}}<a href="post-details/{{$result->id}}">Read More</a></p> 
            </span>
        </div>
    </div><br>
@endforeach
    
</div>
@endsection

