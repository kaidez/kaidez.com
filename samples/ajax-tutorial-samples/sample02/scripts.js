// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
function getXHR() {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    alert("Supports newer XHR implementations");
  } else {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
      alert("Supports one version of ActiveX");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
        alert("Supports another version of ActiveX");
      } catch (e) {
        xhr = false;
        alert("Sorry...this browser doesn't support XMLHttpRequest");
      }
    }
  }
  return xhr;
}
