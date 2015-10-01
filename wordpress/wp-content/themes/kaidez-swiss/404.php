<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Kaidez Swiss
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found row">
				<header class="page-header col-md-6">
					<h1 class="page-title">
					  <?php esc_html_e( '404 error not found', 'kaidez-swiss' ); ?>
					</h1>
					<iframe src="//giphy.com/embed/dB2svH5EJ646s" width="480" height="362" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
				  <p style="font-size: 32px; font-weight: 500; margin-top: 0; margin-bottom: 0;">
				    Can't help ya...I still have Pluto problems to deal with.
				  </p>
				</header><!-- .page-header -->
        
				<div class="page-content col-md-6">
					
					<p><?php esc_html_e( 'Would you like to search for something else using this searchbox?', 'kaidez-swiss' ); ?></p>

					<?php get_search_form(); ?>

					<?php the_widget( 'WP_Widget_Recent_Posts' ); ?>

					<?php if ( kaidez_swiss_categorized_blog() ) : // Only show the widget if site has multiple categories. ?>
					<div class="widget widget_categories">
						<h2 class="widget-title"><?php esc_html_e( 'Most Used Categories', 'kaidez-swiss' ); ?></h2>
						<ul>
						<?php
							wp_list_categories( array(
								'orderby'    => 'count',
								'order'      => 'DESC',
								'show_count' => 1,
								'title_li'   => '',
								'number'     => 10,
							) );
						?>
						</ul>
					</div><!-- .widget -->
					<?php endif; ?>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
