@extends('includes.layout')
@section('title','Post Details Page - ')


@section('main-content-section')
<div class="container my-3">
    <h1 class="text-center my-3">Blog Details Page</h1>   
    <div class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <span class="navbar-text">
                <h2>{{$post->title}}</h2>
                <p>{{$post->body}}</p>
                <br>
                @php $tag_count = (count($post->tags)-1); @endphp
                <strong class="text-muted float-left">Tags : @foreach($post->tags as $key=>$tag)#{{$tag}}@if($key < $tag_count),@endif @endforeach</strong><br><strong class="float-right text-muted">Like : {{$post->reactions}}</strong>
            </span>
        </div>
    </div><br> 
    <h3 class="text-uppercase">Other Blogs You May Like</h3>
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

