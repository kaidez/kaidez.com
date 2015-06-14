

    $( "#click-btn-onpage" ).click(function () {
      $( "#click-btn-element" ).html( "The '.click' button was clicked!" );
    });

    $( "#on-btn-onpage" ).on("click", function () {
      $( "#on-btn-element" ).html( "The '.on' button was clicked!" );
    });

    $( "body" ).delegate("#delegate-btn-onpage", "click", function () {
      $( "#load-element" ).append( "The '.delegate' button was clicked!" );
    });

    $("#load-ajax").click(function(){
      $( "#load-element-append" ).load( "more.html" );
    });

    $("#load").click(function(){
      $("#foo").html("yes");
    });    
   
