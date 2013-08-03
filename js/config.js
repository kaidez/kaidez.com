requirejs.config({
  baseUrl: "/js",

  deps: ["buildform","menu","form","search"],

  paths: {
    jquery: "vendor/jquery",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min" 
  },

  shim: { 
    jquery: {
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