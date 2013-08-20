define("loadLyndaAd", ["enquire"], function(enquire) {
  
  var loadLyndaAds = function() {
    var adBox = document.getElementById("aside-ad-section"),
      frag = document.createDocumentFragment(),
      adLink = document.createElement("a"),
      adImg = document.createElement("img");
    
    // set attributes for ad
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

    adBox.appendChild(frag);
  }

  // enquire.js code
  enquire.register("only screen and (min-width: 569px)", {

    deferSetup : true,

    setup : function() {
      loadLyndaAds();
    },

    match : function() {
      document.getElementById("aside-ad-section").style.display="block";
      
    },
    unmatch : function() {
      document.getElementById("aside-ad-section").style.display="none";
    }  


  });                            
});