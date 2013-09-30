/*
 * RequireJS Module Name: classListHelper
 *
 * In order to safely use 'toggle()', we need to detect
 * "Modernizr.classlist". But it's a Modernizr non-core detect and the 
 * 'grunt-modernizr' doesn't look for non-core detects when it builds out our 
 * Modernizr custom build. We need to manually add it using the Modernizr addTest() API.
 */

define(function() {

  Modernizr.addTest("classlist", "classList" in document.documentElement);
  
});