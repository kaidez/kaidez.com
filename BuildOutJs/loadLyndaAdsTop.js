  /*
   *  Module: 'loadLyndaAd'
   *  
   *  Contruct a lynda ad
   */

  define(["enquire"], function(enquire) {
     
    // if window.matchMedia is not supported, add matchMedia polyfills. Each file
    // will load twice, check to see if one is cached as it can be hit-or-miss.
    Modernizr.load({
      test: window.matchMedia,
      nope: [
        "js/libs/matchMedia.js",
        "js/libs/matchMedia.addListener.js"
      ]
    });

    var adBox = document.getElementById("ads");

       var createLyndaAd = function ( el, link, source ) {
         var frag = document.createDocumentFragment(),
          pageElement = document.getElementById( el ),
          linkTag = document.createElement( "a" ),
          imageTag = document.createElement( "img" );

         // set attributes for ad link
          linkTag.setAttribute("href", link);

        // set attributes for ad image
        imageTag.src = source;
        imageTag.border = "0";
        imageTag.width = "300";
        imageTag.height = "250";

        // Arrange elements
        linkTag.appendChild(imageTag);

        // Load arranged elements into document fragment
        frag.appendChild(linkTag);
        
        // Load document fragment into '#aside-ad-section'
        pageElement.appendChild(frag);

     };
     
    var adCodes = {
        "lyndaJumpIn" : {
              "pageEl" : "adSpotOne",
              "link"      : "http://www.lynda.com/promo/trial/Default.aspx?lpk35=1833&utm_medium=ldc-partner&utm_source=SSPRC&utm_content=755&utm_campaign=CD2146&bid=755&aid=CD2146",
              "source" : "http://lynda.directtrack.com/42/2146/755/"
          },
          "lyndaJavascrpt" : {
              "pageEl" : "adSpotTwo",
              "link"      : "http://www.lynda.com/JavaScript-training-tutorials/244-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=598&utm_campaign=CD2146&bid=598&aid=CD2146",
              "source" : "http://lynda.directtrack.com/42/2146/598/"
          }
      };

    // enquire.js code:  manages when the lynda.com add displays
    enquire.register("only screen and (min-width: 569px)", {

      /*
       * The 'setup' method below runs 'showAd()'. This 'deferSetup' 
       * method makes sure that 'setup' only runs when it's media query is
       * first matched. In other words, only run it when it's on a device that
       * has 569px width setting above, tablets in this website's case.
       * Why run it on smaller devices when we don't want it...ya know?!?! 
       */
      deferSetup : true,

      /*
       * Stores the 'showAd' method in a callback so enquire only runs it 
       * once. Our code is optimized now.
       */
      setup : function() {
        for ( key in adCodes ) {
          if ( adCodes.hasOwnProperty(key) ) {
            var e = adCodes[key].pageEl,
                  l  = adCodes[key].link,
                  s = adCodes[key].source;
            createLyndaAd(e, l, s);
          }
       }  
      },

      /*
       * If the we have a 'match' in our media query (i.e. if the site's being
       * looked at on a device that's at least 569px wide), display the box that 
       * contains the Lynda ad. Also, since 'match()' as run, this means that 
       * 'showAd()' has run and has been stored it in a callback for 
       * future use.
       */
      match : function() {
        adBox.style.display="block";
      },

      /*
       * If our media query is 'unmatched' (i.e. if the site's being
       * looked at on a device that's  568px wide or less), don't display the 
       * box that contains the Lynda ad.
       */
      unmatch : function() {
        adBox.style.display="none";
      }

    }, true);

  });