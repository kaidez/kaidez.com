requirejs.config({

  baseUrl: "/js",

  deps: [
          "loadLyndaAd",
           "buildSearchbox",
           "buildContactForm",
           "ladda",
           "menu",
           "form",
           "search",
           "formViews",
           "formValidation"
         ],

  paths: {
    enquire: "vendor/enquire.min",
    jquery: "vendor/jquery",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min",
    ladda: "vendor/ladda.min",
    spin: "vendor/spin.min",
    underscore: "vendor/underscore-min",
    backbone: "vendor/backbone-min"
    
  },

  shim: {
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