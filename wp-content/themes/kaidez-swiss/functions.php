<?php
/**
 * Kaidez Swiss functions and definitions
 *
 * @package Kaidez Swiss
 */

if ( ! function_exists( 'kaidez_swiss_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function kaidez_swiss_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Kaidez Swiss, use a find and replace
	 * to change 'kaidez-swiss' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'kaidez-swiss', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'kaidez-swiss' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'kaidez_swiss_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // kaidez_swiss_setup
add_action( 'after_setup_theme', 'kaidez_swiss_setup' );

// Remove the generator meta tag
remove_action('wp_head', 'wp_generator');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function kaidez_swiss_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'kaidez_swiss_content_width', 640 );
}
add_action( 'after_setup_theme', 'kaidez_swiss_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function kaidez_swiss_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'kaidez-swiss' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'kaidez_swiss_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function kaidez_swiss_scripts() {
	wp_enqueue_style( 'kaidez-swiss-style', get_stylesheet_uri() );

	wp_dequeue_script( 'kaidez-swiss-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_dequeue_script( 'kaidez-swiss-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_dequeue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'kaidez_swiss_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );






function qod_remove_extra_data( $data, $post, $context ) {
  // We only want to modify the 'view' context, for reading posts
  if ( $context !== 'view' || is_wp_error( $data ) ) {
    return $data;
  }
  
  // Here, we unset any data we don't want to see on the front end:
  unset( $data['author'] );
  unset( $data['status'] );
  unset( $data['content'] );
  unset( $data['sticky'] );
  unset( $data['modified'] );
  unset( $data['format'] );
  unset( $data['type'] );
  unset( $data['parent'] );
  unset( $data['slug'] );
  unset( $data['guid'] );
  unset( $data['meta'] );
  unset( $data['comment_status'] );
  unset( $data['ping_status'] );
  unset( $data['date_tz'] );
  unset( $data['menu_order'] );
  unset( $data['date_gmt'] );
  unset( $data['modified_tz'] );
  unset( $data['modified_gmt'] );

  return $data;
}

add_filter( 'json_prepare_post', 'qod_remove_extra_data', 1, 3 );
