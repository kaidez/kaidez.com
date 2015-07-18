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

function animateNavElement( obj ) {
  if( $( "body" ).hasClass( obj.bodyClass ) ) {
    Q.fcall( function(){
      $( obj.targetEl ).addClass( obj.hideClass );
      $( "body" ).removeClass( obj.bodyClass );
      return Q.delay( 500 );
    }).then( function(){
      $( obj.targetEl ).removeClass( obj.hideClass ).removeClass( obj.showClass );
    });
  } else {
    Q.fcall( function(){
      obj.removeClassCheck();
    }).then(function(){
      $( obj.targetEl ).addClass( obj.showClass );
      $( "body" ).addClass( obj.bodyClass );
      obj.singleRemoveClass();
    });
  }
}

// Menu button
$( "#mobile-menu-button" ).click(function(){
  animateNavElement( nav );
});

// Search button
$( "#mobile-search-button" ).click( function() {
  animateNavElement( search );
});