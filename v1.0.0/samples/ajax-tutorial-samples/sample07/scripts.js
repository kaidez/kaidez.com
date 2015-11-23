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

var getButtons = document.querySelectorAll(".btn");

for (key in getButtons) {

  var singleButton = getButtons[key];

  // If a button is clicked, run the loadFile() function
  // Do feature detection to see if the browser supports "dataset"
  // Get the value of the file listed in the "data-file" attribute
  // Pass it as a parameter to loadFile()
  singleButton.onclick = function() {
    if(!this.dataset) {
      loadFile(this.getAttribute("data-file"));
    } else {
      loadFile(this.dataset.file);
    }
  }

}
