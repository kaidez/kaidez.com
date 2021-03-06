/*
 *  Require JS Module: loadHomePageAds
 *  
 *  Create 250px x 250px lynda.com & Media Temple ads and load them
 *  onto the home page
 */


define( ["enquire"], function( enquire ) {
     
    /* 
     * if window.matchMedia is not supported, add matchMedia polyfills.
     * Each file will load twice, check to see if one is cached as it
     * can be hit-or-miss.
     */
    Modernizr.load( {
      test: window.matchMedia,
      nope: [
        "libs/matchMedia.js",
        "libs/matchMedia.addListener.js"
      ]
    } );

    var adBox = document.getElementById("ads");

      var createLyndaAd = function ( el, link, source, alt ) {
        var frag = document.createDocumentFragment(),
            pageElement = document.getElementById( el ),
            linkTag = document.createElement( "a" ),
            imageTag = document.createElement( "img" ),
            child;

        // set attributes for ad link
        linkTag.setAttribute("href", link);

        // set attributes for ad image
        imageTag.src = source;
        imageTag.border = "0";
        imageTag.width = "250";
        imageTag.height = "250";
        imageTag.alt = alt;

        // Arrange elements
        linkTag.appendChild(imageTag);

        // Load arranged elements into document fragment
        frag.appendChild(linkTag);

        var parent = pageElement;
        child = parent.firstChild;
        parent.insertBefore(frag, child);
        
     };
     
    var adCodes = {
      "lynda" : {
        "pageEl" : "adSpotOne",
        "link"   : "http://www.lynda.com/promo/trial/Default.aspx?lpk35=1833&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=753&utm_campaign=CD2146&bid=753&aid=CD2146",
        "source" : "http://lynda.directtrack.com/42/2146/754/",
        "alt"    : "7-day free trial"
      },
      "mediaTemple" : {
        "pageEl" : "adSpotTwo",
        "link"   : "http://mediatemple.net/webhosting/gs/#a_aid=5068b81963acf&amp;a_bid=671c19a8",
        "source" : "https://affiliate.mediatemple.net/accounts/default1/banners/PowerfulGrid-250x250.jpg",
        "alt"    : ""
      }
    };

    // enquire.js code:  manages when the lynda.com add displays
    enquire.register( "only screen and (min-width: 729px)", {

      /*
       * The 'setup' method below runs 'showAd()'. This 'deferSetup' 
       * method makes sure that 'setup' only runs when it's media
       * query is first matched. In other words, only run it when it's
       * on a device that has 729px width setting above, tablets in
       * this website's case. Why run it on smaller devices when we
       * don't want it...ya know?!?! 
       */
      deferSetup : true,

      /*
       * Stores the 'showAd' method in a callback so enquire only runs 
       * it once. Our code is optimized now.
       */
      setup : function() {
        if ( document.body.className == "homePage" ) {
          for ( key in adCodes ) {
            if ( adCodes.hasOwnProperty(key) ) {
              var e = adCodes[key].pageEl,
                  l = adCodes[key].link,
                  s = adCodes[key].source,
                  a = adCodes[key].alt;
              createLyndaAd( e, l, s, a);
            }
          }  
        }
      },

      /*
       * If the we have a 'match' in our media query (i.e. if the 
       * site's being looked at on a device that's at least 729px
       * wide), display the box that contains the Lynda ad. Also,
       * since 'match()' has run, this means that 'showAd()' has run
       * and has been stored it in a callback for future use.
       */
      match : function() {
        if ( document.body.className == "homePage" ) {
          ads.style.display="inline-block";
        } else {
          return false;
        }
      },

      /*
       * If our media query is 'unmatched' (i.e. if the site's being
       * looked at on a device that's  729px wide or less), don't 
       * display the box that contains the Lynda ad.
       */
      unmatch : function() {
        if ( document.body.className == "homePage" ) {
          ads.style.display="none";
        } else {
          return false;
        }
      }
    }, true );

  } );  