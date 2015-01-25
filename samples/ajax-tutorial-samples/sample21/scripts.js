$.get("article.html").done(function(data) {
  $("#textTarget").html(data);
  console.log("The file has loaded!");
});
