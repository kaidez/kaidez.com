/*
 *
 *
 */

define(function() {

  /*
   * Find the form by ID is faster than finding it by its name.  See the 
   * jsPerf test at: http://jsperf.com/finding-input-fields.
   */ 
  var allFields = document.getElementById("contact").getElementsByTagName("input");

    for (key in allFields) {

      var theFields = allFields[key];

      theFields.onblur = function() {
        if(this.value === "") {
          console.log("nope");
        }
        
      }
    };

});