<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'ka1d3z');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'DAI-_<tH4a5[z28V,V-;$p9. c5k{SlIDAw!lW7ECy&-c.uQ4yOL{+O5r4Md{v_p');
define('SECURE_AUTH_KEY',  '[|/r;|#PTG3DLB(qym^%rr;7t<nIY%%j;^OQSViH:eH-)[KxN+KSVP<fUGsEFhJ<');
define('LOGGED_IN_KEY',    'PCv O8<V,+M1odBe.1Kx gg*`w/Uvhd5yiMTJFbFhA@-$,(}=|LfjDb]rN.h]Sle');
define('NONCE_KEY',        'cS,X# OK@,wPX .m!$|<Q5d8|Z!+0RGL_1S>uZI~0+t:2n7b3Ih?Yzr2Na0sxr9<');
define('AUTH_SALT',        '#9&f<,1.RwS+!7Tm0A,+uh[|<~z2eMrRHamm<LX-huzx{yc`L>m{OBk6=RF<CZYb');
define('SECURE_AUTH_SALT', 'AMy!h,/9-x#!xs%dfZeb-W>`n9p)UAy,qL/D<-LkifxIw`wf@ %tNWz#8?@-(n1#');
define('LOGGED_IN_SALT',   'N?+Z*L-/(oY/P]+=MBf#%^Y4&:)dF8R;)M>vW=2w5.G@4MBMaJJF@}Wj.6M4n .X');
define('NONCE_SALT',       'J `,zsB.GHGDzvLh*.kQn0bYTe*2giC6/mG/o`Mfh( P+T?o;m+e!]+h-^/Wlg1b');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_n1k0_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
