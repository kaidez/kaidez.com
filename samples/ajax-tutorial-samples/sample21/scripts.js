$("#textTarget").load("article.html #author");

var getFile = $.ajax("article.html")
  .done(function() {
    alert( "success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "complete" );
  });
