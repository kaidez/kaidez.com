 
define("search", ["jquery","jqueryMigrate","tipue","tipueset"], function($, jqueryMigrate, tipue, tipueset) {

  $('#tipue_search_input').tipuesearch({
    'mode': 'json',
    'contentLocation': '../tipuesearch/tipuesearch_content.json'
  });
});