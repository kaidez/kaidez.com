/*
 * Code that controls the nav that appears on handhelds
 * with RequireJS. Attribution goes to Dan Thomas'
 * original code at:
 * http://danny-t.co.uk/2012/03/02/really-simple-responsive-menu/
 * 
 * Using documentFragment() to load multiple elements at
 * once instead of one at a time. jsPerf test says this
 * way is faster.
 * http://jsperf.com/add-mobile-buttons-testing/2
 */

// Start RequireJS code

define("search", ["jquery", "lunr", "mustache", "uri", "lunrSearch"], function($, lunr, mustache, uri, lunrSearch) {

  $('#search-query').lunrSearch({
    indexUrl: '/search.json', // URL of the `search.json` index data for your site
    results:  '#search-results', // jQuery selector for the search results container
    entries:  '.entries', // jQuery selector for the element to contain the results list, must be a child of the results element above.
    template: '#search-results-template'  // jQuery selector for the Mustache.js template
  });

});