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
  var socialNetworkLinkId =  socialNames[key]["link"],
        socialNetworkLinkIdText = socialNames[key]["linkTextHover"],
        theLinkText = document.getElementById(socialNetworkLinkId),
        theHoverLinkText = document.getElementById(socialNetworkLinkIdText);
      
      

  theLinkText.onmouseover = function() {
    theHoverLinkText.classList.toggle("pushUpHover");
  }

  theLinkText.onmouseout = function() {
    theHoverLinkText.classList.remove("pushUpHover");
  }

};


});