/*
  *  
  *  Contruct a lynda ad
  */

// Start RequireJS code

define(function() {

  Modernizr.addTest("classlist", "classList" in document.documentElement);

  //var socialNames = {
       //  "twitter" : {
       //    "link": "twitterLink",
       //    "linkTextHover": "twitterText"
       //  },
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
      //};

      document.querySelector('#kaidez-social-network-list').addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'SPAN') {
          var removeTarget = e.target.childNodes[2];
          removeTarget.classList.add("pushUpHover");
        }
        console.dir(e.target);
      }, false);

      document.querySelector('#kaidez-social-network-list').addEventListener('mouseout', function(e) {
        if (e.target.tagName === 'SPAN') {
          var removeTarget = e.target.childNodes[2];
          removeTarget.classList.remove("pushUpHover");
        }
        console.dir(e.target);
      }, false);

});