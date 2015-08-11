<?php
/**
 * Template part for displaying single posts.
 *
 * @package Kaidez Swiss
 */

?>

  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
    <header class="entry-header">
    <?php
      if ( function_exists( 'yoast_breadcrumb' ) ) {
        yoast_breadcrumb();
      }
    ?>
      <?php the_title( '<h1 id="blog-post-title" class="entry-title entry-title-margin" itemprop="headline">', '</h1>' ); ?>
  
      <div class="entry-meta">
        <?php kaidez_swiss_posted_on(); ?>
      </div><!-- .entry-meta -->
    </header><!-- .entry-header -->
  
    <div class="entry-content">
      <?php the_content(); ?>

      <div id="sharing-buttons">

        <hr>
        <div>
          <a id="tweet-this-post" class="tweet-post-class">would you like to tweet this post?</a>
        </div>
      
        <div class="other-sharing-element">
          <strong class="other-ways-text">other ways to share:</strong>
          <p>
            <a id="facebook-share-link" class="share-post-link facebook" target="blank">facebook</a> <a id="googleplus-share-link" class="share-post-link googleplus" target="blank">google+</a>
          </p>
          <hr>
        </div>

      </div><!-- #sharing-buttons -->

    </div><!-- .entry-content -->
  
  </article><!-- #post-## -->
  
  