$( "#mobile-menu-button" ).click( function() {
  
  var isMobileMenu = $( "body" ).hasClass( "show-mobile-menu" ),
      isSearchMenu = $( "body" ).hasClass( "show-mobile-menu" );

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


/*
$( "#mobile-menu-button" ).click( function() {
  
  var isMobileMenu = $( "body" ).hasClass( "show-mobile-menu" );

  if( !isMobileMenu ){
    $( "#masthead" ).addClass( "show-menu" ).removeClass("hide-menu");
    $( "body" ).addClass( "show-mobile-menu" );    
  } else {
    $( "#masthead" ).addClass("hide-menu");
    $( "body" ).removeClass( "show-mobile-menu" ).promise().done(
      function(){
        $( "#masthead" ).removeClass("show-menu");
      });     
  }
});*/

//   if ( !isMobileMenu ) {
    
//     $( "#masthead" ).addClass( "show-menu" );

//     $( "body" ).addClass( "show-mobile-menu" );

//   } else {

//     $( "#masthead" ).addClass( "hide-menu" ).promise().done(
//       function(){
//         $( "#masthead" ).removeClass( "show-menu" );
//       })
//     .done(function(){
//       $( "body" ).removeClass( "show-mobile-menu" );
//     })
//     .done(function(){
      
//     });
//   }

// });