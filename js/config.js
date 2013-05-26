requirejs.config({
  baseUrl: "../js",

  deps: ["buildform","menu","form","search"],

  paths: {
    jquery: "../js/vendor/jquery",
    val: "../js/vendor/validate",
    tipuesetContent: "../js/vendor/tipuesearch_content",
    tipueset: "../js/vendor/tipuesearch_set",
    tipue: "../js/vendor/tipuesearch.min" 
  },

  shim: { 
    jquery: {
      exports: 'jquery'
    },
    val: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    tipuesetContent: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    tipueset: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    tipue: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }

});