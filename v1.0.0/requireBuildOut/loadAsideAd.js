  /*
   *  Require JS Module: loadAsideAd
   *  
   *  Create a 200px x 200px lynda ad and load it in the <aside> tag
   */

     
/* 
 * if window.matchMedia is not supported, add matchMedia polyfills.
 * Each file will load twice, check to see if one is cached as it
 * can be hit-or-miss.
 */
Modernizr.load([{
  test: window.matchMedia,
  nope: ["libs/matchMedia.js", "libs/matchMedia.addListener.js"]
},


define( ["enquire"], function( enquire ) {

    var adBox = document.getElementById("aside-ad-section");

      var createLyndaAd = function () {
        var frag = document.createDocumentFragment(),
            linkTag = document.createElement( "a" ),
            imageTag = document.createElement( "img" );

        // set attributes for ad link
        linkTag.setAttribute("href", "http://www.lynda.com/JavaScript-training-tutorials/244-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=596&utm_campaign=CD2146&bid=596&aid=CD2146");

        // set attributes for ad image
        imageTag.src = "http://lynda.directtrack.com/42/2146/596/";
        imageTag.border = "0";
        imageTag.width = "200";
        imageTag.height = "200";
        imageTag.alt = "Learn Javascript";

        // Arrange elements
        linkTag.appendChild(imageTag);

        // Load arranged elements into document fragment
        frag.appendChild(linkTag);
        
        // Load document fragment into '#ads'
        adBox.appendChild(frag);
     };

    // enquire.js code:  manages when the lynda.com add displays
    enquire.register( "only screen and (min-width: 568px)", {

      /*
       * The 'setup' method below runs 'showAd()'. This 'deferSetup' 
       * method makes sure that 'setup' only runs when it's media
       * query is first matched. In other words, only run it when it's
       * on a device that has 568px width setting above, tablets in
       * this website's case. Why run it on smaller devices when we
       * don't want it...ya know?!?! 
       */
      deferSetup : true,

      /*
       * Stores the 'showAd' method in a callback so enquire only runs 
       * it once. Our code is optimized now.
       */
      setup : function() {
        createLyndaAd();
      },

      /*
       * If the we have a 'match' in our media query (i.e. if the 
       * site's being looked at on a device that's at least 568px
       * wide), display the box that contains the Lynda ad. Also,
       * since 'match()' has run, this means that 'showAd()' has run
       * and has been stored it in a callback for future use.
       */
      match : function() {
        adBox.style.display="inline-block";
      },

      /*
       * If our media query is 'unmatched' (i.e. if the site's being
       * looked at on a device that's  568px wide or less), don't 
       * display the box that contains the Lynda ad.
       */
      unmatch : function() {
        adBox.style.display="none";
      }
    }, true );

  })

]);