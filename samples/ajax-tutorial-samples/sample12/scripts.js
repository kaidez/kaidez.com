$.ajax({
  url: "articleName.html",
  success: isLoaded,
  statusCode: {
    200: function() {
      console.log("Everything is loaded!!!");
    }
  }
}).done(function(data) {
  $("#textTarget").html(data);
});

function isLoaded() {
  $("#isLoadedTarget").html("<p>The file has loaded...make sure to check the console for a message returned by the status code property!!!</p>");
}
