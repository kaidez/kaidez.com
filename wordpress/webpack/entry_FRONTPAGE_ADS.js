/*
 * entry_FRONTPAGE_ADS.js
 *
 * Module for loading styles and scripts related to front page ads only
 *
 */

define( ["jquery"], function( $ ) {

  "use strict";

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
   * The "obj" parameter is an object with 4 values:
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
   * The "opts" parameter is an optional object where extra attributes
   * can be added to either the ad's link or image tag. So if obj is
   * called "myAd" and a "title" attribute called "Some Company" needs
   * to be added to the obj's link tag, this is the configuration:
   *
   *       buildAd( myAd, {
   *         getTarget: "link",
   *         getAttr: "title",
   *         setAttr: "Some Company"
   *       });
   *
   */
  function buildAd( obj, opts ) {

    // Get ad parts from obj
    var

      // The home page element where the ad will load into
      adPageTarget = document.getElementById( obj.pageElement ),
      
      // The ad's link
      getAdLink = obj.link,
      
      // The ad's image
      getAdImage = obj.imageSource,

      // The ad image's alt tag value
      getAdAltTag = obj.alt;


    // Dynamically create elements to build the ad
    var
    
      // Create an anchor tag
      setLinkTag = document.createElement( "a" ),
      
      // Create an image tag
      setLinkImage = document.createElement( "img" ),

      // Create a document fragment to batch load these elements
      adFragment = document.createDocumentFragment(); 

    // Set the link tags's href attribute
    setLinkTag.setAttribute( "href", getAdLink );
    
    // Set the link tags image's src and alt attributes
    $( setLinkImage ).attr({
      "src": getAdImage,
      "alt": getAdAltTag
    });


    /*
     * Build functionality where extra attributes can be added to
     * either an ad's image or link attribute. All this gets done via
     * the "opts" parameter for "buildAd".
     */

    /*
     * If no options are passed, let "opts" be an empty object. This
     * means that "opts" is completely optional
     */
    opts = opts || {};

    // If "getTarget" equals "image", add attributes to the link image
    if( opts.getTarget === "image" ) {
      setLinkImage.setAttribute( opts.getAttr, opts.setAttr );
    } else {

      // If "getTarget" equals "link", add attributes to the link
      if( opts.getTarget === "link" ) {
        setLinkTag.setAttribute( opts.getAttr, opts.setAttr );
      }
    }

   // put image in link tag
   setLinkTag.appendChild( setLinkImage );

   // put link in document fragment
   adFragment.appendChild( setLinkTag );

   //put document fragment in page element
   adPageTarget.appendChild( adFragment );

  } // end buildAd()





  // Set a base media query value that enquire.js always checks
  enquire.register( "( min-width: 768px )", {

    match : function() {
    
      // START BUILDING ADS

      // Lynda 10-day promo
      buildAd( lyndaPromo, {
        getTarget: "image",
        getAttr: "border",
        setAttr: 0
      });

      // Lynda gift
      buildAd( lyndaGift, {
        getTarget: "image",
        getAttr: "border",
        setAttr: 0
      });

    },

    unmatch : function() {},

    setup : function() {},

    deferSetup : true

  });

}); // end "define()"