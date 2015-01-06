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




// Time stamps
// after the loop starts: 0.066ms
// scripts.js:34 after the loop starts: 0.040ms
// scripts.js:34 after the loop starts: 0.066ms
// scripts.js:34 after the loop starts: 0.020ms
// scripts.js:36 the whole loop: 1.120ms
// scripts.js:32 after click: 0.478ms
// scripts.js:32 after click: 0.529ms

// The first click takes over a asecond to make the AJAX call
// The clicks run the code really fast after that



// The first click takes over a asecond to make the AJAX call
// The clicks run the code really fast after that

document.addEventListener("DOMContentLoaded", function() {
console.log("DOM's good");
  var buttons = document.querySelectorAll(".btn");

  // for each selected element
  console.time("the whole loop");
  for (var i = 0; i < buttons.length; i++) {
    console.time("after the loop starts");
    // add click handler
    buttons[i].addEventListener("click", function() {
      console.time("after click");
      loadFile(this.dataset.file);
     console.timeEnd("after click");
    });
    console.timeEnd("after the loop starts");
  }
  console.timeEnd("the whole loop");
});
