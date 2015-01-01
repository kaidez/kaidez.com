// Feature-detect XMLHttpRequest implementation
// More robust detecting of ActiveX implementations
(function(){
  var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
      console.log("Supports newer XHR implementations");
    } else {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
        console.log("Supports one version of ActiveX");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
          console.log("Supports another version of ActiveX");
        } catch (e) {
          xhr = false;
        }
      }
    }
  return xhr;
})();
