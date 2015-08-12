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

    </div><!-- .entry-content -->
  
  </article><!-- #post-## -->
  
  