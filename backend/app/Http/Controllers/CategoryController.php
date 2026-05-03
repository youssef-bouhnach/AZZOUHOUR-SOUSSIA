<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Public: get all active categories
    public function index()
    {
        $categories = Category::active()
            ->withCount('products')
            ->get();

        return response()->json($categories);
    }

    // Public: get single category with products
    public function show(Category $category)
    {
        $category->load(['products' => function ($query) {
            $query->active()->latest();
        }]);

        return response()->json($category);
    }

    // Admin: create category
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'slug' => 'nullable|string|unique:categories,slug',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $category = Category::create($fields);

        return response()->json($category, 201);
    }

    // Admin: update category
    public function update(Request $request, Category $category)
    {
        $fields = $request->validate([
            'name' => 'sometimes|string|max:255|unique:categories,name,' . $category->id,
            'slug' => 'nullable|string|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $category->update($fields);

        return response()->json($category);
    }

    // Admin: delete category
    public function destroy(Category $category)
    {
        // Check if category has products
        if ($category->products()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category with products'
            ], 400);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
