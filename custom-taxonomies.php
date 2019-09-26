<?php
/*
// ========= Custom Taxonomies - Sector, Type ============
*/
add_action( 'init', 'register_custom_taxonomies' );

function register_custom_taxonomies() {
	taxonomy_sector();
	taxonomy_type();
}

// ====== Sector
function taxonomy_sector() {
 
    $labels = array(
        'name'              => _x( 'Sector', 'taxonomy general name' ),
        'singular_name'     => _x( 'Sector', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Sectors'  ),
        'all_items'         => __( 'All Sectors'     ),
        'parent_item'       => __( 'Parent Sector'   ),
        'parent_item_colon' => __( 'Parent Sector:'  ),
        'edit_item'         => __( 'Edit Sector'     ), 
        'update_item'       => __( 'Update Sector'   ),
        'add_new_item'      => __( 'Add New Sector'  ),
        'new_item_name'     => __( 'New Sector Name' ),
        'menu_name'         => __( 'Sectors'         )
    );     
    
    register_taxonomy( 'sector', array( 'projects' ), array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'sector', 'hierarchical' => true )
    ));
}

// ====== Type
function taxonomy_type() {
 
    $labels = array(
        'name'              => _x( 'Type', 'taxonomy general name' ),
        'singular_name'     => _x( 'Type', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Types' ),
        'all_items'         => __( 'All Types'    ),
        'parent_item'       => __( 'Parent Type'  ),
        'parent_item_colon' => __( 'Parent Type:' ),
        'edit_item'         => __( 'Edit Type'    ), 
        'update_item'       => __( 'Update Type'  ),
        'add_new_item'      => __( 'Add New Type' ),
        'new_item_name'     => __( 'New Type'     ),
        'menu_name'         => __( 'Types'        )
    );     
    
    register_taxonomy( 'type', array( 'projects' ), array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'type', 'hierarchical' => false )
    ));
}