requirejs.config({
  baseUrl: "../js",

  deps: ["menu","form","search"],

  paths: {
    jquery: "../js/vendor/jquery",
    jqueryMigrate: "../js/vendor/jquery-migrate",
    val: "../js/vendor/validate",
    tipue: "../js/vendor/tipuesearch.min",
    tipueset: "../js/vendor/tipuesearch_set"
  },

  shim: { 
    jquery: {
      exports: 'jquery'
    },
    jqueryMigrate: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    val: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    tipue: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    tipueset: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },

  waitSeconds: 20
});