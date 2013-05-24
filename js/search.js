 
define("search", ["jquery","jqueryMigrate","tipuesetContent","tipueset","tipue"], function($, jqueryMigrate, tipuesetContent, tipueset, tipue) {

    $('#tipue_search_input').tipuesearch({
      'show': 10,
      'showURL': false,
      'highlightEveryTerm': true
    });
   
});