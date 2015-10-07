<?php

/**
 * Template Name: Site Map
 *
 * The template for displaying The Site Map.
 *
 * @package Kaidez Swiss
 */

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

    <div id="posts">
      <h2>Posts</h2>
    </div><!-- #posts -->

    <div id="pages">
      <h2>Pages</h2>
    </div><!-- #pages -->

    </main><!-- #main -->
    <div id="sidebar" class="sidebar-class col-md-4">

    </div> <!-- #sidebar -->
  </div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer('site-map' ); ?>
