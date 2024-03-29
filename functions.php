<?php
	
/****************************************************************/
/*                             Hooks                             /
/****************************************************************/

/* Enqueue scripts */
add_action('wp_enqueue_scripts', 'sl_enqueue_scripts');

/* Enqueue admin script */
add_action('admin_enqueue_scripts', 'sl_admin_scripts');

/* Remove actions */
add_action('init', 'sl_remove_actions');

/* Remove scripts */
add_action('wp_footer', 'sl_deregister_scripts');

/* Remove Comments Link */
add_action('wp_before_admin_bar_render', 'sl_manage_admin_bar');
add_action('admin_menu', 'sl_remove_menus');

/* Add Menus */
add_action('init', 'sl_custom_menu');

/* Dashboard Config */
add_action('wp_dashboard_setup', 'sl_dashboard_widget');

/* Register routes */
add_action('rest_api_init', 'sl_register_routes');

/* Custom Post Types and Taxonomies */
require_once ('custom-post-types.php');
require_once ('custom-taxonomies.php');

/* Custom Routes */
require_once ('custom-routes.php');

/****************************************************************/
/*                           Functions                           /
/****************************************************************/

function sl_enqueue_scripts() {
	wp_dequeue_style('wp-block-library');
	wp_enqueue_style('silverless-style', get_stylesheet_uri());
	
	wp_enqueue_script('react-script', get_stylesheet_directory_uri() . '/inc/js/react/compiled.js' , array(), '1.0', true);
	wp_enqueue_script('plugins-script', get_stylesheet_directory_uri() . '/inc/js/plugins/compiled.js' , array(), '1.0', true);
	wp_enqueue_script('silverless-script', get_stylesheet_directory_uri() . '/script.js' , array('react-script', 'plugins-script'), '1.0', true);
	
	$url = trailingslashit(home_url() );
	$path = trailingslashit(parse_url($url, PHP_URL_PATH));
	
	$dataREACT = array(
		'title' => get_bloginfo('name', 'display'),
		'path'  => $path,
		'URL'   => array(
		    'api'   => esc_url_raw(get_rest_url(null, '/routes/')),
		    'root'  => esc_url_raw($url),
		    'local' => get_stylesheet_directory_uri()
		)
	);
	
	wp_localize_script('silverless-script', 'SilverlessSettings', $dataREACT);
}



function sl_admin_scripts() {
	wp_enqueue_style('silverless-admin-style', get_stylesheet_directory_uri() . "/admin-settings/style-admin.css");
}

function sl_remove_actions() {
	remove_action('wp_head',             'rsd_link');                       // Really Simple Discovery service endpoint
	remove_action('wp_head',             'wp_generator');                   // Wordpress version
	remove_action('wp_head',             'feed_links', 2);                  // RSS feed links
	remove_action('wp_head',             'feed_links_extra', 3);            // Extra RSS feed links
	remove_action('wp_head',             'index_rel_link');                 // Link to index page
	remove_action('wp_head',             'wlwmanifest_link');               // Windows Live Writer manifest file
	remove_action('wp_head',             'start_post_rel_link', 10, 0);     // Random post link
	remove_action('wp_head',             'parent_post_rel_link', 10, 0);    // Parent post link
	remove_action('wp_head',             'adjacent_posts_rel_link', 10, 0); // Next and previous post links
	remove_action('wp_head',             'adjacent_posts_rel_link_wp_head', 10, 0);
	remove_action('wp_head',             'wp_shortlink_wp_head', 10, 0);
	remove_action('template_redirect',   'wp_shortlink_header', 11);
	remove_action('wp_head',             'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles',     'print_emoji_styles');
	remove_action('admin_print_styles',  'print_emoji_styles');    
	remove_filter('the_content_feed',    'wp_staticize_emoji');
	remove_filter('comment_text_rss',    'wp_staticize_emoji');  
	remove_filter('wp_mail',             'wp_staticize_emoji_for_email');
	
	add_filter('tiny_mce_plugins', 'sl_disable_emojis_tinymce');
	add_filter('show_admin_bar', '__return_false');
}

function sl_disable_emojis_tinymce($plugins) {
	if(is_array($plugins)) {
		return array_diff($plugins, array('wpemoji'));
	} else {
		return array();
	}
}

function sl_deregister_scripts() {
	wp_dequeue_script('wp-embed');
}

function sl_custom_menu() {
	register_nav_menus(array(
		'main-menu' => __( 'Main Menu' )
	));
	
	if(function_exists('acf_add_options_page')) {
		acf_add_options_page(array(
			'page_title' 	=> 'Theme Settings',
			'menu_title'	=> 'Theme Settings',
			'menu_slug' 	=> 'site-general-settings',
			'capability'	=> 'edit_posts',
			'redirect'		=> false
		));
	}
}

function sl_dashboard_widget() {
	global $wp_meta_boxes;
	wp_add_dashboard_widget('custom_help_widget', 'Silverless Support', 'sl_dashboard_help');
}

function sl_dashboard_help() {
	echo file_get_contents(__DIR__ . "/admin-settings/dashboard.html");
}

function sl_manage_admin_bar(){
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
}

function sl_remove_menus(){
	remove_menu_page( 'edit-comments.php' ); //Comments
}
