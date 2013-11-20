// This code is stolen from Modernizr so if Modernizr is already on
// your web page, don't use this part of the code.

// This code is one file because it's a best practice as per the
// Content Security Policy. Mike West breaks CSP down really well at:
// http://bit.ly/KzGWUZ. Also make sure to read the CSP W3C spec at: 
// http://bit.ly/vCQbiW
var docElement = document.documentElement;
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');