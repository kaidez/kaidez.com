/*
 * RequireJS module name: form
 * 
 * Code that manages the contact form. Attribution goes to Spruce 
 * Interactive's original code at:
 * http://www.spruce.it/noise/simple-ajax-contact-form/
 */


// Start RequireJS code
define(["jquery", "spin", "ladda"], function($, spin, Ladda) {

  $("#contact").submit(function(event) {
    var name = $("#formNameField").val(),
        email = $("#formEmailField").val(),
        text = $("#formMessageField").val(),
        dataString = 'name='+ name + '&email=' + email + '&text=' + text;

    $.ajax({
      type: "POST",
      url: "/email.php",
      data: dataString,
      success: function(){
        $("#contact").fadeOut(100);
        $("#successMsg").fadeIn(100);
      }
    });
    
    return false;

  });

  Ladda.bind( 'input[type=submit]' );


});