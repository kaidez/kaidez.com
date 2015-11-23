<?php
/**
 * WP Post Template: Lynda JavaScript
 *
 */

get_header(); ?>

  <div id="primary" class="content-area row">
    <main id="main" class="site-main col-md-8" role="main" itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">

    <?php while ( have_posts() ) : the_post(); ?>

    <?php get_template_part( 'template-parts/content', 'lynda-javascript' ); ?>

      <?php the_post_navigation(); ?>

      <?php
        // If comments are open or we have at least one comment, load up the comment template.
        if ( comments_open() || get_comments_number() ) :
          comments_template();
        endif;
      ?>

    <?php endwhile; // End of the loop. ?>

    </main><!-- #main -->
    <div id="sidebar" class="sidebar-class col-md-4">
      
    </div> <!-- #sidebar -->
  </div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer( 'posts' ); ?>
