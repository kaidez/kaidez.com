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
var buttons = document.querySelectorAll(".btn");
console.time("run");
  for (key in buttons) {
    var theButtons = buttons[key];

    // If a form field is blurred, validate it
    theButtons.onclick = function() {
      loadFile(this.dataset.file);
    }

}
console.timeEnd("run");
