webpackJsonp([1],[function(e,t,n){n(7),n(13),e.exports=n(14)},,,,,,,function(e,t,n){var a=n(3),r=n(4);n(8);n(9);var s=document.getElementById("tweet-this-post"),i=window.location.href,o=document.getElementById("blog-post-title").innerHTML;a(s).on("click",function(e){e.preventDefault();var t,n=i.replace(/[^/]*$/g,"");s.setAttribute("href",n),t=this.getAttribute("href"),window.open("http://twitter.com/intent/tweet?url="+t+"&text="+o+"&via=kaidez&","twitterwindow","height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")}),document.addEventListener("DOMContentLoaded",function(e){var t="/wp-content/themes/kaidez-swiss/js/sharing-code.html";return r(a.ajax({url:t,type:"GET"})).then(function(e){a(".rp4wp-related-posts").before(e);var t,n,r,s={facebook:{getLink:"facebook-share-link",linkHandle:"http://www.facebook.com/sharer.php?u="},googlePlus:{getLink:"googleplus-share-link",linkHandle:"https://plus.google.com/share?url="}};Object.getOwnPropertyNames(s).forEach(function(e){t=s[e].getLink,n=s[e].linkHandle,r=document.getElementById(t),r.setAttribute("title",o),"facebook-share-link"===t?r.setAttribute("href",n+i+"&t="+o):r.setAttribute("href",n+i)})},function(e){console.log("nope")})})},function(e,t){!function(e,t){var n,a=e.getElementsByTagName(t)[0],r=e.createDocumentFragment(),s=function(a,s){e.getElementById(s)||(n=e.createElement(t),n.src=a,s&&(n.id=s),r.appendChild(n))};s("http://apis.google.com/js/plusone.js"),s("//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528","facebook-jssdk"),a.parentNode.insertBefore(r,a)}(document,"script")},function(e,t,n){var a=n(10);"string"==typeof a&&(a=[[e.id,a,""]]);n(12)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,n){t=e.exports=n(11)(),t.push([e.id,".hide-element{position:absolute!important;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.responsive-image{max-width:100%;margin:0 auto;display:block}.ti{text-indent:-9999px}.z1{z-index:1}.z2{z-index:2}.z3{z-index:3}.z4{z-index:4}.z5{z-index:5}.ul-reset{padding-left:0}.br{border-radius:5px}.drop-shadow{box-shadow:3px 2px 5px 0 rgba(0,0,0,.18)}.entry-title-margin{margin-top:20px}.post-list-item{line-height:24px;margin-bottom:20px}.share-post-list-item{display:inline-block;list-style-type:none}.other-sharing-element{margin-top:30px;text-align:center}.other-ways-text{display:block;margin-bottom:10px}.share-post-link{padding-left:10px;font-size:1pc;font-weight:700;line-height:1;font-family:sans-serif}.post-pic{max-width:100%;margin:0 auto}.demo-link{padding:10px;color:#fff;background-color:#350518;border-radius:5px}.sharing-buttons{border-top:1px solid #000;border-bottom:1px solid #000}a.demo-link{text-decoration:none}.facebook,.googleplus{padding:10px;color:#737373;border-radius:5px}.facebook{background-color:#3b5998}.googleplus{background-color:#dd4b39}a.facebook,a.googleplus{color:#fff;text-decoration:none;font-weight:400}.rp4wp-related-posts ul{width:100%;padding:0;margin:0}.rp4wp-related-posts ul>li{padding:0;margin:0;clear:both;list-style:none}.rp4wp-related-posts ul>li>p{margin:0;padding:0}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},r=0;r<this.length;r++){var s=this[r][0];"number"==typeof s&&(a[s]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&a[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t,n){function a(e,t){for(var n=0;n<e.length;n++){var a=e[n],r=p[a.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](a.parts[s]);for(;s<a.parts.length;s++)r.parts.push(o(a.parts[s],t))}else{for(var i=[],s=0;s<a.parts.length;s++)i.push(o(a.parts[s],t));p[a.id]={id:a.id,refs:1,parts:i}}}}function r(e){for(var t=[],n={},a=0;a<e.length;a++){var r=e[a],s=r[0],i=r[1],o=r[2],l=r[3],c={css:i,media:o,sourceMap:l};n[s]?n[s].parts.push(c):t.push(n[s]={id:s,parts:[c]})}return t}function s(){var e=document.createElement("style"),t=f();return e.type="text/css",t.appendChild(e),e}function i(){var e=document.createElement("link"),t=f();return e.rel="stylesheet",t.appendChild(e),e}function o(e,t){var n,a,r;if(t.singleton){var o=m++;n=h||(h=s()),a=l.bind(null,n,o,!1),r=l.bind(null,n,o,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=i(),a=u.bind(null,n),r=function(){n.parentNode.removeChild(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(),a=c.bind(null,n),r=function(){n.parentNode.removeChild(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}function l(e,t,n,a){var r=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=b(t,r);else{var s=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function c(e,t){var n=t.css,a=t.media;t.sourceMap;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function u(e,t){var n=t.css,a=(t.media,t.sourceMap);a&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var r=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(r),s&&URL.revokeObjectURL(s)}var p={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=d(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,m=0;e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g());var n=r(e);return a(n,t),function(e){for(var s=[],i=0;i<n.length;i++){var o=n[i],l=p[o.id];l.refs--,s.push(l)}if(e){var c=r(e);a(c,t)}for(var i=0;i<s.length;i++){var l=s[i];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete p[l.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=n.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var s=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(s[i]=a[i]);return s}var o={};for(var l in s)if(s.hasOwnProperty(l)){if(l==n)for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[l]=s[l]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),s=0;a=r[s++];)t.highlightElement(a,e===!0,n)},highlightElement:function(r,s,i){for(var o,l,c=r;c&&!e.test(c.className);)c=c.parentNode;if(c&&(o=(c.className.match(e)||[,""])[1],l=t.languages[o]),r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,c=r.parentNode,/pre/i.test(c.nodeName)&&(c.className=c.className.replace(e,"").replace(/\s+/g," ")+" language-"+o),l){var u=r.textContent;if(u){u=u.replace(/^(?:\r?\n|\r)/,"");var p={element:r,language:o,grammar:l,code:u};if(t.hooks.run("before-highlight",p),s&&n.Worker){var d=new Worker(t.filename);d.onmessage=function(e){p.highlightedCode=a.stringify(JSON.parse(e.data),o),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,i&&i.call(p.element),t.hooks.run("after-highlight",p)},d.postMessage(JSON.stringify({language:p.language,code:p.code}))}else p.highlightedCode=t.highlight(p.code,p.grammar,p.language),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,i&&i.call(r),t.hooks.run("after-highlight",p)}}},highlight:function(e,n,r){var s=t.tokenize(e,n);return a.stringify(t.util.encode(s),r)},tokenize:function(e,n,a){var r=t.Token,s=[e],i=n.rest;if(i){for(var o in i)n[o]=i[o];delete n.rest}e:for(var o in n)if(n.hasOwnProperty(o)&&n[o]){var l=n[o];l="Array"===t.util.type(l)?l:[l];for(var c=0;c<l.length;++c){var u=l[c],p=u.inside,d=!!u.lookbehind,g=0,f=u.alias;u=u.pattern||u;for(var h=0;h<s.length;h++){var m=s[h];if(s.length>e.length)break e;if(!(m instanceof r)){u.lastIndex=0;var b=u.exec(m);if(b){d&&(g=b[1].length);var y=b.index-1+g,b=b[0].slice(g),v=b.length,w=y+v,k=m.slice(0,y+1),x=m.slice(w+1),C=[h,1];k&&C.push(k);var E=new r(o,p?t.tokenize(b,p):b,f);C.push(E),x&&C.push(x),Array.prototype.splice.apply(s,C)}}}}}return s},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,s=0;r=a[s++];)r(n)}}},a=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(a.stringify=function(e,n,r){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return a.stringify(t,n,e)}).join("");var s={type:e.type,content:a.stringify(e.content,n,r),tag:"span",classes:["token",e.type],attributes:{},language:n,parent:r};if("comment"==s.type&&(s.attributes.spellcheck="true"),e.alias){var i="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(s.classes,i)}t.hooks.run("wrap",s);var o="";for(var l in s.attributes)o+=l+'="'+(s.attributes[l]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"},!n.document)return n.addEventListener?(n.addEventListener("message",function(e){var a=JSON.parse(e.data),r=a.language,s=a.code;n.postMessage(JSON.stringify(t.util.encode(t.tokenize(s,t.languages[r])))),n.close()},!1),n.Prism):n.Prism;var r=document.getElementsByTagName("script");return r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),n.Prism}();"undefined"!=typeof e&&e.exports&&(e.exports=a),a.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.util.clone(a.languages.css),a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:a.languages.markup.tag.inside},rest:a.languages.css},alias:"language-css"}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),a.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:a.languages.javascript}},string:/[\s\S]+/}}}),a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:a.languages.markup.tag.inside},rest:a.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),s=t,i=/\blang(?:uage)?-(?!\*)(\w+)\b/i;s&&!i.test(s.className);)s=s.parentNode;if(s&&(n=(t.className.match(i)||[,""])[1]),!n){var o=(r.match(/\.(\w+)$/)||[,""])[1];n=e[o]||o}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var c=new XMLHttpRequest;c.open("GET",r,!0),c.onreadystatechange=function(){4==c.readyState&&(c.status<400&&c.responseText?(l.textContent=c.responseText,a.highlightElement(l)):c.status>=400?l.textContent="✖ Error "+c.status+" while fetching file: "+c.statusText:l.textContent="✖ Error: File does not exist or is empty")},c.send(null)})},self.Prism.fileHighlight())}()},function(e,t){}]);