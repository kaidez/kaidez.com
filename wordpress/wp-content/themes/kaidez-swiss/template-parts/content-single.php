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
      <?php the_title( '<h1 id="blog-post-title" class="entry-title" itemprop="headline">', '</h1>' ); ?>
  
      <div class="entry-meta">
        <?php kaidez_swiss_posted_on(); ?>
      </div><!-- .entry-meta -->
    </header><!-- .entry-header -->
  
    <div class="entry-content">
      <?php the_content(); ?>
      <?php
        wp_link_pages( array(
          'before' => '<div class="page-links">' . esc_html__( 'Pages:',   'kaidez-swiss' ),
          'after'  => '</div>',
        ) );
      ?>
      <div id="sharing-buttons">

        <div>
          <a id="tweet-this-post" class="tweet-post-class">would you like to tweet this post?</a>
        </div>
      
        <div class="other-sharing-element">
          <p>other ways to share this post:</p> 
          <p>
            <a id="facebook-share-link" class="share-post-link" target="blank">facebook</a> <a id="googleplus-share-link" class="share-post-link" target="blank">Google+</a>
          </p>

        </div>

      </div><!-- #sharing-buttons -->


    </div><!-- .entry-content -->
  
  </article><!-- #post-## -->
  
  