requirejs.config({

  baseUrl: "/js",

  deps: ["buildform","ladda","menu","form","search"],

  paths: {
    jquery: "vendor/jquery",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min",
    ladda: "vendor/ladda.min",
    spin: "vendor/spin.min"
  },

  shim: {
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
    },
    ladda: {
      exports: 'ladda'
    },
    spin: {
      exports: 'spin'
    }
  }

});