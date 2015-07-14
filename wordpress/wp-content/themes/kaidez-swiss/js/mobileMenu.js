var nav = {
  bodyClass: "show-mobile-menu",
  targetEl: "#masthead",
  hideClass: "hide-menu",
  showClass: "show-menu"
};

function removeMobileClass() {
  if ( $( "body" ).hasClass( "show-mobile-search" ) ) {
    $( "body" ).removeClass( "show-mobile-search" );
    $( "#searchform" ).addClass( "hide-searchbox" ).removeClass( "show-searchbox" );    
  }
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
      removeMobileClass();
    }).then(function(){
      $( obj.targetEl ).addClass( obj.showClass );
      $( "body" ).addClass( obj.bodyClass );
      $( "#searchform" ).removeClass( "hide-searchbox" );
    });
  }
}

$( "#mobile-menu-button" ).click(function(){
  animateNavElement( nav );
});
/*
// Menu button
$( "#mobile-menu-button" ).click( function() {

  if( $( "body" ).hasClass( "show-mobile-menu" ) ) {

    Q.fcall( function(){
      $( "#masthead" ).addClass( "hide-menu" );
      $( "body" ).removeClass( "show-mobile-menu" );
      return Q.delay( 500 );
    }).then(function() {
      $( "#masthead" ).removeClass( "hide-menu" ).removeClass( "show-menu" );
    });

  } else {

    Q.fcall( function(){
      if ( $( "body" ).hasClass( "show-mobile-search" ) ) {
        $( "body" ).removeClass( "show-mobile-search" );
        $( "#searchform" ).addClass( "hide-searchbox" ).removeClass( "show-searchbox" );    
      }
    }).then(function(){
      $( "#masthead" ).addClass( "show-menu" );
      $( "body" ).addClass( "show-mobile-menu" );
      $( "#searchform" ).removeClass( "hide-searchbox" )
    });

  }

});
*/
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