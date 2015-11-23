$(".btn").click(function(){
  var getData = $(this).data("file");
  $("#textTarget").load(getData);
});
