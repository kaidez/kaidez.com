"use strict"; // use ES5 strict mode



// Single var pattern
var rework = require('rework'), // Bring in Rework
    rework_mixin = require('rework-plugin-mixin'),
    mixins = require('rework-mixins'), // Use some core Rework mixins
    vars = require('rework-vars')(), // Use CSS variables NOW!!!
    calc = require('rework-calc'), // Perform math calculations
    autoprefixer = require('autoprefixer'),
    
    fs = require('fs'), //Bring in Node's fs module

    // File with pre-process code...spits out style.css
    css = fs.readFileSync('preprocess.css', 'utf-8'); 







/*
 * ===================================================================
 * REWORK BUILD-OUT PROCESS
 *
 * "css" refers to variable above, which refers to "preprocess.css"
 * Run all Rework tasks with .use
 * Auto-prefix stuff where needed in "preprocess.css"
 * Process "preprocess.css" out to the root and name it "style.css"
 * ====================================================================
 */
css = rework(css)
  .use(vars)
  .use(calc)
  .use(rework_mixin(mixins))
  .toString();

css = autoprefixer().process(css);

fs.writeFileSync('style.css', css)