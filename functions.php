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

/* Rewrite URL */
add_action('init', 'sl_rewrite_url');

/* Custom Post Types and Taxonomies */
require_once ('custom-post-types.php');
require_once ('custom-taxonomies.php');

/****************************************************************/
/*                           Functions                           /
/****************************************************************/

function sl_enqueue_scripts() {
	wp_dequeue_style('wp-block-library');
	wp_enqueue_style('silverless-style', get_stylesheet_uri());
	
	wp_enqueue_script('react',        'https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.production.min.js',         array(),        null);
	wp_enqueue_script('react-dom',    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.9.0/umd/react-dom.production.min.js', array('react'), null);
	wp_enqueue_script('react-router', 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.1/react-router-dom.min.js',   array('react'), null);
	
	
	wp_enqueue_script('silverless-script', get_stylesheet_directory_uri() . '/script.js' , array('react', 'react-dom', 'react-router'), '1.0', true);
	
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

/****************************************************************/
/*                             ROUTES                            /
/****************************************************************/


function sl_rewrite_url() {
	add_rewrite_rule('projects/([^/]+)/?$','index.php?post_type=projects&post_id=$matches[1]', 'top');
}

function sl_register_routes() {
	
	register_rest_route( 'routes', '/posts/', array(
        'methods'  => 'GET',
        'callback' => 'sl_return_posts'
    ));
    
    register_rest_route( 'routes', '/current-page/', array(
        'methods'  => 'POST',
        'callback' => 'sl_return_page'
    ));
    
    register_rest_route( 'routes', '/home/', array(
        'methods'  => 'GET',
        'callback' => 'sl_return_home_page'
    ));
    
    register_rest_route( 'routes', '/main-menu/', array(
        'methods'  => 'GET',
        'callback' => 'sl_menu_items'
    ));
    
    register_rest_route( 'routes', '/footer-info/', array(
        'methods'  => 'GET',
        'callback' => 'sl_footer_info'
    ));
    
    register_rest_route( 'routes', '/projects/', array(
        'methods'  => 'GET',
        'callback' => 'sl_return_projects'
    ));
    
    register_rest_route( 'routes', '/projects/(?P<post_id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'sl_return_single_project',
		'args' => [
			'id'
		]
    ));
}

function sl_menu_items() {
	$menuLocation = get_nav_menu_locations();
	$menuID       = $menuLocation["main-menu"];
	$menuItems    = wp_get_nav_menu_items($menuID);
	$menu = array();
	
	foreach($menuItems as $item) {
		array_push($menu, array(
			"title" => $item->title,
			"url"   => $item->url
		));
	}
	return $menu;
}

function sl_return_posts() {
    $posts = get_posts(array(
        'post_type'      => 'post',
        'posts_per_page' => -1, 
        'numberposts'    => -1
    ));
	
	foreach ($posts as $key => $post) {
		$posts[$key]->acf = get_fields($post->ID);
		$posts[$key]->permalink = get_permalink($post->ID);
	}
    return $posts;
}

function sl_return_page($request_data) {
	$data = $request_data->get_body();
	$page = json_decode($data);
	$response = "";
	
	if($page == "home") {
		$response = get_option('page_on_front');
	}
	
    return [$response];
}

function sl_return_home_page() {
	$id = get_option("page_on_front");
	$page = get_post($id);
	
	$page->acf = get_fields($id);
	$page->permalink = get_permalink($id);
	$page->projects = sl_return_projects(3);
	return $page;
}

function sl_footer_info() {
	$options = get_fields('options');
	return $options;
}

function sl_return_projects($count = -1) {
    $posts = get_posts(array(
        'post_type'      => 'projects',
        'posts_per_page' => $count, 
        'numberposts'    => $count
    ));
	
	foreach ($posts as $key => $post) {
		$posts[$key]->acf = get_fields($post->ID);
		$posts[$key]->permalink = get_permalink($post->ID);
		$posts[$key]->taxonomies = array(
			'sector' => get_the_terms($post->ID, 'sector'),
			'type'   => get_the_terms($post->ID, 'type')
		);
	}
    return $posts;
}

function sl_return_single_project($request) {
	$id = urldecode($request->get_param('post_id'));
	$project = get_post($id);
	
	$project->acf = get_fields($project->ID);
	$project->permalink = get_permalink($project->ID);
	return $project;
}