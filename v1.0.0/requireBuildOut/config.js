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
    "prism": {
      "exports": "Prism"
    },
    tipue: {
      deps: ["jquery"],
      exports: "tipue"
    }
  }

});