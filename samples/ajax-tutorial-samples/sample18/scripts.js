$.getJSON("soccerplayers.json", function(players) {
  $.each(players, function(i) {
    var newDiv = $("<div></div>");
    $(newDiv).append(players[i].playerOne);
    $("#textTarget").append(newDiv);
  })
});
