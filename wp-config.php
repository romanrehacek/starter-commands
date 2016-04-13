<?php

// BEGIN iThemes Security - Do not modify or remove this line
// iThemes Security Config Details: 2
define( 'DISALLOW_FILE_EDIT', true ); // Disable File Editor - Security > Settings > WordPress Tweaks > File Editor
// END iThemes Security - Do not modify or remove this line

/**
 * Local configuration information.
 *
 * If you are working in a local/desktop development environment and want to
 * keep your config separate, we recommend using a 'wp-config-local.php' (rename wp-config-local-sample.php) file,
 * which you should also make sure you .gitignore.
 */
if (file_exists(dirname(__FILE__) . '/wp-config-local.php')):
    # IMPORTANT: ensure your local config does not include wp-settings.php
    require_once(dirname(__FILE__) . '/wp-config-local.php');

else:
/**
 * Production configuration information.
 */

/**
     * The base configuration for WordPress
     *
     * The wp-config.php creation script uses this file during the
     * installation. You don't have to use the web site, you can
     * copy this file to "wp-config.php" and fill in the values.
     *
     * This file contains the following configurations:
     *
     * * MySQL settings
     * * Secret keys
     * * Database table prefix
     * * ABSPATH
     *
     * @link https://codex.wordpress.org/Editing_wp-config.php
     *
     * @package WordPress
     */

    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', '');

    /** MySQL database username */
    define('DB_USER', '');

    /** MySQL database password */
    define('DB_PASSWORD', '');

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
    define('AUTH_KEY',         '/ugyXZ%D)xj_J2|Vf=kO[DGm.txudJya4Fzn|bR!y0V7pMpvwz9i2bvYvS&y{dzS');
    define('SECURE_AUTH_KEY',  'IY5zZi/=9TS+;7go:%xV&Sga/=z+{YDwi,V8eTS@?.Z}45eWIBem*km^,L2_,;ge');
    define('LOGGED_IN_KEY',    ']2!;hr5goq.&)aBpBFChQO=L[Nv-FB[s|Zj?%#e||b9!b.]DBpL^4wpQ9Kya!ls3');
    define('NONCE_KEY',        '`C1Mc6D<7?59>T w9Laz7q%D0aDzmW{-+Qv]iY)%WMMR;L#1-$[Q;2*R3j^$65YR');
    define('AUTH_SALT',        'i*FqDm<[ZFEQ^fd0(|d~T-pj::+YYJb6pH_TT^Fei`V[$ZNVQQt,yIfqA|$+A^RP');
    define('SECURE_AUTH_SALT', 'kB>4eA9n.q !%Mus{Non-tEijf<J_L+<!*Y%ft}cJ}#mB,EqJTDr!7A-@urW5cQE');
    define('LOGGED_IN_SALT',   '-ag]t.}3[4%n0hE,07myBMgb6yYyBa2jb9/v6]+SS16e8. u4mT;YZ<r=RQlRevT');
    define('NONCE_SALT',       '#s#Gg0+YnR2)N2cd#V,zh{Q;F:c_/yD~RdeX4}i^H`Z(z2= j(yq9$hb8k+6JoD[');

    /**#@-*/

    /**
     * WordPress Database Table prefix.
     *
     * You can have multiple installations in one database if you give each
     * a unique prefix. Only numbers, letters, and underscores please!
     */
    $table_prefix  = 'f1jwuh449p_';

    /**
     * For developers: WordPress debugging mode.
     *
     * Change this to true to enable the display of notices during development.
     * It is strongly recommended that plugin and theme developers use WP_DEBUG
     * in their development environments.
     *
     * For information on other constants that can be used for debugging,
     * visit the Codex.
     *
     * @link https://codex.wordpress.org/Debugging_in_WordPress
     */
    define('WP_DEBUG', false);

    /* That's all, stop editing! Happy blogging. */

    /** Absolute path to the WordPress directory. */
    if ( !defined('ABSPATH') )
        define('ABSPATH', dirname(__FILE__) . '/');

    /** Sets up WordPress vars and included files. */
    require_once(ABSPATH . 'wp-settings.php');
endif;
