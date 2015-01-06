function loadFile(file) {
  var getInfo = new XMLHttpRequest();

  getInfo.open("GET", file);
  getInfo.send();

  getInfo.onreadystatechange = function() {
    var text = document.getElementById("textTarget");
    if (getInfo.readyState === 4) {
      if (getInfo.status === 200) {
        text.innerHTML = getInfo.responseText;
      } else {
        console.log("There was a problem with the request.");
      }
    }
  }
}

// The first click takes over a asecond to make the AJAX call
// The clicks run the code really fast after that
console.time("run");
document.addEventListener("DOMContentLoaded", function() {
console.log("DOM's good");
  var buttons = document.querySelectorAll(".btn");

  // for each selected element
  console.time("run");
  for (var i = 0; i < buttons.length; i++) {
    // add click handler
    buttons[i].addEventListener("click", function() {

      loadFile(this.dataset.file);

    });
  }

});
console.timeEnd("run");
