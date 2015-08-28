/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

 "use strict"; 

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

      // var reference to <section id="all-articles"> on the home page
      var articleSection = document.getElementById( "all-articles" ),

      /*
       * Create document fragment to batch-load a single snippet onto
       * the page
       */
      olderPosts = document.createDocumentFragment();

      for( var outerKey in posts ) {

        // Run hasOwnPropertyCheck for the outer for..in loop
        if( posts.hasOwnProperty(outerKey) ) {

          // jQuery-styled single var pattern
          var postImage,
              postLink,
              postTitle,
              postExcerpt,
              postCategory,
              categoryHref,
              snippetContainer = document.createElement( "article" ),
              snippetHeader = document.createElement( "h2" ),
              singleExcerpt = document.createElement( "p" ),
              snippetLink = document.createElement( "a" ),
              snippetImage = document.createElement( "img" ),
              imageDiv = document.createElement( "div" ),
              categoryLink = document.createElement( "a" ),
              
              // Boolean check for the first post
              isFirstPost = posts[outerKey] == posts[0];

          // SET UP THE <article> TAG!!!!

          // Check if we're working with the first post
          if( isFirstPost ) {
            /* 
             * If it's the first post, apply the
             * "first-homepage-post-snippet" class to the <article> tag
             */
            snippetContainer.setAttribute( "class", "first-homepage-post-snippet" );
          } else {
            /* 
             * If it's NOT the first post, apply the
             * "homepage-post-snippet" class to the <article> tag
             */
            snippetContainer.setAttribute( "class", "homepage-post-snippet" );        
          }
          // STOP <article> TAG SETUP!!!!



          // SET UP SINGLE BLOG POST IMAGES!!!!

          /*
           * Featured images are defined by "Featured Image" section of a
           * single WordPress post's page. If it's not defined, a
           * default image is loaded via the "Default featured image"
           * WordPress plugin.
           */
          postImage = posts[outerKey].featured_image.source;

          // Add styles and a "src" attribute to the image 
          $( snippetImage ).attr({
            "src": postImage,
            "class": "post-pic post-pic-border"
          });

          // Load post image in a <div>
          imageDiv.appendChild( snippetImage ); 

          // STOP SINGLE BLOG POST IMAGES SETUP!!!!



          // SET UP SINGLE BLOG LINK & HEADER!!!!

          // Get post title link
          postLink = posts[outerKey].link;

          // Get post title copy
          postTitle = posts[outerKey].title;

          // Set the article link's "href" to be the post link
          $(snippetLink).attr({
            "href": postLink,
            class: "post-link"
          }); 

          // Load post title copy in the <a> tag
          snippetLink.innerHTML = postTitle;

          // Load link into the post header
          snippetHeader.appendChild( snippetLink ); 

          // STOP SINGLE BLOG LINK & HEADER SETUP!!!!



          // SET UP SINGLE BLOG POST EXCERPT!!!!
      
      // Get post excerpt copy
      postExcerpt = posts[outerKey].excerpt;

      // Load post excerpt copy in the <p> tag
      singleExcerpt.innerHTML = postExcerpt;

      // STOP SINGLE BLOG POST EXCERPT SETUP!!!!



      /*
       * APPEND EVERYTHING WE HAVE AT THIS POINT TO THE <article>
       *
       * We have all the post snippet elements...EXCEPT for the
       * category. Append those elements to the <article> tag.
       */

      // First, append the post image to the <article>...
      snippetContainer.appendChild( imageDiv );

      // Second, append the post header to the <article>...
      snippetContainer.appendChild( snippetHeader ); 

      // Third, append the post excerpt to the <article>.
      snippetContainer.appendChild( singleExcerpt );



      /*
       * SET UP THE CATEGORY !!!!
       *
       * The category name object is nested deeper in the WP-API
       * than the other info, so we have to do a an inner for...in
       * loop to find it. This code needs to run last; otherwise,
       * it breaks the process of grabbing post data.
       */

      // Grab the "category" value in the WP-API
      postCategory = posts[outerKey].terms.category;

      // Loop through the category object
      for ( var innerKey in postCategory ) {

        if( postCategory.hasOwnProperty( innerKey ) ){

            // Find category name & put it in "categoryLink" element
            categoryLink.innerHTML = postCategory[innerKey].name;
            categoryHref = "/" + postCategory[innerKey].slug + "/";

            // Give "categoryLink" class name & href attributes
            $(categoryLink).attr({
              "class": "category-name",
              "href": categoryHref
            });
        
            // Use $.prepend() to put categoryLink at TOP of <article>
            $( snippetContainer ).prepend( categoryLink ); 

          }  // END INNER "for...in" LOOP's hasOwnProperty() check

        }  // END INNER "for...in" LOOP

        // STOP CATEGORY SETUP !!!!



        /*
         * Load article with title, image, excerpt and category into
         * the document fragment
         */
        olderPosts.appendChild( snippetContainer );
      }
    } // end for...in loop

    /* 
     * Exit loop, then load the document fragment with all the content
     * into the "all-articles" element that's already on the page
     */
    articleSection.appendChild( olderPosts );

  }); // end $.getJSON()

}); // end addEventListener