/**
 * entry_FRONTPAGE_ADS.js
 *
 * Module for loading styles and scripts related to front page ads only
 *
 */

define(["jquery"], function( $ ) {

  var matchMediaArray = [
        "/wp-content/themes/kaidez-swiss/js/libs/matchMedia.addListener.js",
        "/wp-content/themes/kaidez-swiss/js/libs/matchMedia.js"
      ];

  if ( !window.matchMedia ) {
    matchMediaArray.forEach( function( index ){
      $.getScript( index );
    });
  }

});