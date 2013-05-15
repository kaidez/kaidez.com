requirejs.config({
  baseUrl: "../js",

  deps: ["menu","form"],

  paths: {
    jquery: "../js/vendor/jquery",
    val: "../js/vendor/validate"
  },

  shim: { 
    jquery: {
      exports: 'jquery'
    },
    val: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },

  waitSeconds: 20
});