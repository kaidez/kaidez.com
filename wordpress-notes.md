single.php: the posts file. call content.php (the content), the header, the sidebar and the footer. On this site, the file is "content-single.php" which "hooks" into content.php to build the page.

index.php: the posts file. calls the header, the sidebar and the footer. Also calls calls content.php (the content) multiple times for each post.

BEFORE DEPLOYING
* webpack-i-fy `comment-reply.js`

webpack setup can cause FOUT/FOUC.

webpack can chunk out AJAX code, meaning that the code will be called twice under the right set of circumstances.

Go to http://v2.wp-api.org/guide/discovery/ to see if this is a better way of calling the WP API.