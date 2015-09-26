<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Kaidez Swiss
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name=viewport content="width=device-width, initial-scale=1">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

  <?php wp_head(); ?>
  <script src="/wp-content/themes/kaidez-swiss/js/libs/modernizr.js"></script>
</head>

<body <?php body_class(); ?> itemscope="itemscope" itemtype="http://schema.org/WebPage">
  <div id="page" class="hfeed site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'kaidez-swiss' ); ?></a>

    <header id="masthead" class="site-header" role="banner" itemscope="itemscope" itemtype="http://schema.org/Organization">
      <div class="site-branding" id="branding" style="z-index: 2;">
        <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="home-link" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
        <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
        <button type="button" id="mobile-menu-button" class="mobile-menu btn-default">
          <span class="mobile-menu-bar"></span>
          <span class="mobile-menu-bar"></span>
          <span class="mobile-menu-bar"></span>
        </button> <!-- .mobile-menu -->
        <div id="mobile-search-button" class="mobile-search">
          <i class="fa fa-search fa-lg btn-mobile-search"></i>
        </div>
      </div><!-- .site-branding -->

      <nav id="site-navigation" class="main-navigation" role="navigation">
        <h3 class="main-navigation-header">Main Menu</h3>
        <div class="menu-main-navigation-container">
          <ul class="menu">
            <li class="menu-item">
              <a href="/blog" class="nav-links">blog</a>
            </li>
            <li class="menu-item">
              <a href="/articles" class="nav-links">articles</a>
            </li>
            <li class="menu-item">
              <a href="/lynda-kaidez/" class="nav-links">kaidez on lynda</a>
            </li>
            <li class="menu-item">
              <a href="/ajax-tutorial/" class="nav-links">ajax tutorial</a>
            </li>
          </ul>
        </div>
      </nav><!-- #site-navigation -->

      <form method="get" id="searchform" class="searchform-class" action="<?php bloginfo('home'); ?>/">
        <div class="blog-search">
          <input id="s" class="header-search-field" name="s" type="text" size="18" value="<?php echo wp_specialchars($s, 1); ?>" />
          <button class="header-search-submit" type="submit" id="searchsubmit" />
            <i class="fa fa-search fa-lg"></i>
          </button>
        </div><!-- .blog-search -->
      </form><!-- #searchform -->

    </header><!-- #masthead -->

    <div id="content" class="site-content">
