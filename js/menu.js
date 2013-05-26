/*
 * Code that controls the nav that appears on handhelds
 * with RequireJS. Attribution goes to Dan Thomas'
 * original code at:
 * http://danny-t.co.uk/2012/03/02/really-simple-responsive-menu/
 * 
 * Using documentFragment() to load multiple elements at
 * once instead of one at a time. jsPerf test says this
 * way is faster.
 * http://jsperf.com/add-mobile-buttons-testing/2
 */

// Start RequireJS code

define("menu", ["jquery"], function($) {
  var header = document.getElementById("masthead"),
    $navMenu = $("#site-navigation-list"),
    $searchBox = $("#searchbox"),
    menuButton = document.createElement("div"),
    searchButton = document.createElement("div"),
    showMenus;

  $(menuButton).attr("id", "menu");
  $(searchButton).attr("id", "search");
  
  header.appendChild(searchButton);
  header.appendChild(menuButton);

  showMenus = function(btn,el) {
    $(btn).click(function() {
      if (el.is(":visible") ) {
        el.slideUp({
          complete:function(){
            $(this).css("display","");
          }
        });
      } else {
        el.slideDown();
      }
    });
  };

  showMenus(menuButton, $navMenu);
  showMenus(searchButton, $searchBox);
  
});