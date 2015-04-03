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


## REMEMBER THAT...
* `single.php` displays single posts...pulls in the post's content using `content.php`. Along with , `header.php`, `sidebar.php` and `footer.php`.

* `index.php` displays a list single posts. Each post has its content in `content.php`....`index.php` loops through each post. Along with , `header.php`, `sidebar.php` and `footer.php`.

* `page.php` displays a page. Can have a custom header and pulls in its content from `content-page.php`.