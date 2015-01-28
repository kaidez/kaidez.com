var getArticleInfo = new XMLHttpRequest();

getArticleInfo.open("GET", "articleName.html");
getArticleInfo.send();

getArticleInfo.onreadystatechange = function() {
  var text = document.getElementById("textTarget");
  if ((getArticleInfo.readyState === 4) && (getArticleInfo.status === 200)) {
      text.innerHTML = getArticleInfo.responseText;
  } else {
    console.log("There was a problem with the request.");
  }
};
