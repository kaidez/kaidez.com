/*
  *  
  *  Contruct a lynda ad
  */

// Start RequireJS code

define(function() {

  // Modernizr.addTest("classlist", "classList" in document.documentElement);

  var socialNames = {
        "twitter" : {
          "link": "twitterLink",
          "linkTextHover": "twitterText"
        }
       // "gPlus" : {
       //    "link": "gPlusLink",
       //    "linkTextHover": "gPlusText"
       //  }
       //  "github" : {
       //    "link": "githubLink",
       //    "linkTextVisible": "githubText"
       //  },
       //  "youTube" : {
       //    "link": "youTubeLink",
       //    "linkTextVisible": "youTubeText"
       //  }
      };

for (key in socialNames) {
  var box =  socialNames[key]["box"],
        socialNetworkLinkId =  socialNames[key]["link"],
        socialNetworkLinkIdText = socialNames[key]["linkTextVisible"],
        boxId = document.getElementById(box),
        theLinkText = document.getElementById(socialNetworkLinkId),
        theNoLinkText = document.getElementById(socialNetworkLinkIdText);
      
      console.log(boxId+", "+theLinkText +", "+theNoLinkText);

  boxId.onmouseover = function() {
    theNoLinkText.classList.toggle("socialLinkTop");
  }

};


});