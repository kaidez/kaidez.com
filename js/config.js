requirejs.config({

  baseUrl: "/js",

  deps: [
    "buildContactForm",
    "buildSearchbox",
    //"form",
    "formValidation",
    "formViews",
    "ladda",
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
    ladda: "vendor/ladda.min",
    spin: "vendor/spin.min",
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
    ladda: {
      exports: "ladda"
    },
    spin: {
      exports: "spin"
    },
    "underscore": {
      exports: "_"
    },
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }

});