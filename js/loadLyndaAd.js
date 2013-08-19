define("loadLyndaAd", ["enquire"], function(enquire) {
  
  var loadLyndaAd = function() {
    var adBox = document.getElementById("aside-ad-section"),
      frag = document.createDocumentFragment(),
      adLink = document.createElement("a"),
      adImg = document.createElement("img");
    
    // set attributes for form
    adImg.setAttribute("src", "http://affiliates.lynda.com/42/2146/11593/");
    adLink.setAttribute("href", "http://www.lynda.com/Programming-Foundations-training-tutorials/1351-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11593&utm_campaign=CD2146&bid=11593&aid=CD2146&opt=");

    // Arrange elements
    adLink.appendChild(adImg);

    // Load arranged elements into document fragment
    frag.appendChild(adLink);

    adBox.appendChild(frag);
  }

  // enquire.js code
  enquire.register("screen and (max-width: 400px)", {
    match : function() {
      console.log("hello");
    },
                       
    unmatch : function() {
      console.log("goodbye");
    }
  });                            
});