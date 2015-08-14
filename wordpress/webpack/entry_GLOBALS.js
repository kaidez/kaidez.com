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
 * parameter to the "animateNavElement()" method. 
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

// Menu button
$( "#mobile-menu-button" ).click( function(){

  q.fcall( function(){

    var thisTest = testBranding( "z-index: auto;", "z-index: 2;" );
    thisTest();

  }).then( function() {
    animateNavElement( nav );
  });
});

// Search button
$( "#mobile-search-button" ).click( function() {

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

function animateNavElement( obj ) {
  if( $( "body" ).hasClass( obj.bodyClass ) ) {
    q.fcall( function(){
      $( obj.targetEl ).addClass( obj.hideClass );
      $( "body" ).removeClass( obj.bodyClass );
      return q.delay( 300 );
    }).then( function(){
      $( obj.targetEl ).removeClass( obj.hideClass ).removeClass( obj.showClass );
    });
  } else {
    q.fcall( function(){
      obj.removeClassCheck();
    }).then(function(){
      $( obj.targetEl ).addClass( obj.showClass );
      $( "body" ).addClass( obj.bodyClass );
      obj.singleRemoveClass();
    });
  }
}