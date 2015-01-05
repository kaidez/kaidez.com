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

var getArticleInfo = new getXHR();

getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.html");
getArticleInfo.send();

function loadText() {
  var text = document.getElementById("textTarget");
    if (getArticleInfo.readyState === 4) {
      if (getArticleInfo.status === 200) {
        text.innerHTML = getArticleInfo.responseText;
      } else {
        console.log('There was a problem with the request.');
      }
    }
};
