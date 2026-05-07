<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/cart — fetch current user's cart with product details
    public function index(Request $request)
    {
        $items = $request->user()
            ->cartItems()
            ->with('product')
            ->get()
            ->map(fn($item) => [
                'id'            => $item->id,
                'product_id'    => $item->product_id,
                'quantity'      => $item->quantity,
                'name'          => $item->product->name,
                'image'         => $item->product->image,
                'color'         => $item->product->color,
                'unit_price'    => $item->product->promo_price ?? $item->product->price,
                'subtotal'      => ($item->product->promo_price ?? $item->product->price) * $item->quantity,
                'stock'         => $item->product->stock,
            ]);

        return response()->json([
            'items' => $items,
            'total' => $items->sum('subtotal'),
            'count' => $items->sum('quantity'),
        ]);
    }

    // POST /api/cart — add or increment a product
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1',
        ]);

        $product  = Product::findOrFail($request->product_id);
        $quantity = $request->quantity ?? 1;

        // Check stock before adding
        if ($product->stock < $quantity) {
            return response()->json([
                'message' => 'Stock insuffisant'
            ], 422);
        }

        // If item already exists → increment quantity, otherwise create it
        $item = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $newQty = $item->quantity + $quantity;

            if ($product->stock < $newQty) {
                return response()->json([
                    'message' => 'Stock insuffisant'
                ], 422);
            }

            $item->update(['quantity' => $newQty]);
        } else {
            $item = CartItem::create([
                'user_id'    => $request->user()->id,
                'product_id' => $request->product_id,
                'quantity'   => $quantity,
            ]);
        }

        return response()->json([
            'message' => 'Produit ajouté au panier',
            'item'    => $item,
        ], 201);
    }

    // PATCH /api/cart/{productId} — set exact quantity
    public function update(Request $request, int $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($productId);

        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Stock insuffisant'
            ], 422);
        }

        $item = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->firstOrFail();

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Quantité mise à jour', 'item' => $item]);
    }

    // DELETE /api/cart/{productId} — remove one item
    public function destroy(Request $request, int $productId)
    {
        CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Produit retiré du panier']);
    }

    // DELETE /api/cart — clear entire cart
    public function clear(Request $request)
    {
        $request->user()->cartItems()->delete();

        return response()->json(['message' => 'Panier vidé']);
    }
}
