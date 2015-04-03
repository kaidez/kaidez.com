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

* Write all JS & CSS using preprocessors.


## THINGS TO KEEP IN MIND

* Should `! isset( $content_width )` come out of `functions.php` on line 11? It sets a width but having CSS run that instead of the WP Loop may be faster.

## REMEMBER THAT...

* `single.php` displays single posts...pulls in the post's content using `content.php`. Along with , `header.php`, `sidebar.php` and `footer.php`.

* `index.php` displays a list single posts. Each post has its content in `content.php`....`index.php` loops through each post. Along with , `header.php`, `sidebar.php` and `footer.php`.

* `page.php` displays a page. Can have a custom header and pulls in its content from `content-page.php`.

* `content-none.php` manages error messages.


## BEFORE DEPLOYING:

* Check itemscope info for the logo and author

## LYNDA STUFF TO WATCH
* [WordPress Developer Tips: Enqueuing Styles and Scripts &raquo;](http://www.lynda.com/WordPress-tutorials/WordPress-Developer-Tips-Enqueuing-Styles-Scripts/169879-2.html)

* [WordPress: Custom Post Types and Taxonomies &raquo;](http://www.lynda.com/WordPress-tutorials/WordPress-Custom-Post-Types-Taxonomies/163113-2.html)

* [WordPress Plugins: Moving WordPress with WP Migrate DB &raquo;](http://www.lynda.com/course-tutorials/Plugins-Moving-WordPress-Migrate-DB-Pro/361683-2.html)