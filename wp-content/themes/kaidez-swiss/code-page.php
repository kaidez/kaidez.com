<?php
/**
 * Template Name: Page Code
 *
 * The template for displaying a page that has code snippets.
 *
 * @package Kaidez Swiss
 */

get_header(); ?>

  <div id="primary" class="content-area row">
    <main id="main" class="site-main col-md-8" role="main">

      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'template-parts/content', 'page' ); ?>

      <?php endwhile; // End of the loop. ?>

    </main><!-- #main -->
    <div id="sidebar" class="sidebar-class col-md-4">

    </div> <!-- #sidebar -->
  </div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer( "page-code" ); ?>
