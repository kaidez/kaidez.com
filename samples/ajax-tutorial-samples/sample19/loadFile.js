// Run this function on page load
function getHtmlFile() {

  $("#textTarget").load("articleName.html");
  
};

// Run this function on when "#textTarget" is clicked
function setText() {

  $("#textTarget").css({
    "color": "red",
    "font-weight": "bold"
  });

};
