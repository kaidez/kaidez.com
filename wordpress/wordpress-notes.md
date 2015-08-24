single.php: the posts file. call content.php (the content), the header, the sidebar and the footer. On this site, the file is "content-single.php" which "hooks" into content.php to build the page.

index.php: the posts file. calls the header, the sidebar and the footer. Also calls calls content.php (the content) multiple times for each post.

BEFORE DEPLOYING
* webpack-i-fy `comment-reply.js`

webpack setupo can cause FOUT/FOUC.