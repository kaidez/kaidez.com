webpackJsonp([1],[function(e,t,n){n(7),n(15),e.exports=n(16)},,,,,,,function(e,t,n){var a=n(3),o=n(4);n(8),n(9),n(13);var r=document.getElementById("blog-post-title").innerHTML,s=window.location.href,i=s.replace(/[^/]*$/g,"");document.addEventListener("DOMContentLoaded",function(e){var t="/wp-content/themes/kaidez-swiss/js/sharing-code.html";return o(a.ajax({url:t,type:"GET"})).then(function(e){a(".rp4wp-related-posts").before(e);var t,n=document.getElementById("tweet-this-post");n.setAttribute("href",i),t={facebook:{getLink:"facebook-share-link",linkHandle:"http://www.facebook.com/sharer.php?u="},googlePlus:{getLink:"googleplus-share-link",linkHandle:"https://plus.google.com/share?url="}},Object.getOwnPropertyNames(t).forEach(function(e){var n=t[e].getLink,a=t[e].linkHandle,o=document.getElementById(n);o.setAttribute("title",r),"facebook-share-link"===n?o.setAttribute("href",a+s+"&t="+r):o.setAttribute("href",a+s)})},function(e){console.log("The social sharing links failed to load...you may needs refresh the page.")})}),a("body").delegate("#tweet-this-post","click",function(e){e.preventDefault();var t=this.getAttribute("href");window.open("http://twitter.com/intent/tweet?url="+t+"&text="+r+"&via=kaidez&","twitterwindow","height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")})},function(e,t){!function(e,t){var n,a=e.getElementsByTagName(t)[0],o=e.createDocumentFragment(),r=function(a,r){e.getElementById(r)||(n=e.createElement(t),n.src=a,r&&(n.id=r),o.appendChild(n))};r("http://apis.google.com/js/plusone.js"),r("//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528","facebook-jssdk"),a.parentNode.insertBefore(o,a)}(document,"script")},function(e,t,n){var a=n(10);"string"==typeof a&&(a=[[e.id,a,""]]);n(12)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,n){t=e.exports=n(11)(),t.push([e.id,".hide-element{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.responsive-image{max-width:100%;margin:0 auto;display:block}.ti{text-indent:-9999px}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.z5{z-index:5}.ul-reset{padding-left:0}.br{border-radius:5px}.drop-shadow{box-shadow:3px 2px 5px 0 rgba(0,0,0,.18)}.entry-title-margin{margin-top:20px}.post-list-item{line-height:24px;margin-bottom:20px}.share-post-list-item{display:inline-block;list-style-type:none}.other-sharing-element{margin-top:30px;text-align:center}.other-ways-text{display:block;margin-bottom:10px}.post-pic{max-width:100%;margin:0 auto}.demo-link{padding:10px;color:#fff;background-color:#350518;border-radius:5px}.post-hr{display:block;height:1px;border:0;border-top:1px solid #350518;margin:1em 0;padding:0}.submit{padding:10px;border:none;color:#fff;background-color:#c2115a}.comment-label{display:block}a.demo-link{text-decoration:none}.sharing-buttons{border:1px solid #000}.tweet-post-class{display:block;height:auto;width:280px;margin:15px auto 0;padding:10px;background-color:#ed327f;text-align:center;cursor:pointer;border-radius:5px}a.tweet-post-class{color:#fff;text-decoration:none}a.tweet-post-class:visited{color:#fff}a.tweet-post-class:active,a.tweet-post-class:hover{color:#fff;background-color:#55acee}.post-pic{max-width:100%;margin:0 auto;display:block}.table-of-contents-header{clear:both}.post-navigation{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.facebook{margin-right:10px;background-color:#3b5998}.googleplus{margin-left:10px;background-color:#dd4b39}.facebook,.googleplus{padding:10px;line-height:1;font-size:1pc;font-family:sans-serif;font-weight:400;border-radius:5px}a.facebook,a.googleplus{color:#fff;text-decoration:none}.rp4wp-related-posts{margin:20px 0 68px}.rp4wp-related-posts h3{margin:53px 0 10px;font-weight:700;font-size:24px;font-size:2.4rem}.rp4wp-related-posts ul{width:100%;padding:0;margin:0}.rp4wp-related-posts ul>li{padding:0;margin:0;clear:both;list-style:none}.rp4wp-related-posts ul>li>p{margin:0;padding:0}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(a[r]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&a[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(e,t,n){function a(e,t){for(var n=0;n<e.length;n++){var a=e[n],o=p[a.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](a.parts[r]);for(;r<a.parts.length;r++)o.parts.push(i(a.parts[r],t))}else{for(var s=[],r=0;r<a.parts.length;r++)s.push(i(a.parts[r],t));p[a.id]={id:a.id,refs:1,parts:s}}}}function o(e){for(var t=[],n={},a=0;a<e.length;a++){var o=e[a],r=o[0],s=o[1],i=o[2],l=o[3],c={css:s,media:i,sourceMap:l};n[r]?n[r].parts.push(c):t.push(n[r]={id:r,parts:[c]})}return t}function r(){var e=document.createElement("style"),t=f();return e.type="text/css",t.appendChild(e),e}function s(){var e=document.createElement("link"),t=f();return e.rel="stylesheet",t.appendChild(e),e}function i(e,t){var n,a,o;if(t.singleton){var i=m++;n=h||(h=r()),a=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(),a=u.bind(null,n),o=function(){n.parentNode.removeChild(n),n.href&&URL.revokeObjectURL(n.href)}):(n=r(),a=c.bind(null,n),o=function(){n.parentNode.removeChild(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else o()}}function l(e,t,n,a){var o=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function c(e,t){var n=t.css,a=t.media;t.sourceMap;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function u(e,t){var n=t.css,a=(t.media,t.sourceMap);a&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var o=new Blob([n],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(o),r&&URL.revokeObjectURL(r)}var p={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=d(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,m=0;e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g());var n=o(e);return a(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var i=n[s],l=p[i.id];l.refs--,r.push(l)}if(e){var c=o(e);a(c,t)}for(var s=0;s<r.length;s++){var l=r[s];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete p[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var a=n(14);"string"==typeof a&&(a=[[e.id,a,""]]);n(12)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,n){t=e.exports=n(11)(),t.push([e.id,"code[class*=language-],pre[class*=language-]{color:#000;text-shadow:0 1px #fff;font-family:Consolas,Monaco,Andale Mono,monospace;direction:ltr;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#a67f59;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}",""])},function(e,t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=n.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var o in e)e.hasOwnProperty(o)&&(a[o]=t.util.clone(e[o]));return a;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var o in n)a[o]=n[o];return a},insertBefore:function(e,n,a,o){o=o||t.languages;var r=o[e];if(2==arguments.length){a=arguments[1];for(var s in a)a.hasOwnProperty(s)&&(r[s]=a[s]);return r}var i={};for(var l in r)if(r.hasOwnProperty(l)){if(l==n)for(var s in a)a.hasOwnProperty(s)&&(i[s]=a[s]);i[l]=r[l]}return t.languages.DFS(t.languages,function(t,n){n===o[e]&&t!=e&&(this[t]=i)}),o[e]=i},DFS:function(e,n,a){for(var o in e)e.hasOwnProperty(o)&&(n.call(e,o,e[o],a||o),"Object"===t.util.type(e[o])?t.languages.DFS(e[o],n):"Array"===t.util.type(e[o])&&t.languages.DFS(e[o],n,o))}},highlightAll:function(e,n){for(var a,o=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),r=0;a=o[r++];)t.highlightElement(a,e===!0,n)},highlightElement:function(o,r,s){for(var i,l,c=o;c&&!e.test(c.className);)c=c.parentNode;if(c&&(i=(c.className.match(e)||[,""])[1],l=t.languages[i]),o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,c=o.parentNode,/pre/i.test(c.nodeName)&&(c.className=c.className.replace(e,"").replace(/\s+/g," ")+" language-"+i),l){var u=o.textContent;if(u){u=u.replace(/^(?:\r?\n|\r)/,"");var p={element:o,language:i,grammar:l,code:u};if(t.hooks.run("before-highlight",p),r&&n.Worker){var d=new Worker(t.filename);d.onmessage=function(e){p.highlightedCode=a.stringify(JSON.parse(e.data),i),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,s&&s.call(p.element),t.hooks.run("after-highlight",p)},d.postMessage(JSON.stringify({language:p.language,code:p.code}))}else p.highlightedCode=t.highlight(p.code,p.grammar,p.language),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,s&&s.call(o),t.hooks.run("after-highlight",p)}}},highlight:function(e,n,o){var r=t.tokenize(e,n);return a.stringify(t.util.encode(r),o)},tokenize:function(e,n,a){var o=t.Token,r=[e],s=n.rest;if(s){for(var i in s)n[i]=s[i];delete n.rest}e:for(var i in n)if(n.hasOwnProperty(i)&&n[i]){var l=n[i];l="Array"===t.util.type(l)?l:[l];for(var c=0;c<l.length;++c){var u=l[c],p=u.inside,d=!!u.lookbehind,g=0,f=u.alias;u=u.pattern||u;for(var h=0;h<r.length;h++){var m=r[h];if(r.length>e.length)break e;if(!(m instanceof o)){u.lastIndex=0;var b=u.exec(m);if(b){d&&(g=b[1].length);var y=b.index-1+g,b=b[0].slice(g),v=b.length,k=y+v,w=m.slice(0,y+1),x=m.slice(k+1),C=[h,1];w&&C.push(w);var E=new o(i,p?t.tokenize(b,p):b,f);C.push(E),x&&C.push(x),Array.prototype.splice.apply(r,C)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var o,r=0;o=a[r++];)o(n)}}},a=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(a.stringify=function(e,n,o){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return a.stringify(t,n,e)}).join("");var r={type:e.type,content:a.stringify(e.content,n,o),tag:"span",classes:["token",e.type],attributes:{},language:n,parent:o};if("comment"==r.type&&(r.attributes.spellcheck="true"),e.alias){var s="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(r.classes,s)}t.hooks.run("wrap",r);var i="";for(var l in r.attributes)i+=l+'="'+(r.attributes[l]||"")+'"';return"<"+r.tag+' class="'+r.classes.join(" ")+'" '+i+">"+r.content+"</"+r.tag+">"},!n.document)return n.addEventListener?(n.addEventListener("message",function(e){var a=JSON.parse(e.data),o=a.language,r=a.code;n.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[o])))),n.close()},!1),n.Prism):n.Prism;var o=document.getElementsByTagName("script");return o=o[o.length-1],o&&(t.filename=o.src,document.addEventListener&&!o.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),n.Prism}();"undefined"!=typeof e&&e.exports&&(e.exports=a),a.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.util.clone(a.languages.css),a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:a.languages.markup.tag.inside},rest:a.languages.css},alias:"language-css"}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),a.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:a.languages.javascript}},string:/[\s\S]+/}}}),a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:a.languages.markup.tag.inside},rest:a.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,o=t.getAttribute("data-src"),r=t,s=/\blang(?:uage)?-(?!\*)(\w+)\b/i;r&&!s.test(r.className);)r=r.parentNode;if(r&&(n=(t.className.match(s)||[,""])[1]),!n){var i=(o.match(/\.(\w+)$/)||[,""])[1];n=e[i]||i}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var c=new XMLHttpRequest;c.open("GET",o,!0),c.onreadystatechange=function(){4==c.readyState&&(c.status<400&&c.responseText?(l.textContent=c.responseText,a.highlightElement(l)):c.status>=400?l.textContent="✖ Error "+c.status+" while fetching file: "+c.statusText:l.textContent="✖ Error: File does not exist or is empty")},c.send(null)})},self.Prism.fileHighlight())}()},function(e,t){}]);