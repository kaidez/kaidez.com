/*
 * Run Prism.js as an AMD module (http://prismjs.com/)
 */
define(["prism"],function(Prism) {
	// Prism is firing off the JavaScript before the CSS is ready.
	// Run this method to ensure that snippets gets highlighted after everything /  loads. 
  Prism.highlightAll();
});