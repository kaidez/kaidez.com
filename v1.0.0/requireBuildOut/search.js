/*
 * Require JS Module: search
 *
 * Powers the jQuery-powered Tipue search plugin, which powers the 
 * site's main searchbox.
 */ 
define(["jquery","tipueset","tipuesetContent","tipue"], function($, tipueset, tipuesetContent, tipue) {

    $('#tipue_search_input').tipuesearch({
      'show': 10,
      'showURL': false,
      'highlightEveryTerm': true
    });
   
});