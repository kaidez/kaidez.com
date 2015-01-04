// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
function getXHR() {
  var xhr;
  if (window.XMLHttpRequest) { // Browsers other than IE 6 and lower
    xhr = new XMLHttpRequest();
  } else {
    try { // Browsers with one type of ActiveXObject build
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try { // Browsers with another type of ActiveXObject build
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        // Browsers that don't support either XMLHttpRequest or ActiveXObject
        xhr = false;
      }
    }
  }
  return xhr;
}
