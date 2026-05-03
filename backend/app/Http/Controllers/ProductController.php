<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Public: get all active products (with optional category filter)
    public function index(Request $request)
    {
        $query = Product::active();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        return response()->json($query->latest()->get());
    }

    // Public: get single product
    public function show(Product $product)
    {
        return response()->json($product);
    }

    // Admin: create product
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'nullable|string',
            'category'    => 'required|in:flowers,grass,soil,services',
            'stock'       => 'required|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $product = Product::create($fields);

        return response()->json($product, 201);
    }

    // Admin: update product
    public function update(Request $request, Product $product)
    {
        $fields = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric|min:0',
            'image'       => 'nullable|string',
            'category'    => 'sometimes|in:flowers,grass,soil,services',
            'stock'       => 'sometimes|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $product->update($fields);

        return response()->json($product);
    }

    // Admin: delete product
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
