/**
 * entry_GLOBALS.js
 *
 * Module for loading styles and scripts related to the entire site
 *
 */

var $ = require( "jquery" ), // require jQuery
    q = require( "Q" ); // require the Q Promise library

// nav code
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

// search code
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

function testBranding( currentStyle, newStyle ) {
  
  var isBrandingClass = $( "#branding" ).attr( "style", currentStyle ),
      isNotBrandingClass = $( "#branding" ).attr( "style", newStyle );

  function getBrandingClass() {
    isBrandingClass ? isNotBrandingClass : isBrandingClass;
  }

  return getBrandingClass;
}


// Menu button
$( "#mobile-menu-button" ).click( function(){

  q.fcall( function(){

    var thisTest = testBranding( "z-index: auto;", "z-index: 2;" );
    thisTest();

    // if( $( "#branding" ).attr( "style", "z-index: auto;" ) ) {
    //   $( "#branding" ).attr( "style", "z-index: 2;" ); 
    // } else if( $( "#branding" ).attr( "style", "z-index: 2;" ) ){
    //   $( "#branding" ).attr( "style", "z-index: auto;" ); 
    // }
  }).then( function() {
    animateNavElement( nav );
  });
});

// Search button
$( "#mobile-search-button" ).click( function() {

  q.fcall( function(){

    var thisTest = testBranding( "z-index: 2;", "z-index: auto;");
    thisTest();

    // if( $( "#branding" ).attr( "style", "z-index: 2;" ) ) {
    //   $( "#branding" ).attr( "style", "z-index: auto;" ); 
    // } else if( $( "#branding" ).attr( "style", "z-index: auto;" ) ){
    //   $( "#branding" ).attr( "style", "z-index: 2;" ); 
    // }
  }).then( function() {
    animateNavElement( search );
  });

});

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