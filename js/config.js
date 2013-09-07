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
    backbone: "vendor/backbone-min",
    enquire: "vendor/enquire.min",
    ladda: "vendor/ladda.min",
    prism: "vendor/prism",
    spin: "vendor/spin.min",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min",
    underscore: "vendor/underscore-min",
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
    tipue: {
    "underscore": {
      exports: "_"
    },
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    }
  }

});