// Menu button
$( "#mobile-menu-button" ).click( function() {

  if( $( "body" ).hasClass( "show-mobile-menu" ) ) {

    Q.fcall( function(){
      $( "#masthead" ).addClass( "hide-menu" );
      $( "body" ).removeClass( "show-mobile-menu" );
      return Q.delay( 300 );
    }).then(function() {
      $( "#masthead" ).removeClass( "hide-menu" ).removeClass( "show-menu" );
    });

  } else {

    $( "#masthead" ).addClass( "show-menu" ).removeClass( "hide-menu" );
    $( "body" ).addClass( "show-mobile-menu" );
  }
});

// Search button
$( "#mobile-search-button" ).click( function() {

  if( !isMobileMenu ){
    $( "#masthead" ).addClass( "show-menu" ).removeClass( "hide-menu" );
    $( "body" ).addClass( "show-mobile-menu" );    
  } else {
      Q.fcall( function(){
        $( "#masthead" ).addClass( "hide-menu" );
        $( "body" ).removeClass( "show-mobile-menu" );
        return Q.delay( 300 );
      }).then(function() {
        $( "#masthead" ).removeClass( "hide-menu" ).removeClass( "show-menu" );
      });
  }
});