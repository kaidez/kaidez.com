/*
 *
 *
 */

define(function() {
  
 var allFields = document.contactForm.getElementsByTagName("input");
    
    for (key in allFields) {

      var theFields = allFields[key];

      theFields.onblur = function() {
        if(this.value === '') {
          console.log("nope");
        }
      }
    };

});