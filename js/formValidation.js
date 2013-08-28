/*
 *
 *
 */

define(function() {

  /*
   * Finding the form by ID is faster than finding it by its name for the most 
   * part. See the  jsPerf test at: http://jsperf.com/finding-input-fields.
   */
  var allFields = document.getElementById("contact").getElementsByTagName("input");

    for (key in allFields) {

      var theFields = allFields[key];
      
      theFields.onblur = function() {
        var spanName = this.name + "-error",
          spanNameMsg = document.getElementById(spanName);
        if(this.value === "") {
          spanNameMsg.innerHTML = this.name + " is required";
        } else {
          spanNameMsg.innerHTML = "";
        }
      }

    };

});