// Try & load "article.html" into "<div id="textTarget">"
$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  })
  .always(function(){
    console.log("The 'article.html' file either did or didn't load!");
  });

// Try & load "article02.html" into "<div id="textTarget02">"
$.get("article02.html")
  .done(function(data) {
    $("#textTarget02").html(data);
  })
  .fail(function() {
    $("#textTarget02").html("The 'article02.html' file didn't load!");
  })
  .always(function(){
    console.log("The 'article02.html' file either did or didn't load!");
  });
