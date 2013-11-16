// If JavaScript is enabled, this code will change the "no-js" 
// class on the opening <html> element to "js". This code is stolen
// from Modernizr so if Modernizr is already on your web page,
// don't use this part of the code.
var docElement = document.documentElement;
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') + ('js');
