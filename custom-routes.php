<?php
	
/****************************************************************/
/*                        REGISTER ROUTES                        /
/****************************************************************/

function sl_register_routes() {
	
	// Menus, Header, Footer
    
    register_rest_route( 'routes', '/main-menu/', array(
        'methods'  => 'GET',
        'callback' => 'main_menu'
    ));
    
    register_rest_route( 'routes', '/footer-info/', array(
        'methods'  => 'GET',
        'callback' => 'footer_info'
    ));
    
    // Pages
    
    register_rest_route( 'routes', '/home/', array(
        'methods'  => 'GET',
        'callback' => 'page_home'
    ));
    
    register_rest_route( 'routes', '/work/', array(
        'methods'  => 'GET',
        'callback' => 'page_work'
    ));
    
    register_rest_route( 'routes', '/work/(?P<slug>[-\w]+)', array(
        'methods'  => 'GET',
        'callback' => 'page_single_work',
		'args' => [
			'slug'
		]
    ));
}


/****************************************************************/
/*                     MENUS, HEADER, FOOTER                     /
/****************************************************************/

function main_menu() {
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

function footer_info() {
	$options = get_fields('options');
	return $options;
}


/****************************************************************/
/*                             PAGES                             /
/****************************************************************/

function page_home() {
	$id = get_option("page_on_front");
	$page = get_post($id);
	
	$page->acf = get_fields($id);
	$page->permalink = get_permalink($id);
	$page->works = get_cpt_work(3);
	return $page;
}

function page_work() {
	$id = get_page_by_path("work");
	$page = get_post($id);
	
	$page->acf = get_fields($id);
	$page->permalink = get_permalink($id);
	$page->works = get_cpt_work();
	
	$types   = array();
	$sectors = array();
	
	foreach(get_terms(array('taxonomy' => 'type', 'hide_empty' => false)) as $type)
		array_push($types, $type);
	
	foreach(get_terms(array('taxonomy' => 'sector', 'hide_empty' => false)) as $sector)
		array_push($sectors, $sector);
	
	$page->taxonomies = array(
		'type'   => $types,
		'sector' => $sectors
	);
	return $page;
}

function page_single_work($request) {
	$post_slug = urldecode($request->get_param('slug'));
	
	$work = get_posts(array(
		'name'        => $post_slug,
		'post_type'   => 'work',
		'post_status' => 'publish'
	));
	
	if(sizeof($work) == 0)
		return false;
		
	$work = $work[0];
	
	$work->acf = get_fields($work->ID);
	$work->permalink = get_permalink($work->ID);
	$work->taxonomies = array(
		'sector' => get_the_terms($work->ID, 'sector'),
		'type'   => get_the_terms($work->ID, 'type')
	);
	return $work;
}


/****************************************************************/
/*                        LOCAL FUNCTIONS                        /
/****************************************************************/

function get_cpt_work($count = -1) {
    $posts = get_posts(array(
        'post_type'      => 'work',
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