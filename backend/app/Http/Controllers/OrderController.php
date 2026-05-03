<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // User: get own orders
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($orders);
    }

    // User: place an order
    public function store(Request $request)
    {
        $request->validate([
            'items'         => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'address'       => 'required|string',
            'notes'         => 'nullable|string',
        ]);

        $total = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);

            if ($product->stock < $item['quantity']) {
                return response()->json([
                    'message' => "Not enough stock for: {$product->name}"
                ], 422);
            }

            $lineTotal = $product->price * $item['quantity'];
            $total += $lineTotal;

            $orderItems[] = [
                'product_id' => $product->id,
                'quantity'   => $item['quantity'],
                'price'      => $product->price,
            ];

            // Decrease stock
            $product->decrement('stock', $item['quantity']);
        }

        $order = Order::create([
            'user_id' => Auth::id(),
            'total'   => $total,
            'address' => $request->address,
            'notes'   => $request->notes,
            'status'  => 'pending',
        ]);

        $order->items()->createMany($orderItems);

        return response()->json($order->load('items.product'), 201);
    }

    // User: get single order
    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('items.product'));
    }

    // Admin: get all orders
    public function adminIndex()
    {
        $orders = Order::with('items.product', 'user')
            ->latest()
            ->get();

        return response()->json($orders);
    }

    // Admin: update order status
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json($order);
    }
}
