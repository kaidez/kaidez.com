/*
 *  Require JS Module: menu
 * 
 * Code that controls the nav and search buttons that appears on
 * handhelds. Attribution goes to Dan Thomas' original code at:
 * http://danny-t.co.uk/2012/03/02/really-simple-responsive-menu/
 */

// Start RequireJS code

define(["jquery"], function($) {
  var header = document.getElementById("masthead"),
    loadButtons = document.createDocumentFragment(),
    $navMenu = $("#site-navigation-list"),
    $searchBox = $("#searchbox"),
    menuButton = document.createElement("div"),
    searchButton = document.createElement("div"),
    showMenus;

  menuButton.id = "menu";
  menuButton.setAttribute("class", "mobile-menu-btn-class");

  searchButton.id = "search";
  searchButton.setAttribute("class", "search-btn-class");
  
  
  loadButtons.appendChild(searchButton);
  loadButtons.appendChild(menuButton);

  header.appendChild(loadButtons);

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