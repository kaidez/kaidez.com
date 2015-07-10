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

    $( "#masthead" ).addClass( "show-menu" ).removeClass( "hide-menu" );
    $( "body" ).addClass( "show-mobile-menu" );
  }
});

// Search button
$( "#mobile-search-button" ).click( function() {

  if( $( "body" ).hasClass( "show-mobile-search" ) ) {

    Q.fcall( function(){
      $( "#searchform" ).addClass( "hide-searchbox" );
      $( "body" ).removeClass( "show-mobile-search" );
      return Q.delay( 300 );
    }).then(function() {
      $( "#searchform" ).removeClass( "hide-searchbox" ).removeClass( "show-searchbox" );
    });

  } else {

    Q.fcall(function(){
      if ( $( "body" ).addClass( "show-mobile-menu" ) ) {
        $( "#masthead" ).addClass( "hide-menu" );
        $( "body" ).removeClass( "show-mobile-menu" );
      }
    }).then(function(){
      $( "#searchform" ).addClass( "show-searchbox" ).removeClass( "hide-searchbox" );
      $( "body" ).addClass( "show-mobile-search" );
    });
  }
});