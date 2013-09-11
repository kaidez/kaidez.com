requirejs.config({

  baseUrl: "/js",

  deps: [
    "buildform",
    "form",
    "formValidation",
    "formViews",
    "loadLyndaAd",
    "menu",
    "prismInit",
    "search"
  ],

  paths: {
    backbone: "libs/backbone-min",
    enquire: "libs/enquire.min",  // AMD build...not released yet
    jquery: "libs/jquery",
    ladda: "libs/ladda.min",
    prism: "libs/prism",
    spin: "libs/spin.min",
    tipue: "libs/tipuesearch.min",
    tipueset: "libs/tipuesearch_set",
    tipuesetContent: "libs/tipuesearch_content",
    underscore: "libs/underscore-min"
  },

  shim: {
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "prism": {
      "exports": "Prism"
    },
    tipue: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipueset: {
      deps: ["jquery"],
      exports: "jquery"
    },
    tipuesetContent: {
      deps: ["jquery"],
      exports: "jquery"
    },
    "underscore": {
      exports: "_"
    }
  }

});