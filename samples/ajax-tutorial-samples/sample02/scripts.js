// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
function getXHR() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        xhr = false;
      }
    }
  }
  return xhr;
}
