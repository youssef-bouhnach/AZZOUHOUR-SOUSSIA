<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Create an order from a cart array.
     *
     * $cart = [
     *   ['product_id' => 1, 'quantity' => 2],
     *   ['product_id' => 3, 'quantity' => 1],
     * ]
     */
    public function createFromCart(array $cart, array $shipping, int $userId): Order
    {
        return DB::transaction(function () use ($cart, $shipping, $userId) {

            $subtotal = 0;
            $items    = [];

            foreach ($cart as $cartItem) {
                $product  = Product::findOrFail($cartItem['product_id']);

                // Stock check
                if ($product->stock < $cartItem['quantity']) {
                    throw new \Exception("Stock insuffisant pour : {$product->name}");
                }

                $unitPrice    = (float) ($product->promo_price ?? $product->price);
                $lineSubtotal = $unitPrice * $cartItem['quantity'];
                $subtotal    += $lineSubtotal;

                $items[] = [
                    'product_id'    => $product->id,
                    'quantity'      => $cartItem['quantity'],
                    'product_name'  => $product->name,
                    'unit_price'    => $unitPrice,
                    'subtotal'      => $lineSubtotal,
                    'product_image' => $product->image,
                    'product_color' => $product->color,
                ];

                // Decrement stock
                $product->decrement('stock', $cartItem['quantity']);
            }

            // Create order
            $order = Order::create([
                'user_id'          => $userId,
                'subtotal'         => $subtotal,
                'total'            => $subtotal, // add shipping fees here if needed
                'currency'         => 'MAD',
                'status'           => 'pending',
                'payment_status'   => 'unpaid',
                'shipping_name'    => $shipping['name'],
                'shipping_phone'   => $shipping['phone'] ?? null,
                'shipping_address' => $shipping['address'],
                'shipping_city'    => $shipping['city'],
                'shipping_country' => $shipping['country'] ?? 'MA',
                'note'             => $shipping['notes'] ?? null,
            ]);

            // Insert items
            $order->items()->createMany($items);

            return $order;
        });
    }
}