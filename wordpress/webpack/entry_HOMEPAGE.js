/**
 * entry_HOMEPAGE.js
 *
 * Module for loading styles and scripts related to the home page only
 *
 */

var $ = require( "jquery" ); // require jQuery

// Wait for the DOM to be ready before loading in JSON
document.addEventListener( "DOMContentLoaded", function( event ) {

  /*
   * ==================================================================
   * FIND THE FIRST TEN POSTS IN THE WP REST API AND PLACE THEM ON THE
   * HOME PAGE ON A CERTAIN WAY
   * ==================================================================
   */

  /*
   * Grab the first 10 single posts from the WordPress API & sort them 
   * by date.
   */
  var getPostsAPI = "/wp-json/posts?filter[orderby]=date&filter[posts_per_page]=10";

  /*
   * Load in post content with $.getJSON()
   * Refer to the content as "posts" inside the $.getJSON call
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

      // Each <article> tag gets the "homepage-post-snippet" class
      articlePost.setAttribute("class", "homepage-post-snippet");

      /*
       * SET UP SINGLE BLOG POST IMAGES!!!!
       * The first 10 blog posts MUST have a Featured Image or the site
       * will crash.
       */
      postImage = posts[key].featured_image["source"];
      $( articleImage ).attr({
        "src": postImage,
        "class": "post-pic"
      });

      // Load post image in a <div>
      imageDiv.appendChild( articleImage ); 

      // Load the <div> with an image in the <article>
      articlePost.appendChild( imageDiv ); 



      // SET UP SINGLE BLOG LINK & HEADER!!!!

      // Get post title link
      postLink = posts[key].link;

      // Get post title copy
      postTitle = posts[key].title;

      // Set the article link's "href" to be the post link
      articleLink.setAttribute( "href", postLink ); 

      // Load post title copy in the <a> tag
      articleLink.innerHTML = postTitle;

      // Load link into the post header
      articleHeader.appendChild( articleLink ); 
      
      // Load post header in the <article>
      articlePost.appendChild( articleHeader ); 
      


      // SET UP SINGLE BLOG POST EXCERPT!!!!
      
      // Get post excerpt copy
      postExcerpt = posts[key].excerpt;

      // Load post excerpt copy in the <p> tag
      articleExcerpt.innerHTML = postExcerpt;

      // Load post title copy in the <article>
      articlePost.appendChild( articleExcerpt );

      // Load <article> with the title & excerpt into the doc fragment
      sectionDocFragment.appendChild( articlePost );


    } // end for...in loop

    // Exit loop, load the doc fragment into the "all-articles" element
    articleSection.appendChild( sectionDocFragment );

  }); // end $.getJSON()

}); // end addEventListener