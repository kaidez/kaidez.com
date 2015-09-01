/*
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

  // Lynda promo ad
  var lyndaPromo = {
        pageElement: "ad-spot-one",
        link: "http://www.lynda.com/promo/trial/Default.aspx?lpk35=7840&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=753&utm_campaign=CD2146&cid=l0:en:pt:le:prosb:s0:0:ind:ssprc:CD2146&bid=753&aid=CD2146",
        imageSource: "http://lynda.directtrack.com/42/2146/753/",
        alt: "10-day free trial"
  };

  // Lynda gift ad 
  var lyndaGift = {
        pageElement: "ad-spot-two",
        link: "https://www.lynda.com/giftsubscription/index.aspx?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11900&utm_campaign=CD2146&cid=l0:en:pt:le:prosb:s0:0:ind:ssprc:CD2146&bid=11900&aid=CD2146",
        imageSource : "http://lynda.directtrack.com/42/2146/11900/",
        alt: "Give lynda.com"
  };

  /*
   * buildAd(): Dynamically build and place ads on the front page. 
   * "obj" is an object with 4 values:
   * 
   * 1) "pageElement": the element already on the homepage where the 
   * ad will load into.
   *
   * 2) "link": the link for the ad
   *
   * 3) "imageSource": the ad's image
   *
   * 4) "alt": the ad's alt tag
   *
   * "opts" is an optional object where extra attribute can be added
   * to either the ad's link or image tag. So if obj is called "myAd"
   * and a "title" attribute called "Acme Co." needs to be added to
   * the link tag, this is the configuration:
   *
   *   buildAd( myAd, {
   *     getTarget: "link",
   *     getAttr: "title",
   *     setAttr: "Acme Co."
   *   });
   */
  function buildAd( obj, opts ) {

    var adPageTarget = document.getElementById( obj.pageElement ),
        adLink = obj.link,
        adImageSource = obj.imageSource,
        adAltTag = obj.alt;

    var setAnchor = document.createElement( "a" ),
        setImage = document.createElement( "img" ),
        adFragment = document.createDocumentFragment();

    setAnchor.setAttribute( "href", adLink );

    $( setImage ).attr({
      "src": adImageSource,
      "alt": adAltTag
    });

    setAnchor.appendChild( setImage );
    

    // START CONFIGURING ANY PASSED OPTIONS
    opts = opts || {};

    if( opts.getTarget === "img" ) {
      $( setImage ).attr( opts.getAttr, opts.setAttr );
    }

   adFragment.appendChild( setAnchor );
   adPageTarget.appendChild( adFragment );

  }; // end buildAd()

  buildAd( lyndaPromo, {
    getTarget: "img",
    getAttr: "border",
    setAttr: 0
  });

    buildAd( lyndaGift, {
    getTarget: "img",
    getAttr: "border",
    setAttr: 0
  });


  // Set a base media query value that enquire.js always checks
  enquire.register( "( min-width: 768px )", {

    match : function() {},

    unmatch : function() {},

    setup : function() {},

    deferSetup : true

  });

}); // end "define()"