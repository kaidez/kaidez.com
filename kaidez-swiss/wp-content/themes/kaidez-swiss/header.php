<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package kaidez-swiss
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> itemscope="itemscope" itemtype="http://schema.org/WebPage">
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'kaidez-swiss' ); ?></a>

	<header id="masthead" class="site-header" role="banner" itemscope="itemscope" itemtype="http://schema.org/Organization">
		<div class="site-branding">
			<h1 class="site-title" itemprop="name"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="home-link" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="main-navigation" role="navigation" itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
      <h3 class="menu-header">Main Menu</h3>
			<button class="menu-toggle" aria-controls="menu" aria-expanded="false"><?php _e( 'Primary Menu', 'kaidez-swiss' ); ?></button>
			
      <div id="menu-main" class="menu" aria-expanded="false">
        <ul class="menu-item-container">
        <li class="menu-item">
          <a href="/blog/" alt="read the kaidez blog">blog</a></span>
        </li>
        <li class="menu-item">
          <a href="/articles/" alt="read articles written by kaidez">articles</a></span>
        </li></ul>
        <ul class="menu-item-container">
        <li class="menu-item">
          <a href="/ajax-tutorial/" alt="read the AJAX beginner's tutorial written by kaidez">ajax tutorial</a></span>
        </li>
        <li class="menu-item">
          <a href="/lynda-kaidez/" alt="read the lynda.com courses developed by kaidez">kaidez on lynda</a></span>
        </li></ul>
      </div> <!-- #menu-main -->

		</nav><!-- #site-navigation -->

	  <form method="get" id="searchform" class="searchform-class" action="<?php bloginfo('home'); ?>/">
	    <div class="blog-search">
		    <input type="text" class="header-search-field" value="<?php echo wp_specialchars($s, 1); ?>" name="s" id="s" />
		    <button type="submit" class="btn btn-default header-search-submit footer-button">Submit</button>
	     </div>
	  </form><!-- #searchform -->

	</header><!-- #masthead -->

	<div id="content" class="site-content">
