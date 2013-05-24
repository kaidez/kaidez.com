 
define("search", ["jquery","jqueryMigrate","tipueset","tipue"], function($, jqueryMigrate, tipueset, tipue) {

  $('#tipue_search_input').tipuesearch({
    'mode': 'json',
    'contentLocation': '/search.json'
  });
   
});