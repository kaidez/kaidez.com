/*
 * Code that manages the contact form. Attribution goes to Spruce 
 * Interactive's original code at:
 * http://www.spruce.it/noise/simple-ajax-contact-form/
 */


// Start RequireJS code
define(["jquery"], function($) {

  $("#contact").submit(function(event) {
    var name = $("#form-name").val(),
      email = $("#form-email").val(),
      text = $("#message").val(),
      dataString = 'name='+ name + '&email=' + email + '&text=' + text,
      formHeight = $("#contact").height();

  $('#success-msg').height(formHeight);

    $.ajax({
      type: "POST",
      url: "/email.php",
      data: dataString,
      success: function(){
        $("#contact").fadeOut(100);
        $('#success-msg').fadeIn(100);
      }
    });
    
    return false;

  });
});