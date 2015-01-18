$.ajaxSetup({
  cache: true
});

$.getScript("loadFile.js", function() {

  getHtmlFile();

  $("#textTarget").click(function(){
    setText();
  });

});
