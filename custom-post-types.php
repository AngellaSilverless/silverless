<?php
/*
// ========= Custom Post Types - Projects ============
*/
add_action( 'init', 'custom_post_type_projects', 0 );

// ====== Projects
function custom_post_type_projects() {
    $labels = array(
        'name'                => _x( 'Projects', 'Post Type General Name',  'silverless' ),
        'singular_name'       => _x( 'Project',  'Post Type Singular Name', 'silverless' ),
        'menu_name'           => __( 'Projects',           'silverless' ),
        'parent_item_colon'   => __( 'Parent Project',     'silverless' ),
        'all_items'           => __( 'All Projects',       'silverless' ),
        'view_item'           => __( 'View Project',       'silverless' ),
        'add_new_item'        => __( 'Add New Project',    'silverless' ),
        'add_new'             => __( 'Add Project',        'silverless' ),
        'edit_item'           => __( 'Edit Project',       'silverless' ),
        'update_item'         => __( 'Update Project',     'silverless' ),
        'search_items'        => __( 'Search Project',     'silverless' ),
        'not_found'           => __( 'Not Found',          'silverless' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'silverless' )
    );
    
    $args = array(
        'label'               => __( 'projects', 'silverless' ),
        'description'         => __( 'Projects', 'silverless' ),
        'labels'              => $labels,
        'supports'            => array( 'title', 'taxonomies', 'thumbnail' ),
        'menu_icon'           => 'dashicons-awards',
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_rest'        => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => false,
        'publicly_queryable'  => true
    );
    
    register_post_type( 'projects', $args );
}