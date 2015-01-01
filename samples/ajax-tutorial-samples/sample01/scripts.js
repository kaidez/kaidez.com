// Feature-detect XMLHttpRequest implementation
var xhr;
if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
  xhr = new XMLHttpRequest();
  alert("Supports newer XHR implementations");
} else if (window.ActiveXObject) { // For IE 6 and lower
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
  alert("Supports older XHR implementations");
}
