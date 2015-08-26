/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

var $ = require( "jquery" ); // require jQuery

require("./homepage.scss");

// Wait for the DOM to be ready before loading in JSON
document.addEventListener( "DOMContentLoaded", function( event ) {

  /*
   * ==================================================================
   * LOOK FOR THE FIRST 11 POSTS VIA THE WP REST API AND PLACE THEM ON * THE HOME PAGE ON A CERTAIN WAY
   * ==================================================================
   */

  /*
   * Grab the first 10 single posts from the WordPress API & sort them 
   * by date.
   */
  var getPostsAPI = "/wp-json/posts?filter[orderby]=date&filter[posts_per_page]=11";

  /*
   * Load in post content data with $.getJSON()
   * Refer to this data as "posts" inside the $.getJSON call
   */
  $.getJSON( getPostsAPI ).done( function( posts ) {
    
    // var reference to <section id="all-articles" /> on the home page
    var articleSection = document.getElementById( "all-articles" ),
        
      // Create document fragment to batch-load content onto the page
      sectionDocFragment = document.createDocumentFragment();

    for( var key in posts ) {

      // jQuery-style single var pattern
      var postImage, postLink, postTitle, postExcerpt,
          articlePost = document.createElement( "article" ),
          articleHeader = document.createElement( "h2" ),
          articleExcerpt = document.createElement( "p" ),
          articleLink = document.createElement( "a" ),
          articleImage = document.createElement( "img" );
          imageDiv = document.createElement( "div" );

      // SET UP THE <article> TAG!!!!

      // Check if we're working with the first post
      if( posts[key] == posts[0] ) {
        /* 
         * If it's the first post, apply the
         * "first-homepage-post-snippet" class to the <article> tag
         */
        articlePost.setAttribute( "class", "first-homepage-post-snippet" );
      } else {
        /* 
         * If it's NOT the first post, apply the
         * "homepage-post-snippet" class to the <article> tag
         */
        articlePost.setAttribute( "class", "homepage-post-snippet" );        
      }
      // STOP <article> TAG SETUP!!!!



      // SET UP SINGLE BLOG POST IMAGES!!!!

      /*
       * Featured images are defined by "Featured Image" section of a
       * single WordPress post's page. If it's not defined, a
       * default image is loaded via the Default featured image
       * WordPress plugin.
       */
      postImage = posts[key].featured_image["source"];

      // Add styles and a "src" attribute to the image 
      $( articleImage ).attr({
        "src": postImage,
        "class": "post-pic post-pic-border"
      });

      // Load post image in a <div>
      imageDiv.appendChild( articleImage ); 

      // Load the <div> with an image in the <article>
      articlePost.appendChild( imageDiv ); 

      // STOP SINGLE BLOG POST IMAGES SETUP!!!!



      // SET UP SINGLE BLOG LINK & HEADER!!!!

      // Get post title link
      postLink = posts[key].link;

      // Get post title copy
      postTitle = posts[key].title;

      // Set the article link's "href" to be the post link
      $(articleLink).attr({
        "href": postLink,
        class: "post-link"
      }); 

      // Load post title copy in the <a> tag
      articleLink.innerHTML = postTitle;

      // Load link into the post header
      articleHeader.appendChild( articleLink ); 
      
      // Load post header in the <article>
      articlePost.appendChild( articleHeader ); 
      
      articleHeader.setAttribute("class", "post-link-homepage");

      // STOP SINGLE BLOG LINK & HEADER SETUP!!!!



      // SET UP SINGLE BLOG POST EXCERPT!!!!
      
      // Get post excerpt copy
      postExcerpt = posts[key].excerpt;

      // Load post excerpt copy in the <p> tag
      articleExcerpt.innerHTML = postExcerpt;

      // Load post title copy in the <article>
      articlePost.appendChild( articleExcerpt );

      // Load article with title, image & excerpt into the doc fragment
      sectionDocFragment.appendChild( articlePost );

      // STOP SINGLE BLOG POST EXCERPT SETUP!!!!



      // var postCategory = posts[key].terms["category"];

      // for (var key in postCategory) {
      //   console.log(postCategory[key].slug);
      // }

    } // end for...in loop

    /* 
     * Exit loop, then load the doc fragment with all the content into
     * the "all-articles" element that's already on the page
     */
    articleSection.appendChild( sectionDocFragment );

  }); // end $.getJSON()

}); // end addEventListener