<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">{{__('message.mini_blog')}}</a>
    <!-- Example single danger button -->
  
  
    <select  id="changeLang">
        <option value="en" <?=session('locale') == 'en'?'selected':'';?>>English</option>
        <option value="hi" <?=session('locale') == 'hi'?'selected':'';?>>Hindi</option> 
    </select>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" style="justify-content: flex-end">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/price">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">  </a>
        </li>
        <li class="nav-item ">
          <a class="nav-link btn btn-primary text-light" id="loginFormModel" href="javascript:void(0)" tabindex="-1" data-bs-toggle="modal" data-bs-target="#LogRegModal" data-bs-whatever="@mdo">Register/Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


<!-- login register model  -->
<div class="modal fade" id="LogRegModal" tabindex="-1" aria-labelledby="LogRegModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="LogRegModalLabel">User Login</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="error">test : @if($errors->any()){{$errors->first('email')}}@endif</p>
        <form id="loginForm">
          @csrf
          <div class="mb-3">
            <label for="recipient-name1" class="col-form-label">Email:</label>
            <input type="email" name="EmailId" class="form-control" id="recipient-name1">
          </div>
          <div class="mb-3">
            <label for="pass-name1" class="col-form-label">Password:</label>
            <input type="text" name="password" class="form-control" id="pass-name1">
            <p style="float:right"><span ><a href="">Lost your password? </a></span></p>
          </div>
          <button class="btn btn-primary" type="button"  id="loginFormBtn" name="submit" value="submit">Login</button>
        </form>
        <form id="registerForm">
          @csrf
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Full Name:</label>
            <input type="name" name="fullName" class="form-control" id="recipient-name">
          </div>
          <div class="mb-3">
            <label for="recipient-email" class="col-form-label">Email:</label>
            <input type="email" name="EmailId" class="form-control" id="recipient-email">
          </div>
          <div class="mb-3">
            <label for="pass-name" class="col-form-label">Password:</label>
            <input type="text" name="password" class="form-control" id="pass-name">
          </div>
          <button class="btn btn-primary" type="button" id="registerFormBtn" name="submit" value="submit">Register</button>
        </form>
      </div>
      <div class="modal-footer">
        <p id="regHere" class="toggle-form">Not a member yet? <a href="javascript:void(0)" >Register Here</a></p>
        <p id="logHere" class="toggle-form">Already a member? <a href="javascript:void(0)" >Login Here</a></p>
      </div>
    </div>
  </div>
</div>