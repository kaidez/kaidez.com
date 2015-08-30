/**
 * entry_FRONTPAGE_ADS.js
 *
 * Module for loading styles and scripts related to front page ads only
 *
 */

define( ["jquery"], function( $ ) {

  // matchMedia() polyfill files
  var matchMediaArray = [
        "/wp-content/themes/kaidez-swiss/js/libs/matchMedia.addListener.js",
        "/wp-content/themes/kaidez-swiss/js/libs/matchMedia.js"
      ];

  /*
   * If the browser doesn't support matchMedia(), load in polyfill
   * files via a forEach() loop
   */
  if ( !window.matchMedia ) {
    matchMediaArray.forEach( function( index ){
      $.getScript( index );
    });
  }

});