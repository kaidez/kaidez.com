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
        console.log('There was a problem with the request.');
      }
    }
  }
}

// Code that loads the HTML file on a button click
document.getElementById("getHTMLFile").onclick = function() {
  loadFile("articleName.html");
};

// Code that loads the HTML file on a button click
document.getElementById("getTextFile").onclick = function() {
  loadFile("articleName.txt");
};
