<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kaidez Swiss
 */

get_header(); ?>

<div id="primary" class="content-area">
  <main id="main" class="site-main" role="main" itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">

    <section id="all-articles" class="all-articles-class">

      <h2 class="all-article-header">Read articles</h2>
      <div id="top-articlerow" class="row">
        <div id="newest-article" class="col-md-8 center-new-article"></div>
        <div class="col-md-4 front-page-ad-column">
          <div class="ad-container">
            <div id="ad-spot-one" class="single-homepage-ad"></div>
            <div id="ad-spot-two" class="single-homepage-ad"></div>    
          </div>
        </div>
      </div>
      <div id="other-articles" class="other-articles-class"></div>

    </section><!-- #all-articles -->

  </main><!-- #main -->
</div><!-- #primary -->

  <?php get_sidebar(); ?>
  <?php get_footer( 'home-page' ); ?>