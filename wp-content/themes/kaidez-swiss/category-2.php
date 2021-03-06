<?php
/**
 * The template for displaying the customized "Personal" category 
 * page.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kaidez Swiss
 */

get_header( "categories" ); ?>

	<div id="primary" class="content-area row">
		<main id="main" class="site-main col-md-8" role="main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
					the_archive_title( '<h1 class="page-title">', '</h1>' );
				?>
        <div class="taxonomy-description">
          "Code Tips" posts on kaidez.com discuss tips for certain web development topics. The reader should have a little better than basic knowledge of the topics.
        </div><!-- .taxonomy-description -->
        <div class="taxonomy-description">
          While "Code Tips" posts are geared towards readers with some level of knowledge on a subject, these posts usually contain lots of links that new developers may find helpful.
        </div><!-- .taxonomy-description -->
			</header><!-- .page-header -->

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php

					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
					get_template_part( 'template-parts/content', get_post_format() );
				?>

			<?php endwhile; ?>

			<?php the_posts_navigation(); ?>

		<?php else : ?>

			<?php get_template_part( 'template-parts/content', 'none' ); ?>

		<?php endif; ?>

		</main><!-- #main -->
    <div id="sidebar" class="sidebar-class col-md-4">

    </div> <!-- #sidebar -->
	</div><!-- #primary -->

  <!-- Start pagination code -->
  <?php if(function_exists('wp_paginate')) {
    wp_paginate();
  }
  else {
    kaidez_swiss_content_nav( 'nav-below' );
  }
  ?> 
  <!-- End pagination code -->
  
<?php get_sidebar(); ?>
<?php get_footer( "categories" ); ?>
