$(document).ready(function(){
    var show_btn=$('.signup');
   var close_btn=$('.close');
   
    //$("#testmodal").modal('show');
    
      show_btn.click(function(){
        $(".validation").remove();
         $("#myModal1").css("display","block");
       $("#myModal").css("display","none");
    })
          close_btn.click(function(){
            $('.reg').val('');
         $(".modal-backdrop.in").css("opacity","0");
    })
   });
      $(document).on('click', '.profileclass', function(event) {
            $(".validation").remove();
        });
   
        $("#password").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#login").click();
            }
        });
   
        $("#reg_confirm_password").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#register").click();
            }
        });
        $("#upd_email").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#update").click();
            }
        });
        $("#change_confirm_password").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#passwordUpdate").click();
            }
        });
        $("#search").keyup(function(event) {
            if (event.keyCode === 13) {
                $(".search").click();
            }
        });
      
   
      $(document).on('click', '#login', function(event) {
        $("#email").parent().next(".validation").remove();
        $("#password").parent().next(".validation").remove();
   
   
        event.preventDefault();
        var focusSet = false;
      if (!$('#email').val()) {
          if ($("#email").parent().next(".validation").length == 0)
          {
              $("#email").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left: 165px;'>Please enter email address</div>");
          }
          $('#email').focus();
          focusSet = true;
      }
      if (!$('#password').val()) {
          if ($("#password").parent().next(".validation").length == 0)
          {
              $("#password").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left: 192px;'>Please enter password address</div>");
          }
          $('#password').focus();
          focusSet = true;
      } 
      if($('#email').val()!='' && $('#password').val()!='') {
              $.ajax({
              url:"https://pointblank.news/login",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
               email: $("#email").val(),
               password: $("#password").val(),
               },
              success: function(response, textStatus, xhr) {
              $(".modal").modal("hide");
              location.reload();
              },
              error: function(response, textStatus, xhr) {
                if(typeof(response.responseJSON.errors.email) != "undefined" && response.responseJSON.errors.email !== null){
                  $('#error_message').fadeIn().html(response.responseJSON.errors.email[0]);
                setTimeout(function() {
                  $('#error_message').fadeOut("slow");
                }, 2000 );
                }
              }
   
          });
      }
      });
   
      $(document).on('click', '#update', function(event) {
        $("#upd_email").parent().next(".validation").remove();
        $("#upd_name").parent().next(".validation").remove();
   
   
        event.preventDefault();
        var focusSet = false;
      if (!$('#upd_email').val()) {
          if ($("#upd_email").parent().next(".validation").length == 0)
          {
              $("#upd_email").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left: 107px;'>Please enter email address</div>");
          }
          $('#upd_email').focus();
          focusSet = true;
      }
      if (!$('#upd_name').val()) {
          if ($("#upd_name").parent().next(".validation").length == 0)
          {
              $("#upd_name").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left:100px;'>Please enter name</div>");
          }
          $('#upd_name').focus();
          focusSet = true;
      } 
      if($('#upd_email').val()!='' && $('#upd_name').val()!='') {
              $.ajax({
              url:"https://pointblank.news/profile",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
               email: $("#upd_email").val(),
               name: $("#upd_name").val(),
               },
              success: function(response, textStatus, xhr) {
              $("#myModal2").modal("hide");
              $('#success_message').fadeIn().html(response.message);
                setTimeout(function() {
                  $('#success_message').fadeOut("slow");
                }, 2000 );
              // location.reload();
              },
              error: function(response, textStatus, xhr) {
                $('#error_message').fadeIn().html(response.responseJSON.error);
                setTimeout(function() {
                  $('#error_message').fadeOut("slow");
                }, 2000 );
              }
   
          });
      }
      });
   
   
      $(document).on('click', '#passwordUpdate', function(event) {
          event.preventDefault();
          $("#new-pass").parent().next(".validation").remove();
        $("#old-pass").parent().next(".validation").remove();
        var focusSet = false;
      if (!$('#new-pass').val()) {
          if ($("#new-pass").parent().next(".validation").length == 0)
          {
              $("#new-pass").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter new password</div>");
          }
          $('#new-pass').focus();
          focusSet = true;
      }
      if (!$('#old-pass').val()) {
          if ($("#old-pass").parent().next(".validation").length == 0)
          {
              $("#old-pass").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter old password</div>");
          }
          $('#old-pass').focus();
          focusSet = true;
      } 
      if($('#new-pass').val()!='' && $('#old-pass').val()!='') {
              $.ajax({
              url:"https://pointblank.news/changepassword",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
               password: $("#new-pass").val(),
               old_password: $("#old-pass").val(),
               password_confirmation: $("#change_confirm_password").val(),
               },
              success: function(response, textStatus, xhr) {
              $("#myModal2").modal("hide");
              location.reload();
              },
              error: function(response, textStatus, xhr) {
            
                $('#error_message2').fadeIn().html(response.responseJSON.error);
                setTimeout(function() {
                  $('#error_message2').fadeOut("slow");
                }, 2000 );
                 
              }
   
          });
      }
      });
   
      $(document).on('click', '#register', function(event) {
        event.preventDefault();
          $("#name").parent().next(".validation").remove();
        $("#reg_email").parent().next(".validation").remove();
        $("#reg_password").parent().next(".validation").remove();
        $("#reg_email").parent().next(".validation").remove();
        var focusSet = false;
      if (!$('#name').val()) {
          if ($("#name").parent().next(".validation").length == 0)
          {
              $("#name").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left:105px;'>Please enter name</div>");
          }
          $('#name').focus();
          focusSet = true;
      }
      if (!$('#reg_email').val()) {
          if ($("#reg_email").parent().next(".validation").length == 0)
          {
              $("#reg_email").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left:105px;'>Please enter email</div>");
          }
          $('#reg_email').focus();
          focusSet = true;
      } 
      if (!$('#reg_password').val()) {
          if ($("#reg_password").parent().next(".validation").length == 0)
          {
              $("#reg_password").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-left:100px;margin-left:130px;'>Please enter password</div>");
          }
          $('#reg_password').focus();
          focusSet = true;
      } 
      if (!$('#reg_confirm_password').val()) {
          if ($("#reg_confirm_password").parent().next(".validation").length == 0)
          {
              $("#reg_confirm_password").parent().after("<div class='validation' style='color:red;margin-bottom: 20px;margin-right:60px;'>Please enter confirm password</div>");
          }
          $('#reg_confirm_password').focus();
          focusSet = true;
      } 
      if($('#name').val()!='' && $('#reg_email').val()!='' && $('#reg_password').val()!='' && $('#reg_confirm_password').val()!='') {
              $.ajax({
              url:"https://pointblank.news/register",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
                name: $("#name").val(),
               email: $("#reg_email").val(),
               password: $("#reg_password").val(),
               password_confirmation: $("#reg_confirm_password").val(),
   
               },
              success: function(response, textStatus, xhr) {
              $(".modal").modal("hide");
              location.reload();
              },
              error: function(response, textStatus, xhr) {
                if(typeof(response.responseJSON.errors.email) != "undefined" && response.responseJSON.errors.email !== null){
                  $('#error_message1').fadeIn().html(response.responseJSON.errors.email[0]);
                setTimeout(function() {
                  $('#error_message1').fadeOut("slow");
                }, 2000 );
                }
                if(typeof(response.responseJSON.errors.password) != "undefined" && response.responseJSON.errors.password !== null){
                  $('#error_message1').fadeIn().html(response.responseJSON.errors.password[0]);
                setTimeout(function() {
                  $('#error_message1').fadeOut("slow");
                }, 2000 );
                }
              }
   
          });
      }
      });
     
   
      function like(postId,status,likes) {
        var likesTotal =0;
          event.preventDefault();
              $.ajax({
              url:"https://pointblank.news/like",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
                post_id: postId,
                status: status,
               },
              success: function(response, textStatus, xhr) {
                if(status == 1){
                   likesTotal = parseInt(likes) + parseInt(1);
                  $('#likes_'+postId+'').empty().append(likesTotal);
                  $('#likeBtn_'+postId+'').empty().append(`<a target="_blank" onclick="like(`+postId+`,0,`+likesTotal+`)"><i class="fa fa-heart" style="color:red"></i></a>`);
                  }else{
                    likesTotal = parseInt(likes) - parseInt(1);
                  $('#likes_'+postId+'').empty().append(likesTotal);
                    $('#likeBtn_'+postId+'').empty().append(`<a target="_blank" onclick="like(`+postId+`,1,`+likesTotal+`)"><i class="fa fa-heart-o"></i></a>`);
                  }
              },
              error: function(response, textStatus, xhr) {
                $('#error_message').fadeIn().html(response.responseJSON.error);
                setTimeout(function() {
                  $('#error_message').fadeOut("slow");
                }, 2000 );
                  $('#myModal').modal('show');
              }
   
          });
      }
   
      function bookmark(postId,status) {
          event.preventDefault();
              $.ajax({
              url:"https://pointblank.news/bookmark",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
                post_id: postId,
                status: status,
               },
              success: function(response, textStatus, xhr) {
                if(status == 1){
                    $('#bookmarkBtn_'+postId+'').empty().append(`<a target="_blank" onclick="bookmark(`+postId+`,0)"><i class="fa fa-bookmark" style="color:#121011"></i></a>`);
                  }else{
                    $('#bookmarkBtn_'+postId+'').empty().append(`<a target="_blank" onclick="bookmark(`+postId+`,1)"><i class="fa fa-bookmark-o"></i></a>`);
                  }
              },
              error: function(response, textStatus, xhr) {
                $('#myModal').modal('show');
                $('#error_message').fadeIn().html(response.responseJSON.error);
                setTimeout(function() {
                  $('#error_message').fadeOut("slow");
                }, 2000 );
              }
   
          });
      }
   
      function interestCategory(categoryId,status) {
          event.preventDefault();
              $.ajax({
              url:"https://pointblank.news/interestCategory",
              type: 'POST',
              data: { 
                _token: 'MR3qvK4ytwGFWEV6S8iW9izuMtL6s8UIXjdvhXHP',
                category_id: categoryId,
                status: status,
               },
              success: function(response, textStatus, xhr) {
                // if(status == 1){
                //     $('#bookmarkBtn_'+postId+'').empty().append(`<a target="_blank" onclick="bookmark(`+postId+`,0)"><i class="fa fa-bookmark" style="color:#121011"></i></a>`);
                //   }else{
                //     $('#bookmarkBtn_'+postId+'').empty().append(`<a target="_blank" onclick="bookmark(`+postId+`,1)"><i class="fa fa-bookmark-o"></i></a>`);
                //   }
              },
              error: function(response, textStatus, xhr) {
                $('#myModal').modal('show');
                $('#error_message').fadeIn().html(response.responseJSON.error);
                setTimeout(function() {
                  $('#error_message').fadeOut("slow");
                }, 2000 );
              }
   
          });
   
      }
      $(document).on('click', '.search', function(event) {
             var searchData = $("#search").val();
            //  if(searchData.length >=3){
             var url="https://pointblank.news/category/search?q="+searchData+"";
             window.location = url;
            //  }
      });
     
      
      var q = "";
      var type = "";
          
      
      $(document).ready(function() {
  
          $("#category_"+type).addClass('active');
  
          $('#content').scrollPagination({
  
              nop     : 6, 
              offset  : 0, 
              error   : 'No More News!', 
              delay   : 500, 
              scroll  : true, 
              path    : "https://pointblank.news/load/post",
              q       : q,
              type    : type
          });
          
      });
  