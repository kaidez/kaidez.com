webpackJsonp([4],{0:function(e,t,n){n(1),n(7),e.exports=n(25)},25:function(e,t,n){function a(e,t){r.getJSON(e).done(function(e){for(var n in e){if(e.hasOwnProperty(n)){var a=e[n].link;getTitle=e[n].title,sitemapLink=document.createElement("a"),sitemapLinkParagragh=document.createElement("p"),targetElement=document.getElementById(t),docFrag=document.createDocumentFragment(),"Front Page"!==getTitle&&"Site Map"!==getTitle&&(sitemapLink.setAttribute("href",a),sitemapLink.innerHTML=getTitle,sitemapLinkParagragh.appendChild(sitemapLink),docFrag.appendChild(sitemapLinkParagragh))}targetElement.appendChild(docFrag)}})}var r=n(2);document.addEventListener("DOMContentLoaded",function(e){var t="/wp-json/posts",n="/wp-json/pages";a(t,"posts"),a(n,"pages")})}});