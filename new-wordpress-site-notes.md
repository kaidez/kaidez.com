# NEW WORDPRESS SITE NOTES

## MUST-DOS:

* Create a tight, efficient CSS build-out process: regression testing, etc.

* Always use plugins that do NOT bring in their own JavaScript and a minimal amount of CSS.

* Use JS to dynamically build ads with enquire.js.

* Create the theme with _s.

* Optimize the sh*t out of the site...WordPress page loads take time and most of the WP fail Webpage Test's "time to first byte" test.

## NICE-TO-HAVES:

* Use some sort of dependency system to load in the JS...require.js, Browserify, Webpack or something similar.

* Apply uncss and critical path extraction to the CSS build-out process.

* Use Polymer/Web Components to create some kind of widget...maybe something related to social?