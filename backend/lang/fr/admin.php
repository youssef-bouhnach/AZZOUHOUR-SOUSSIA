<?php

return [

    // Navigation groups
    'nav' => [
        'catalogue'     => 'Catalogue',
        'ventes'        => 'Ventes',
        'utilisateurs'  => 'Utilisateurs',
    ],

    // Resources
    'categories' => [
        'label'        => 'Catégorie',
        'plural_label' => 'Catégories',
    ],
    'products' => [
        'label'        => 'Produit',
        'plural_label' => 'Produits',
    ],
    'orders' => [
        'label'        => 'Commande',
        'plural_label' => 'Commandes',
    ],
    'cart_items' => [
        'label'        => 'Panier',
        'plural_label' => 'Cart Items',
    ],
    'users' => [
        'label'        => 'Utilisateur',
        'plural_label' => 'Utilisateurs',
    ],

    // Order fields
    'order' => [
        'id'             => '#',
        'client'         => 'Client',
        'city'           => 'Ville',
        'total'          => 'Total',
        'status'         => 'Statut',
        'payment'        => 'Paiement',
        'date'           => 'Date',
        'payment_method' => 'Méthode de paiement',
        'subtotal'       => 'Sous-total',
        'cmi_order_id'   => 'CMI Order ID',
        'notes'          => 'Notes',
        'shipping_name'    => 'Nom',
        'shipping_phone'   => 'Téléphone',
        'shipping_address' => 'Adresse',
        'shipping_city'    => 'Ville',
        'shipping_country' => 'Pays',
        'section_info'     => 'Informations commande',
        'section_shipping' => 'Livraison',
    ],

    // Order statuses
    'status' => [
        'pending'    => 'En attente',
        'paid'       => 'Payé',
        'processing' => 'En traitement',
        'shipped'    => 'Expédié',
        'delivered'  => 'Livré',
        'cancelled'  => 'Annulé',
    ],

    // Payment statuses
    'payment_status' => [
        'unpaid'   => 'Non payé',
        'paid'     => 'Payé',
        'refunded' => 'Remboursé',
    ],

    // Cart item fields
    'cart' => [
        'client'     => 'Client',
        'email'      => 'Email',
        'product'    => 'Produit',
        'image'      => 'Image',
        'qty'        => 'Qté',
        'unit_price' => 'Prix unitaire',
        'subtotal'   => 'Sous-total',
        'added_at'   => 'Ajouté le',
    ],

    // Order items
    'order_item' => [
        'image'      => 'Image',
        'product'    => 'Produit',
        'color'      => 'Couleur',
        'qty'        => 'Qté',
        'unit_price' => 'Prix unitaire',
        'subtotal'   => 'Sous-total',
    ],

    // Widgets
    'widgets' => [
        'latest_orders'   => 'Dernières commandes',
        'last_5'          => '5 dernières',
        'total_orders'    => 'Total commandes',
        'all_orders'      => 'Toutes commandes',
        'pending_orders'  => 'En attente',
        'unpaid'          => 'Non payées',
        'revenue'         => 'Revenus',
        'revenue_desc'    => 'MAD confirmés',
        'clients'         => 'Clients',
        'registered'      => 'Inscrits',
        'carts'           => 'Paniers',
        'abandoned'       => 'Abandonnés',
    ],

    // Product fields
    'product' => [
        'name'        => 'Nom',
        'image'       => 'Image',
        'price'       => 'Prix',
        'currency'    => 'Devise',
        'promo_price' => 'Prix promo',
        'stock'       => 'Stock',
        'status'      => 'Statut',
        'is_featured' => 'En vedette',
        'color'       => 'Couleur',
        'category'    => 'Catégorie',
        'origin'      => 'Origine',
        'is_indoor'   => 'Intérieur',
    ],

    // Category fields
    'category' => [
        'name' => 'Nom',
        'slug' => 'Slug',
    ],

    // User fields
    'user' => [
        'name'       => 'Nom',
        'email'      => 'Email',
        'verified'   => 'Vérifié le',
        'role'       => 'Rôle',
    ],
];
