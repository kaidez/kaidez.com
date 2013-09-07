requirejs.config({

  baseUrl: "/js",

  deps: [
    "buildSearchbox",
    "formValidation",
    "form",
    "formViews",
    "loadLyndaAd",
    "menu",
    "prismInit",
    "search",
  ],

  paths: {
    prism: "vendor/prism",
    enquire: "vendor/enquire.min",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min",
    underscore: "vendor/underscore-min",
    backbone: "vendor/backbone-min",
    jquery: "vendor/jquery",
    
  },

  shim: {
    "prism": {
      "exports": "Prism"
    },
    "enquire": {
      "exports": "enquire"
    },
    tipuesetContent: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipueset: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipue: {
      deps: ["jquery"],
      exports: "jquery"
    },
    "underscore": {
      exports: "_"
    },
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    }
  }

});