$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  })
  .always(function(){
    console.log("The file either did or didn'r load!");
  });
