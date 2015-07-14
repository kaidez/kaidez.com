var nav = {
  bodyClass: "show-mobile-menu",
  targetEl: "#masthead",
  hideClass: "hide-menu",
  showClass: "show-menu"
};

function removeMobileClassCheck() {
  if ( $( "body" ).hasClass( "show-mobile-search" ) ) {
    $( "body" ).removeClass( "show-mobile-search" );
    $( "#searchform" ).addClass( "hide-searchbox" ).removeClass( "show-searchbox" );    
  }
}

function removeFormClass() {
  $( "#searchform" ).removeClass( "hide-searchbox" );
}

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
      removeMobileClassCheck();
    }).then(function(){
      $( obj.targetEl ).addClass( obj.showClass );
      $( "body" ).addClass( obj.bodyClass );
      removeFormClass();
    });
  }
}

// Menu button
$( "#mobile-menu-button" ).click(function(){
  animateNavElement( nav );
});
/*


// Search button
$( "#mobile-search-button" ).click( function() {

  if( $( "body" ).hasClass( "show-mobile-search" ) ) {

    Q.fcall( function(){
      $( "#searchform" ).addClass( "hide-searchbox" );
      $( "body" ).removeClass( "show-mobile-search" );
      return Q.delay( 300 );
    }).then( function() {
      $( "#searchform" ).removeClass( "hide-searchbox" ).removeClass( "show-searchbox" );
    });

  } else {

    Q.fcall(function(){
      if ( $( "body" ).hasClass( "show-mobile-menu" ) ) {
        $( "#masthead" ).addClass( "hide-menu" ).removeClass( "show-menu" );
        $( "body" ).removeClass( "show-mobile-menu" );
      }
    }).then( function(){
      $( "#searchform" ).addClass( "show-searchbox" ).removeClass( "hide-searchbox" );
      $( "body" ).addClass( "show-mobile-search" );
      $( "#masthead" ).removeClass( "hide-menu" );
    });
  }
});