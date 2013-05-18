requirejs.config({
  baseUrl: "../js",

  deps: ["menu","form","search"],

  paths: {
    jquery: "../js/vendor/jquery",
    jqui: "../js/vendor/jquery-ui.custom",
    val: "../js/vendor/validate"
  },

  shim: { 
    jquery: {
      exports: 'jquery'
    },
    jqui: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    val: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },

  waitSeconds: 20
});