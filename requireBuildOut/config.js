  requirejs.config({

  baseUrl: "/jsBuildOut",

  deps: [
    "buildform",
    "form",
    "formValidation",
    "loadAsideAd",
    "loadHomePageAds",
    "menu",
    "prismInit",
    "search"
  ],

  paths: {
    enquire: "libs/enquire.min",
    jquery: "libs/jquery.min",
    ladda: "libs/ladda.min",
    prism: "libs/prism",
    spin: "libs/spin",
    tipue: "libs/tipuesearch.min",
    tipueset: "libs/tipuesearch_set",
    tipuesetContent: "libs/tipuesearch_content"
  },

  shim: {
    // "backbone": {
    //   deps: ["underscore", "jquery"],
    //   exports: "Backbone"
    // },
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
    }
    // "underscore": {
    //   exports: "_"
    // }
  }

});