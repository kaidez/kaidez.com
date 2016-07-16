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
			<header>
			  <h1 class="page-title">
				  <?php esc_html_e( '404 error not found', 'kaidez-swiss' ); ?>
				</h1>
			</header>
			<div class="page-header col-md-6" style="margin: 0;">

			  <img src="http://i.giphy.com/dB2svH5EJ646s.gif" />
				<p class="pluto-text">
				  Can't help ya...I still have Pluto problems to deal with.
				</p>
				<p class="searchbox"><?php esc_html_e( 'Would you like to search for something else using this searchbox?', 'kaidez-swiss' ); ?></p>

					<?php get_search_form(); ?>

					<p class="sitemap">You can also <a href="/site-map/" itemprop="url">view the sitemap</a>.</p>
				</div><!-- .page-div -->

				<div class="page-content col-md-6">

          <!-- Last five posts -->
          <p>Read the last five posts</p>

          <ul>
          	<?php
	            $args = array( 'numberposts' => '5' );
	            $recent_posts = wp_get_recent_posts( $args );
	            foreach( $recent_posts as $recent ){
		            echo '<li><a href="' . get_permalink($recent["ID"]) . '" itemprop="url">' .   $recent["post_title"].'</a></li>';
	            }
            ?>
          </ul>

          <!-- Must-read-->
          <p>These blog posts are considered "the best of kaidez.com":</p>

          <ul>
          	<li>
          	  <a href="/requirejs-wordpress/" itemprop="url">Using RequireJS In WordPress</a>
          	</li>
          	<li>
          	  <a href="/click-to-tweet-link/" itemprop="url">Click to Tweet Link Created Dynamically With JS</a>
          	</li>
          	<li>
          	  <a href="/javascript-closures-tutorial/" itemprop="url">TUTORIAL: What NYC Subways Can Teach Us About JavaScript Closures</a>
          	</li>
          	<li>
          	  <a href="/load-data-attributes-mouseclicks/" itemprop="url">TUTORIAL: Load data attributes with Mouse Clicks</a>
          	</li>
          	<li>
          	  <a href="/media-queries-important/" itemprop="url">Media Queries Are Important</a>
          	</li>
          </ul>
				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
