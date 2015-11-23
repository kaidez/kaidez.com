var getArticleInfo = new XMLHttpRequest();

getArticleInfo.onreadystatechange = loadText;
getArticleInfo.open("GET", "articleName.txt");
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
