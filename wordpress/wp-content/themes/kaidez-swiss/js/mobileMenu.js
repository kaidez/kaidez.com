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
});

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