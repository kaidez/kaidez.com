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
      $categories_list = get_the_category_list( esc_html__( ', ', 'kaidez-swiss' ) );
    if ( $categories_list && kaidez_swiss_categorized_blog() ) {
      printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'kaidez-swiss' ) . '</span>', $categories_list ); // WPCS: XSS OK.
    }
    ?>
      <?php the_title( '<h1 class="entry-title" itemprop="headline">', '</h1>' ); ?>
  
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
    </div><!-- .entry-content -->
  
  </article><!-- #post-## -->
  
  