<?php
/**
 * The template for displaying the customized "Tutorial" category 
 * page.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kaidez Swiss
 */

get_header( "categories" ); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
					the_archive_title( '<h1 class="page-title">', '</h1>' );
				?>
        <div class="taxonomy-description">
          "Code Tips" posts discuss tips and tricks for a certain web development topic. Unlike the "<a href="/tutorials/">Tutorials</a>" posts which teach from the ground up, code Tips assume that the reader has a little better than basic understanding of the topics discussed.
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
