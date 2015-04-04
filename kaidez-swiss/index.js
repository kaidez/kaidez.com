"use strict"; // use ES5 strict mode



// Single var pattern
var rework = require('rework'), // Bring in Rework
    mixin = require('rework-plugin-mixin'), // Write Rework mixins
    calc = require('rework-calc'),
    vars = require('rework-vars')(),
    autoprefixer = require('autoprefixer'),
    fs = require('fs'), //Bring in Node's fs module

    // File with pre-process code
    css = fs.readFileSync('preprocess.css', 'utf-8'); 



function ellipsis(type) {
  if ('ellipsis' == type) {
    return {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }
  }

  return type;
}



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
  .use(mixin({ kaidez: ellipsis }))
  .toString();

css = autoprefixer().process(css);

fs.writeFileSync('style.css', css)