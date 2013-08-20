requirejs.config({

  baseUrl: "/js",

  deps: ["loadLyndaAd", "buildform","ladda","menu","form","search"],

  paths: {
    enquire: "vendor/enquire.min",
    jquery: "vendor/jquery",
    tipuesetContent: "vendor/tipuesearch_content",
    tipueset: "vendor/tipuesearch_set",
    tipue: "vendor/tipuesearch.min",
    ladda: "vendor/ladda.min",
    spin: "vendor/spin.min",
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
    }
  }

});