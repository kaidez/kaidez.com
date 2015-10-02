<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Kaidez Swiss
 */

get_header( "404" ); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found row">
				<header class="page-header col-md-6" style="margin: 0;">
					<h1 class="page-title">
					  <?php esc_html_e( '404 error not found', 'kaidez-swiss' ); ?>
					</h1>
					<img src="http://i.giphy.com/dB2svH5EJ646s.gif" />
				  <p class="404-pluto-text">
				    Can't help ya...I still have Pluto problems to deal with.
				  </p>
				</header><!-- .page-header -->
        
				<div class="page-content col-md-6">
					
					<p><?php esc_html_e( 'Would you like to search for something else using this searchbox?', 'kaidez-swiss' ); ?></p>

					<?php get_search_form(); ?>

          <p>Here are the last five posts</p>

          <ul>
          	<?php
	            $args = array( 'numberposts' => '5' );
	            $recent_posts = wp_get_recent_posts( $args );
	            foreach( $recent_posts as $recent ){
		            echo '<li><a href="' . get_permalink($recent["ID"]) . '">' .   $recent["post_title"].'</a></li>';
	            }
            ?>
          </ul>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
