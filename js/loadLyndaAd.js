/*
 *  Module: 'loadLyndaAd'
 *  
 *  Contruct a lynda ad
 */

define("loadLyndaAd", ["enquire"], function(enquire) {
  var adBox;
  var loadLyndaAds = function() {
    adBox = document.getElementById("aside-ad-section"),
    frag = document.createDocumentFragment(),
    adLink = document.createElement("a"),
    adImg = document.createElement("img");
    
    // set attributes for ad link
    adLink.setAttribute("href", "http://www.lynda.com/Programming-Foundations-training-tutorials/1351-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11593&utm_campaign=CD2146&bid=11593&aid=CD2146&opt=");

    // set attributes for ad image
    adImg.src = "http://affiliates.lynda.com/42/2146/11593/";
    adImg.border = "0";
    adImg.width = "200";
    adImg.height = "200";

    // Arrange elements
    adLink.appendChild(adImg);

    // Load arranged elements into document fragment
    frag.appendChild(adLink);
    
    // Load document fragment into #aside
    adBox.appendChild(frag);

  }

  // enquire.js code: show that manages when the lynda.com add displays
  enquire.register("only screen and (min-width: 569px)", {

    /*
     * The 'setup' method below runs 'loadLyndaAds()'. This 'deferSetup' 
     * method makes sure that 'setup' only runs when it's media query is
     * first matched. In other words, only run it when it's on a device that
     * has 569px width setting above, tablets in this website's case.
     * Why run it on smaller devices when we don't want it...ya know?!?! 
     */
    deferSetup : true,

    /*
     * Stores the 'loadLyndaAds' method in a callback so enquire only runs it 
     * once. Our code is optimized now.
     */
    setup : function() {
      loadLyndaAds();
    },

    /*
     * If the we have a 'match' in our media query (i.e. if the site's being
     * looked at on a device that's at least 569px wide), display the box that 
     * contains the Lynda ad. Also, since 'match()' as run, this means that 
     * 'loadLyndaAds()' has run and has been stored it in a callback for 
     * future use.
     */
    match : function() {
      document.getElementById("aside-ad-section").style.display="block";
    },

    /*
     * If our media query is 'unmatched' (i.e. if the site's being
     * looked at on a device that's  568px wide or less), don't display the 
     * box that contains the Lynda ad.
     */
    unmatch : function() {
      document.getElementById("aside-ad-section").style.display="none";
    }  

  });

});