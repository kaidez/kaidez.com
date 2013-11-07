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
    prism: "libs/prism",
    tipue: "libs/tipuesearch.min",
    tipueset: "libs/tipuesearch_set",
    tipuesetContent: "libs/tipuesearch_content"
  },

  shim: {
    "prism": {
      "exports": "Prism"
    },
    tipue: {
      deps: ["jquery"],
      exports: "tipue"
    }
  }

});