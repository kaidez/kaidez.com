/**
 * entry_GLOBALS.js
 *
 * Module for loading styles and scripts related to the entire site
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

/*
 * START MOBILE NAVIGATION CODE
 * ====================================================================
 * 
 * On mobile, both the nav "hamburger" menu and search button elements
 * share the same functionality in terms of, respectively,
 * hiding/showing the site nav and search box. To make this
 * functionality reusable, create separate objects for each element
 * which contains unique element parameters, then pass the object as a
 * parameter to the "animateNavElement()" method at the bottom.
 *
 * TODO:
 * =====
 * Can the removeClassCheck() method be more dynamic? 
 */

// Data object for the nav "hamburger" menu
var nav = {
  bodyClass: "show-mobile-menu",
  targetEl: "#site-navigation",
  hideClass: "hide-menu",
  showClass: "show-menu",
  removeClassCheck: function() {
   if ( $( "body" ).hasClass( "show-mobile-search" ) ) {
      $( "body" ).removeClass( "show-mobile-search" );
      $( "#searchform" ).addClass( "hide-searchbox" ).removeClass( "show-searchbox" );    
    }
  },
  singleRemoveClass: function() {
    $( "#searchform" ).removeClass( "hide-searchbox" );
  }
};

// Data object for the nav "seachbox" menu
var search = {
  bodyClass: "show-mobile-search",
  targetEl: "#searchform",
  hideClass: "hide-searchbox",
  showClass: "show-searchbox",
  removeClassCheck: function() {
    if ( $( "body" ).hasClass( "show-mobile-menu" ) ) {
      $( "body" ).removeClass( "show-mobile-menu" );
      $( "#site-navigation" ).addClass( "hide-menu" ).removeClass( "show-menu" );    
    }
  },
  singleRemoveClass: function() {
    $( "#site-navigation" ).removeClass( "hide-menu" );
  }
};

/*
 * CLICK METHODS FOR THE MENU & SEARCH BUTTONS
 * ====================================================================
 * 
 * When clicked, each button:
 *
 * 1. runs testBranding() which toggles the #branding elements z-index
 * 2. returns a Promise
 * 3. runs animateNavElement() & the parameter is one of two vars above
 *
 */

// Menu button
$( "#mobile-menu-button" ).on("click", function( event ) {
  
  event.stopPropagation();

  q.fcall( function(){

    var thisTest = testBranding( "z-index: auto;", "z-index: 2;" );
    thisTest();

  }).then( function() {
    animateNavElement( nav );
  });
});

// Search button
$( "#mobile-search-button" ).on("click", function( event ) {

  event.stopPropagation();

  q.fcall( function(){

    var thisTest = testBranding( "z-index: 2;", "z-index: auto;");
    thisTest();

  }).then( function() {
    animateNavElement( search );
  });

});

/*
 * I had to write a crazy hack that toggled the z-index of the
 * "#branding" element so the main nav could stack properly and the
 * search box could be focused :-\ To redeem myself for writing a
 * crazy hack, I wrote cool code that executes the hack with a
 * closure. It runs in the "animateNavElement()" element. and the
 * "currentStyle" and "newStyle" parameters are the z-index styles
 * that get toggled.
 */
function testBranding( currentStyle, newStyle ) {
  
  // Store the toggled states in variables
  var isBrandingClass = $( "#branding" ).attr( "style", currentStyle ),
      isNotBrandingClass = $( "#branding" ).attr( "style", newStyle );

  // An inner function toggles the states with a ternary function check
  function getBrandingClass() {
    isBrandingClass ? isNotBrandingClass : isBrandingClass;
  }

  // Return the inner function so it's accessible when called
  return getBrandingClass;
}

/*
 * "animateNavElement()": show/hide nav & search
 * ====================================================================
 */

 // "obj" will be either the "nav" or "search" variable defined up top
function animateNavElement( obj ) {

  /*
   * Get the "bodyClass" property from the given object. If it's on
   * the <body> tag, it means the given element, the nav or the
   * searchbox, is currently in view. Then do stuff if it exists.
   */
  if( $( "body" ).hasClass( obj.bodyClass ) ) {

    // Enclose some code that returns a Promise
    q.fcall( function() {

      /*
       * Get the both "targetEl" and "hideClass" properties from the
       * given object. "targetEl" is the element being looked at...the
       * nav or the searchbox. "hideClass" is the class that hides the
       * element from view....so remove the element adding a class to
       * the <body> tag that hides it. Adding this class to the
       * element also defines its state.
       */
      $( obj.targetEl ).addClass( obj.hideClass );

      // Reset the element's state by removing whatever "bodyClass" is
      $( "body" ).removeClass( obj.bodyClass );
      
      /*
       * Wait 3 milliseconds after the Promise resolves, but before
       * doing stuff
       */
      return q.delay( 300 );
    }).then( function(){
      
      /*
       * Remove the class that hid the target element, the nav or the
       * searchbox. Also, grab the "showClass" property from the given
       * object, which is a class that element visible initially and is
       * DEFINETLY attached it at this point. Remove it as well.
       */
      $( obj.targetEl ).removeClass( obj.hideClass ).removeClass( obj.showClass );
    });
  } else {
    
    // Enclose some code that returns a Promise
    q.fcall( function(){
      
      /*
       * The opposite element MIGHT be visible now so run the
       * "removeClassCheck()" method for the given object to remove it.
       * So if the "nav" element is what's currently being focused 
       * on, check to see if the "search" element is visible and
       * remove it if it is.  
       */ 
      obj.removeClassCheck();
    
    // Do stuff after the Promise resolves
    }).then(function(){
      
      // Add a class to the element making it visible, state is defined
      $( obj.targetEl ).addClass( obj.showClass );
      
      /*
       * Add a class to <body> that help define the state of the
       * element, saying it's visible.
       */
      $( "body" ).addClass( obj.bodyClass );
      
      /*
       * The "removeClassCheck()" in the Promise-enclosed code
       * block added a class to the opposite element to help hide it.
       * Remove that class.
       */
      obj.singleRemoveClass();
    });
  }
}

/*
 * If either the nav "hamburger" menu or search button are visible and
 * the some clicks out side of them, remove them from view.
 */

/*
 * Make sure this hiding ONLY happens when you click on the main,
 * containing "#page" element.
 */
$( "body" ).delegate( "#page", "click", function() {

  // Store the search box's <input> field in variable
  var getSearchbox = $( "#s" );

  /*
   * With this code, focusing on the <input> field makes the search
   * box disappear. Stop that from happening.
   */
  if( getSearchbox.is( ":focus" ) ) {
    return false;
  } else {
    function removeClasses(el) {
      q.fcall( function(){
        el.removeClassCheck();
      }).then( function() {
        el.singleRemoveClass();
      })
     }

    [nav, search].forEach(function( index ){
      index == nav ? removeClasses(nav) : removeClasses(search);
    });

  }
});