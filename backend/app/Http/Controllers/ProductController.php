<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $id = $request->query('id');

        $products = Product::when($id, function ($query, $id) {
            $query->where('category_id', $id);
        })->get();

        return response()->json([
            "products" => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // the array that comes from /StoreProductRequest
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        // First create product
        $product = Product::create($data);

        if ($data['category_id'] === 1) {
            $product->PlantDetails()->create([
                'sunlight' => $data['sunlight'],
                'watering' => $data['watering'],
                'growth_rate' => $data['growth_rate'],
                'maintenance_level' => $data['maintenance_level'],
            ]);
        }

        if ($data['category_id'] === 2) {
            $product->SoilDetails()->create([
                'ph' => $data['ph'],
                'composition' => $data['composition'],
                'grass_type' => $data['grass_type']
            ]);
        }

        if ($data['category_id'] === 3) {
            $product->VaseDetails()->create([
                'material' => $data['material'],
                'style' => $data['style']
            ]);
        }

        if ($data['category_id'] === 4) {
            $product->ServiceDetails()->create([
                'service_type' => $data['service_type'],
                'location_type' => $data['location_type'],
                'description' => $data['description']
            ]);
        }

        if (!empty($data['variants'])) {
            foreach ($data['variants'] as $variant) {
                $product->Variants()->create($variant);
            }
        }

        return response()->json([
            "product" => $product->load('variants')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            "product" => $product->load('variants')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // delete old image 
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            // store new image
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        $product->update($data);

        if (isset($data['variants'])) {
            $product->variants()->delete();
            foreach ($data['variants'] as $variant) {
                $product->variants()->create($variant);
            }
        }

        return response()->json([
            "success" => "product updated successfully",
            "product" => $product->load('variants')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            "message" => "product deleted!"
        ]);
    }

    /**
     * product by category
     */
    public function byCategory(Category $category)
    {
        return response()->json([
            'category' => $category,
            'products' => $category->products,
        ]);
    }
}
