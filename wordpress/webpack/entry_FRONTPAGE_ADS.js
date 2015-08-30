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
    return matchMediaArray.forEach( function( index ){
      $.getScript( index );
    });
  }

  // TODO: all lynda ads need "border='0'" applied to the <img> tag
  var ads = {
      "lynda_gift" : {
        "pageEl" : "ad-spot-one",
        "link"   : "https://www.lynda.com/giftsubscription/index.aspx?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11900&utm_campaign=CD2146&cid=l0:en:pt:le:prosb:s0:0:ind:ssprc:CD2146&bid=11900&aid=CD2146",
        "src" : "http://lynda.directtrack.com/42/2146/11900/",
        "alt"    : "Give lynda.com"
      },

      "lynda_promo" : {
        "pageEl" : "ad-spot-two",
        "link"   : "http://www.lynda.com/promo/trial/Default.aspx?lpk35=7840&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=753&utm_campaign=CD2146&cid=l0:en:pt:le:prosb:s0:0:ind:ssprc:CD2146&bid=753&aid=CD2146",
        "src" : "http://lynda.directtrack.com/42/2146/753/",
        "alt"    : "10-day free trial"
      }
    };

  var buildAd = function() {

    for (var keys in ads) {
      return console.log(ads);
    }

  };

  buildAd();
  
  // Set a base media query value that enquire.js always checks
  enquire.register( "( min-width: 768px )", {

    match : function() {},

    unmatch : function() {},

    setup : function() {},

    deferSetup : true

  });

});