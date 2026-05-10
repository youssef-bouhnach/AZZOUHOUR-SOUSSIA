<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\Variants;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/cart — fetch current user's cart with product + variant details
    public function index(Request $request)
    {
        $items = $request->user()
            ->cartItems()
            ->with(['product', 'variant'])
            ->get()
            ->map(function ($item) {
                // Price: variant price takes priority over product price
                $unitPrice = $item->variant
                    ? $item->variant->price
                    : ($item->product->promo_price ?? $item->product->price);

                // Stock: variant stock takes priority
                $stock = $item->variant
                    ? $item->variant->stock
                    : $item->product->stock;

                // Build a human-readable variant label
                $variantLabel = null;
                if ($item->variant) {
                    $parts = [];
                    if ($item->variant->size)     $parts[] = $item->variant->size;
                    if ($item->variant->diameter) $parts[] = 'Ø ' . $item->variant->diameter . ' cm';
                    if ($item->variant->height)   $parts[] = 'H ' . $item->variant->height . ' cm';
                    if ($item->variant->weight)   $parts[] = $item->variant->weight . ' kg';
                    if ($item->variant->duration) $parts[] = $item->variant->duration . ' j';
                    $variantLabel = implode(' · ', $parts) ?: 'Variante #' . $item->variant->id;
                }

                return [
                    'id'            => $item->id,
                    'product_id'    => $item->product_id,
                    'variant_id'    => $item->variant_id,
                    'variant_label' => $variantLabel,
                    'quantity'      => $item->quantity,
                    'name'          => $item->product->name,
                    'image'         => $item->product->image,
                    'color'         => $item->product->color,
                    'currency'      => $item->product->currency ?? 'MAD',
                    'unit_price'    => $unitPrice,
                    'subtotal'      => $unitPrice * $item->quantity,
                    'stock'         => $stock,
                ];
            });

        return response()->json([
            'items' => $items,
            'total' => $items->sum('subtotal'),
            'count' => $items->sum('quantity'),
        ]);
    }

    // POST /api/cart — add or increment a product (with optional variant)
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:variants,id',
            'quantity'   => 'integer|min:1',
        ]);

        $product   = Product::findOrFail($request->product_id);
        $variantId = $request->variant_id ?? null;
        $quantity  = $request->quantity ?? 1;

        // Resolve stock from variant or product
        if ($variantId) {
            $variant = Variants::findOrFail($variantId);
            $stock   = $variant->stock;
        } else {
            $stock = $product->stock;
        }

        if ($stock < $quantity) {
            return response()->json(['message' => 'Stock insuffisant'], 422);
        }

        // Look up existing cart row by (user, product, variant)
        // For NULL variant_id we use whereNull to avoid SQL NULL != NULL issue
        $query = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $request->product_id);

        if ($variantId) {
            $query->where('variant_id', $variantId);
        } else {
            $query->whereNull('variant_id');
        }

        $item = $query->first();

        if ($item) {
            $newQty = $item->quantity + $quantity;
            if ($stock < $newQty) {
                return response()->json(['message' => 'Stock insuffisant'], 422);
            }
            $item->update(['quantity' => $newQty]);
        } else {
            $item = CartItem::create([
                'user_id'    => $request->user()->id,
                'product_id' => $request->product_id,
                'variant_id' => $variantId,
                'quantity'   => $quantity,
            ]);
        }

        return response()->json(['message' => 'Produit ajouté au panier', 'item' => $item], 201);
    }

    // PATCH /api/cart/{cartItemId} — set exact quantity (now uses cart item id)
    public function update(Request $request, int $cartItemId)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);

        $item = CartItem::where('user_id', $request->user()->id)
            ->where('id', $cartItemId)
            ->firstOrFail();

        // Resolve stock
        $stock = $item->variant_id
            ? Variants::findOrFail($item->variant_id)->stock
            : $item->product->stock;

        if ($stock < $request->quantity) {
            return response()->json(['message' => 'Stock insuffisant'], 422);
        }

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Quantité mise à jour', 'item' => $item]);
    }

    // DELETE /api/cart/{cartItemId} — remove one item by cart item id
    public function destroy(Request $request, int $cartItemId)
    {
        CartItem::where('user_id', $request->user()->id)
            ->where('id', $cartItemId)
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
