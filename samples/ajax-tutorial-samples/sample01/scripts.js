// Feature-detect XMLHttpRequest implementation
var xhr;
if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
  xhr = new XMLHttpRequest();
  console.log("Supports newer XHR implementations");
} else if (window.ActiveXObject) { // For IE 6 and lower
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
  console.log("Supports older XHR implementations");
}
