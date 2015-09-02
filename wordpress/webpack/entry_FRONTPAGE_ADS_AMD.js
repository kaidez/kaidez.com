/*
 * entry_FRONTPAGE_ADS.js
 *
 * Module for loading styles and scripts related to front page ads
 * only. Ads should load after the DOMContentLoaded event, so the load
 * in using AMD instead of CommonJS. 
 *
 */

// An AMD anonymous module
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

  // Lynda Creative Cloud
  var lyndaCC = {
        pageElement: "ad-spot-two",
        link: "http://lynda.directtrack.com/z/11891/CD2146/",
        imageSource: "http://lynda.directtrack.com/42/2146/11891/",
        alt: "Learn Creative Cloud"
  };

  // Lynda gift ad 
  var lyndaGift = {
        pageElement: "ad-spot-three",
        link: "https://www.lynda.com/giftsubscription/index.aspx?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11900&utm_campaign=CD2146&cid=l0:en:pt:le:prosb:s0:0:ind:ssprc:CD2146&bid=11900&aid=CD2146",
        imageSource : "http://lynda.directtrack.com/42/2146/11900/",
        alt: "Give lynda.com"
  };

  // Lynda JavaScript
  var lyndaJS = {
        pageElement: "ad-spot-four",
        link: "http://www.lynda.com/JavaScript-training-tutorials/244-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=596&utm_campaign=CD2146&cid=l0:en:pt:le:prosc:s88:244:ind:ssprc:CD2146&bid=596&aid=CD2146",
        imageSource: "http://lynda.directtrack.com/42/2146/596/",
        alt: "Learn Javascript"
  };
  /*
   * buildAd(): Dynamically build and place ads on the front page. 
   * The "obj" parameter is an object with 4 values:
   * 
   *   1) "pageElement": the element already on the homepage where the 
   *   ad will load into.
   *
   *   2) "link": the link for the ad
   *
   *   3) "imageSource": the ad's image
   *
   *   4) "alt": the ad's alt tag
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



  /*
   * Build ads based on JS-detected media query values via enquire.js
   */

  // Set a base media query value that enquire.js always checks
  enquire.register( "( min-width: 768px )", {

    // Don't run code if the base media query matches
    match : function() {

      // Set state by adding "show-homepage-ads" to <body>
      $( "body" ).addClass( "show-homepage-ads" );

      /*
       * If the <body> tag has the "hide-homepage-ads" class, it means
       * the ads are hidden via an inline "display:block" style.
       * Remove that class & style.
       */
      if( $( "body" ).hasClass( "hide-homepage-ads" ) ) {
        $( "body" ).removeClass( "hide-homepage-ads" );
        $( ".single-homepage-ad" ).attr( "style", "" )
      }
    },

   // Run code if the base media query doesn't match
    unmatch : function() {

      /*
       * If the <body> tag has the "show-homepage-ads" class, it means
       * the ads are visible. Set the invisible ad state by adding
       * "hide-homepage-ads" and removing "show-homepage-ads". Then
       * hide all the ads from view by adding an inline 
       * "display:block" style.
       */
      if( $( "body" ).hasClass( "show-homepage-ads" ) ) {

        $( "body" ).addClass( "hide-homepage-ads" );
        $( "body" ).removeClass( "show-homepage-ads" );
        $( ".single-homepage-ad" ).attr( "style", "display:none;" )
      }
    },

    setup : function() {
      // START BUILDING ADS

      // Lynda 10-day promo
      buildAd( lyndaPromo, {
        getTarget: "image",
        getAttr: "border",
        setAttr: 0
      });

      // Lynda Creative CLoud
      buildAd( lyndaCC, {
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

      // Lynda JavaScript
      buildAd( lyndaJS, {
        getTarget: "image",
        getAttr: "border",
        setAttr: 0
      });

      // Set state by adding "show-homepage-ads" to <body>
      $( "body" ).addClass( "show-homepage-ads" );

      /*
       * If the <body> tag has the "hide-homepage-ads" class, it means
       * the ads are hidden via an inline "display:block" style.
       * Remove that class & style.
       */
      if( $( "body" ).hasClass( "hide-homepage-ads" ) ) {
        $( "body" ).removeClass( "hide-homepage-ads" );
        $( ".single-homepage-ad" ).attr( "style", "" )
      }
    },

    deferSetup : true

  });

}); // end "define()"