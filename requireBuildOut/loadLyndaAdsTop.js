  /*
   *  Require JS Module: 'loadLyndaAdTop'
   *  
   *  Create a 300px X 250px lynda ad and load it onto the home page.
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
        "js/libs/matchMedia.js",
        "js/libs/matchMedia.addListener.js"
      ]
    } );

    var adBox = document.getElementById("ads");

      var createLyndaAd = function () {
        var frag = document.createDocumentFragment(),
            pageElement = document.getElementById( "adSpotOne" ),
            linkTag = document.createElement( "a" ),
            imageTag = document.createElement( "img" );

        // set attributes for ad link
        linkTag.setAttribute("href", "http://www.lynda.com/promo/trial/Default.aspx?lpk35=1833&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=754&utm_campaign=CD2146&bid=754&aid=CD2146");

        // set attributes for ad image
        imageTag.src = "http://lynda.directtrack.com/42/2146/754/";
        imageTag.border = "0";
        imageTag.width = "250";
        imageTag.height = "250";
        imageTag.alt = "7-day free trial";

        // Arrange elements
        linkTag.appendChild(imageTag);

        // Load arranged elements into document fragment
        frag.appendChild(linkTag);
        
        // Load document fragment into '#ads'
        pageElement.appendChild(frag);
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
          createLyndaAd();
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