/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

var $ = require( "jquery" ); // require jQuery

require( "./homepage.scss" ); // styles for the homepage only

// Wait for the DOM to be ready before loading in JSON
document.addEventListener( "DOMContentLoaded", function( event ) {

  /*
   * ==================================================================
   * LOOK FOR THE FIRST 11 POSTS VIA THE WP REST API AND PLACE THEM ON * THE HOME PAGE ON A CERTAIN WAY
   * ==================================================================
   */

  /*
   * Grab the first 9 single posts from the WordPress API & sort them 
   * by date.
   */
  var getPostsAPI = "/wp-json/posts?filter[orderby]=date&filter[posts_per_page]=9";

  /*
   * Load in post content data with $.getJSON()
   * Refer to this data as "posts" inside the $.getJSON call
   */
  $.getJSON( getPostsAPI ).done( function( posts ) {
    
    // var reference to <section id="all-articles" /> on the home page
    var articleSection = document.getElementById( "all-articles" ),
        
      // Create document fragment to batch-load content onto the page
      sectionDocFrag = document.createDocumentFragment();

    for( var key in posts ) {

      // jQuery-styled single var pattern
      var postImage, postLink, postTitle, postExcerpt, postCategory,
          articlePost = document.createElement( "article" ),
          articleHeader = document.createElement( "h2" ),
          articleExcerpt = document.createElement( "p" ),
          articleLink = document.createElement( "a" ),
          articleImage = document.createElement( "img" ),
          imageDiv = document.createElement( "div" ),
          categoryDiv = document.createElement( "div" );

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
       * default image is loaded via the "Default featured image"
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
      
      articleHeader.setAttribute("class", "post-link-homepage");

      // STOP SINGLE BLOG LINK & HEADER SETUP!!!!



      // SET UP SINGLE BLOG POST EXCERPT!!!!
      
      // Get post excerpt copy
      postExcerpt = posts[key].excerpt;

      // Load post excerpt copy in the <p> tag
      articleExcerpt.innerHTML = postExcerpt;

      // STOP SINGLE BLOG POST EXCERPT SETUP!!!!


      /*
       * APPEND EVERYTHING WE HAVE AT THIS POINT TO THE <article>
       *
       * We have all the post snippet elements...EXCEPT for the
       * category. Append those elements to the <article> tag.
       */

      // First, append the post image to the <article>...
      articlePost.appendChild( imageDiv );

      // Second, append the post header to the <article>...
      articlePost.appendChild( articleHeader ); 

      // Third, append the post excerpt to the <article>.
      articlePost.appendChild( articleExcerpt );



      /*
       * SET UP THE CATEGORY !!!!
       *
       * The category name object is nested deeper in the WP-API than
       * the other info, so we have to do a an inner for...in loop.
       * This code needs to run last; otherwise, it breaks the process
       * of grabbing certain data from the WP-API for all the posts.
       */
      
      // Grab the "category" value in the WP-API
      postCategory = posts[key].terms["category"];

      // Loop through the category object
      for ( var key in postCategory ) {

        // Find category name and put it in the "categoryDiv" element
        categoryDiv.innerHTML = postCategory[key].name;

        // Give "categoryDiv" element a class name of "category-name"
        categoryDiv.setAttribute( "class", "category-name" );
        
        // Use $.prepend() to put "categoryDiv" at the TOP of <article>
        $( articlePost ).prepend( categoryDiv ); 
      }

      // STOP CATEGORY SETUP !!!!



      /*
       * Load article with title, image, excerpt and category into the
       * document fragment
       */
      sectionDocFrag.appendChild( articlePost );

    } // end for...in loop

    /* 
     * Exit loop, then load the document fragment with all the content
     * into the "all-articles" element that's already on the page
     */
    articleSection.appendChild( sectionDocFrag );

  }); // end $.getJSON()

}); // end addEventListener