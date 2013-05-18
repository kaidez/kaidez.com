// Start RequireJS code

define("search", ["jquery","jqui"], function($, jqui) {
  $("#searchbox").autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "search.json",
        dataType: "json",
        data: {term: request.term},
        success: function(data) {
          response($.map(data, function(item) {
            return {
              label: item.title
            };
          }));
        }
      });
    },
    minLength: 2,
    select: function(event, ui) {
      console.log(item);
    }
  });
});