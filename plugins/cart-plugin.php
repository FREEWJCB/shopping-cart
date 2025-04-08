<?php
    /*
    Plugin Name: Next.js Cart Plugin
    Description: Muestra un carrito de compras construido con Next.js dentro de WordPress.
    Version: 1.0
    Author: Tu Nombre
    */

    function nextjs_cart_shortcode() {
        $iframe_url = "http://127.0.0.1:3000"; // Cambia esto por el URL real del frontend Next.js
        return "<iframe src='$iframe_url' width='100%' height='600' style='border:none;'></iframe>";
    }

    add_shortcode('nextjs_cart', 'nextjs_cart_shortcode');
?>