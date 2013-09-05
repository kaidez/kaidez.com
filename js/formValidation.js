/*
 *
 *
 */
define(function() {

  var allFields = document.forms.contact.getElementsByTagName("input"),
      validationInfo = {
        "name" : {
          "required": true
        },
        "email" : {
          "required": true
        },
        "text" : {
          "required": true
        }
      },
      storeThisName;
  /*
   * In order to safley use 'toggle()', we need to detect
   * "Modernizr.classlist". But it's a Modernizer non-core detect and
   * grunt-modernizr doesn't look for non-core detects. We need to 
   * manually add it using the Modernizr addTest() API.
   */
  Modernizr.addTest("classlist", "classList" in document.documentElement);

  /*
   * Finding the form by ID is faster than finding it by its name for the most 
   * part. See the  jsPerf test at: http://jsperf.com/finding-input-fields.
   */
  
  
  document.forms.contact.onsubmit = function() {
    storeThisName = this.name;
    var spanName = storeThisName + "Error",
      spanNameMsg = document.getElementById(spanName);
    for (key in validationInfo) {
      var myField = document.getElementById(key);
      if((validationInfo[key].required) && (myField.value === "")) {
        spanNameMsg.innerHTML = this.name + " is required";
        spanNameMsg.classList.toggle("error-fade");
      }
    }
  }

  for (key in allFields) {

    var theFields = allFields[key];
    theFields.onblur = function() {
      storeThisName = this.name;
      var spanName = storeThisName + "Error",
          spanNameMsg = document.getElementById(spanName);
      if(this.value === "") {
        spanNameMsg.innerHTML = this.name + " is required";
        spanNameMsg.classList.toggle("error-fade");
      } else {
        spanNameMsg.innerHTML = "";
      }
    }

  };

});