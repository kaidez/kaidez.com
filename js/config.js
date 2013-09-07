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
    backbone: "vendor/backbone-min",
    enquire: "vendor/enquire.min",
    jquery: "vendor/jquery",
    ladda: "vendor/ladda.min",
    prism: "vendor/prism",
    spin: "vendor/spin.min",
    tipue: "vendor/tipuesearch.min",
    tipueset: "vendor/tipuesearch_set",
    tipuesetContent: "vendor/tipuesearch_content",
    underscore: "vendor/underscore-min"
  },

  shim: {
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "enquire": {
      "exports": "enquire"
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