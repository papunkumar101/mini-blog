// alert('here')

// langauge chnage 
$('#changeLang').on('change', function() {
    let langss = $(this).val();
    // let url = BASE_URL;
    
    $.ajax({
        url: '/change-lang',
        type: 'post',
        data: {lang:langss},
        datatype:'json',
        success: function(res){
            // console.log(res);
           const status =  res.code == 200 ? res.msg : 'something went wrong!';
            alert(status);
            location.reload();
        }

    });
  });



//   Loggle login form 
$('#loginFormModel').on('click',function(){ 
    $('#registerForm').css('display','none');
    $('#logHere').css('display','none');
});
$('.toggle-form').on('click',function(){
    $('#registerForm').toggle();
    $('#logHere').toggle();
    $('#loginForm').toggle();
    $('#regHere').toggle();
});


// Login form submit 
$('#loginFormBtn').on('click',function(){
    $.ajax({
        url : '/login',
        type : 'post',
        data : $('#loginForm').serialize(),
        datatype : 'json',
        success : function(resp){
         console.log(resp);
        },
        error : function(resp){
            console.log(resp);
        }
    });
});


// Register form submit 
$('#registerFormBtn').on('click',function(){
    $.ajax({
        url : '/register',
        type : 'post',
        data : $('#registerForm').serialize(),
        datatype : 'json',
        success : function(resp){
         console.log(resp);
        }
    });
});