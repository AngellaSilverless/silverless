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
    
    register_rest_route( 'routes', '/work/(?P<post_id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'page_single_work',
		'args' => [
			'id'
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
	return $page;
}

function page_single_work($request) {
	$id = urldecode($request->get_param('post_id'));
	$work = get_post($id);
	
	$work->acf = get_fields($work->ID);
	$work->permalink = get_permalink($work->ID);
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