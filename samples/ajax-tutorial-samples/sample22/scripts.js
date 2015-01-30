$.getJSON("soccerplayers.json").then(
  function(data) {
    $.each(data, function(i) {
      var newDiv = $("<div></div>");
      $(newDiv).append(data[i].playerOne);
      $("#textTarget").append(newDiv);
    })
  }, function(){
    $("#textTarget").html("The data failed to load.");
  },
    function(){
      $("#textTarget").html("The data is loading...");
    }
  );
