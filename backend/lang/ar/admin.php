<?php

return [

    // Navigation groups
    'nav' => [
        'catalogue'     => 'الكتالوج',
        'ventes'        => 'المبيعات',
        'utilisateurs'  => 'المستخدمون',
    ],

    // Resources
    'categories' => [
        'label'        => 'فئة',
        'plural_label' => 'الفئات',
    ],
    'products' => [
        'label'        => 'منتج',
        'plural_label' => 'المنتجات',
    ],
    'orders' => [
        'label'        => 'طلب',
        'plural_label' => 'الطلبات',
    ],
    'cart_items' => [
        'label'        => 'سلة التسوق',
        'plural_label' => 'عناصر السلة',
    ],
    'users' => [
        'label'        => 'مستخدم',
        'plural_label' => 'المستخدمون',
    ],

    // Order fields
    'order' => [
        'id'             => '#',
        'client'         => 'العميل',
        'city'           => 'المدينة',
        'total'          => 'المجموع',
        'status'         => 'الحالة',
        'payment'        => 'الدفع',
        'date'           => 'التاريخ',
        'payment_method' => 'طريقة الدفع',
        'subtotal'       => 'المجموع الجزئي',
        'cmi_order_id'   => 'رقم طلب CMI',
        'notes'          => 'ملاحظات',
        'shipping_name'    => 'الاسم',
        'shipping_phone'   => 'الهاتف',
        'shipping_address' => 'العنوان',
        'shipping_city'    => 'المدينة',
        'shipping_country' => 'البلد',
        'section_info'     => 'معلومات الطلب',
        'section_shipping' => 'الشحن',
    ],

    // Order statuses
    'status' => [
        'pending'    => 'قيد الانتظار',
        'paid'       => 'مدفوع',
        'processing' => 'قيد المعالجة',
        'shipped'    => 'تم الشحن',
        'delivered'  => 'تم التسليم',
        'cancelled'  => 'ملغى',
    ],

    // Payment statuses
    'payment_status' => [
        'unpaid'   => 'غير مدفوع',
        'paid'     => 'مدفوع',
        'refunded' => 'مسترجع',
    ],

    // Cart item fields
    'cart' => [
        'client'     => 'العميل',
        'email'      => 'البريد الإلكتروني',
        'product'    => 'المنتج',
        'image'      => 'الصورة',
        'qty'        => 'الكمية',
        'unit_price' => 'سعر الوحدة',
        'subtotal'   => 'المجموع الجزئي',
        'added_at'   => 'أضيف في',
    ],

    // Order items
    'order_item' => [
        'image'      => 'الصورة',
        'product'    => 'المنتج',
        'color'      => 'اللون',
        'qty'        => 'الكمية',
        'unit_price' => 'سعر الوحدة',
        'subtotal'   => 'المجموع الجزئي',
    ],

    // Widgets
    'widgets' => [
        'latest_orders'   => 'آخر الطلبات',
        'last_5'          => 'آخر 5',
        'total_orders'    => 'إجمالي الطلبات',
        'all_orders'      => 'جميع الطلبات',
        'pending_orders'  => 'قيد الانتظار',
        'unpaid'          => 'غير مدفوعة',
        'revenue'         => 'الإيرادات',
        'revenue_desc'    => 'درهم مؤكد',
        'clients'         => 'العملاء',
        'registered'      => 'مسجلون',
        'carts'           => 'السلات',
        'abandoned'       => 'مهجورة',
    ],

    // Product fields
    'product' => [
        'name'        => 'الاسم',
        'image'       => 'الصورة',
        'price'       => 'السعر',
        'currency'    => 'العملة',
        'promo_price' => 'سعر العرض',
        'stock'       => 'المخزون',
        'status'      => 'الحالة',
        'is_featured' => 'مميز',
        'color'       => 'اللون',
        'category'    => 'الفئة',
        'origin'      => 'المنشأ',
        'is_indoor'   => 'داخلي',
    ],

    // Category fields
    'category' => [
        'name' => 'الاسم',
        'slug' => 'المعرف',
    ],

    // User fields
    'user' => [
        'name'       => 'الاسم',
        'email'      => 'البريد الإلكتروني',
        'verified'   => 'تم التحقق في',
        'role'       => 'الدور',
    ],
];
