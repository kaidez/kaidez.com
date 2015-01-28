function loadHTML() {
  var getInfo = new XMLHttpRequest();

  getInfo.open("GET", "articleName.html");
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

// Code that loads the data on a button click
document.getElementById("getHTMLFile").addEventListener("click", loadHTML);
