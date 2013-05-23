 
define("search", ["jquery","jqueryMigrate","migrate", "tipue","tipueset"], function($, jqueryMigrate, migrate, tipue, tipueset) {

  

  $('#tipue_search_input').tipuesearch({
    'mode': 'json',
    'contentLocation': '../tipuesearch/tipuesearch_content.json'
  });
});