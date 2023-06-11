@include('includes.layout')


<div class="container">
    <h1 class="text-center">Conatct Page</h1>
    <div class="row">
        <div class="col-md-6 col-12"> 
            @if(session('success'))<h3 class="text-success">{{session('success')}}</h3>@endif
            <form action="/contact" method="Post">
                @csrf
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Full Name</label>
                    <input type="text" name="fullName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    @if($errors->any()) <span class="error text-danger">{{$errors->first('fullName')}}</span>@endif
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name="emailId" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    @if($errors->any()) <span class="error text-danger">{{$errors->first('emailId')}}</span>@endif
                </div>  
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Message</label>
                    <textarea name="messageText" id="" cols="70" rows="5"></textarea>
                    @if($errors->any()) <span class="error text-danger">{{$errors->first('messageText')}}</span>@endif
                </div>  
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>