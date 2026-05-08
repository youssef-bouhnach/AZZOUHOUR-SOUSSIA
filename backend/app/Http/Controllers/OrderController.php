<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(private OrderService $orderService) {}

    public function store(Request $request)
    {
        $request->validate([
            'cart'                  => 'required|array|min:1',
            'cart.*.product_id'     => 'required|exists:products,id',
            'cart.*.quantity'       => 'required|integer|min:1',
            'shipping.name'         => 'required|string',
            'shipping.phone'        => 'nullable|string',
            'shipping.address'      => 'required|string',
            'shipping.city'         => 'required|string',
        ]);

        try {
            $order = $this->orderService->createFromCart(
                cart:     $request->cart,
                shipping: $request->shipping,
                userId:   $request->user()->id,
            );

            return response()->json([
                'message'  => 'Commande créée',
                'order_id' => $order->id,
                'total'    => $order->total,
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('items')
            ->latest()
            ->get();

        return response()->json($orders);
    }

    public function show(Request $request, int $id)
    {
        $order = $request->user()
            ->orders()
            ->with('items.product')
            ->findOrFail($id);

        return response()->json($order);
    }
}