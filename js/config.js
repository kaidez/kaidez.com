// http://stackoverflow.com/questions/10122291/loading-mustache-using-requirejs

requirejs.config({
  baseUrl: "/js",

  deps: ["menu","form", "search"],

  paths: {
    jquery: "vendor/jquery",
    val: "vendor/validate",
    lunr: "vendor/lunr.min",
    mustache: "../mustache/",
    uri: "vendor/URI.min",
    lunrSearch: "vendor/jquery.lunr.search"
  },

  shim: { 
    jquery: {
      exports: 'jquery'
    },
    val: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    lunr: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'mustache': {
      exports: 'Mustache'
    },
    uri: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    lunrSearch: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  },

  waitSeconds: 20
});