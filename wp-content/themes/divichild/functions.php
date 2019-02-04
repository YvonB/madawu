<?php
/**
** activation theme
**/
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
 wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}

function my_theme_scripts_function() {
  wp_enqueue_script( 'custom_script', get_stylesheet_directory_uri() . '/js/custom-script.js', array( 'jquery' ));
}
add_action('wp_enqueue_scripts','my_theme_scripts_function');

