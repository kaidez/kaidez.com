$.ajax({
  url: "articleName.html",
  context: $("#textTarget")
}).done(function() {
  $( this ).addClass( "done" );
});
