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
        <a id="tweet-this-post" class="tweet-post-class">would you like to tweet this post?</a>
      
        <ul>
          <li>
            <a id="facebook-share-link" href="https://plus.google.com/share?url=http://kaidez.com{{ page.permalink }}" title="Share {{ page.title }} on Facebook" target="blank">Google+</a>
          </li>

          <li>
            <a id="googleplus-share-link" href="http://www.facebook.com/sharer.php?u=http://kaidez.com{{ page.permalink }}&t={{ page.title }}" title="Share {{ page.title }} on Google Plus" target="blank">Facebook</a>
          </li>
        </ul>
      </div><!-- #sharing-buttons -->


    </div><!-- .entry-content -->
  
  </article><!-- #post-## -->
  
  