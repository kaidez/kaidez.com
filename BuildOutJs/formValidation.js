/*
 * Module: 'formValidation'
 *
 * Validate contact form fields
 */

define(["jquery"], function($) {

  var validationInfo = {
        "name" : {
          "required": true
        },
        "email" : {
          "required": true
        },
        "text" : {
          "required": true
        }
      };

  /*
   * In order to safely use 'toggle()', we need to detect
   * "Modernizr.classlist". But it's a Modernizr non-core detect and
   * grunt-modernizr doesn't look for non-core detects when it builds out 
   * Modernizr. We need to manually add it using the Modernizr addTest() API.
   */
  Modernizr.addTest("classlist", "classList" in document.documentElement);

  // If form is submitted, validate the fields  
  document.forms.contact.onsubmit = function() {
    var storeThisName = this.name;
        spanName = storeThisName + "Error",
        spanNameMsg = document.getElementById(spanName);
    for (key in validationInfo) {
      if((validationInfo[key].required) && (validationInfo[key].value === "")) {
        spanNameMsg.innerHTML = this.name + " is required";
        spanNameMsg.classList.toggle("error-fade");
      }
    }
  }

  /*
   * We need to detect our form fields by class name in our 'allFields'
   * variable. 'getElementsByClassName()' sucks so we're going to locate this 
   * class name with 'document.querySelectorAll()', which is so-so with 
   * browser support.  Find the class names with jQuery if the browser 
   * doesn't support 'document.querySelectorAll()'.
   */
  if (document.querySelectorAll) {
    var allFields = document.querySelectorAll(".contact-form-field");
  } else {
    var allFields = $(".contact-form-field");
  }
  for (key in allFields) {
    var theFields = allFields[key];

    // If a form field is blurred, validate it  
    theFields.onblur = function() {
      var storeThisName = this.name,
          spanName = storeThisName + "Error",
          spanNameMsg = document.getElementById(spanName);
      if(this.value === "") {
        spanNameMsg.innerHTML = this.name + " is required";
        spanNameMsg.classList.toggle("error-fade");
      } else {
        spanNameMsg.innerHTML = "";
      }
    }

    theFields.onfocus = function() {
      var storeThisName = this.name,
          spanName = storeThisName + "Error",
          spanNameMsg = document.getElementById(spanName);
      if(spanNameMsg.classList.toggle("error-fade")) {
        spanNameMsg.innerHTML = "";
        spanNameMsg.classList.toggle("error-fade");
      } else {
        spanNameMsg.innerHTML = "";
      }
    }
  };

});