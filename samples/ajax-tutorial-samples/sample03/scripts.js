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

var getMyName = new XMLHttpRequest();

getMyName.open("GET", "myName.txt");
getMyName.send();

getMyName.onreadystatechange = function() {
  if (getMyName.status === 200) {
    if (getMyName.readyState === 4) {
      if (getMyName.status === 200) {
        console.log(getMyName.responseText);
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
}
