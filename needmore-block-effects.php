<?php
/*
Plugin Name: Needmore Block Effects
Description: Adds configurable visual effects to blocks when scrolled into the viewport.
Version: 1.0
Author: Needmore Designs
*/

function nmbe_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'nmbe-block-editor',
        plugins_url( 'build/block-editor.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-edit-post', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/block-editor.js' )
    );

    wp_enqueue_style(
        'nmbe-styles-editor',
        plugins_url( 'styles.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'styles.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'nmbe_enqueue_block_editor_assets' );

function nmbe_enqueue_frontend_assets() {
    wp_enqueue_style(
        'nmbe-styles',
        plugins_url( 'styles.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'styles.css' )
    );

    wp_enqueue_script(
        'nmbe-frontend',
        plugins_url( 'build/frontend.js', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'nmbe_enqueue_frontend_assets' );
