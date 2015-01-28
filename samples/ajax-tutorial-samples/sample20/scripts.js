$.get("article.html")
  .done(function(data) {
    $("#textTarget").html(data);
  })
  .fail(function() {
    $("#textTarget").html("The file didn't load!");
  });
