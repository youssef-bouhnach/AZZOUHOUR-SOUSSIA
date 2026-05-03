<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Public: get all active products (with optional category filter)
    public function index(Request $request)
    {
        $query = Product::query()->active();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        $products = $query->latest()->get();

        // Don't load category relationship to avoid frontend issues
        // Frontend uses the 'category' string field for now
        return response()->json($products->makeHidden(['category_relation']));
    }

    // Public: get single product with all details
    public function show(Product $product)
    {
        $product->load([
            'category',
            'variants',
            'plantDetails',
            'soilDetails',
            'grassDetails',
            'vaseDetails',
            'serviceDetails',
        ]);

        return response()->json($product);
    }

    // Admin: create product
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        // Create product
        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'promo_price' => $validated['promo_price'] ?? null,
            'currency' => $validated['currency'] ?? 'USD',
            'stock' => $validated['stock'],
            'status' => $validated['status'] ?? 'available',
            'is_featured' => $validated['is_featured'] ?? false,
            'color' => $validated['color'] ?? null,
            'category_id' => $validated['category_id'],
            'origin' => $validated['origin'] ?? null,
            'is_indoor' => $validated['is_indoor'] ?? false,
            'image' => $validated['image'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            // Keep old category for backward compatibility
            'category' => $this->mapCategoryIdToOldCategory($validated['category_id']),
        ]);

        // Create category-specific details
        $this->createProductDetails($product, $validated);

        // Create variants if provided
        if (isset($validated['variants'])) {
            foreach ($validated['variants'] as $variant) {
                $product->variants()->create($variant);
            }
        }

        return response()->json($product->load([
            'category',
            'variants',
            'plantDetails',
            'soilDetails',
            'grassDetails',
            'vaseDetails',
            'serviceDetails',
        ]), 201);
    }

    // Admin: update product
    public function update(Request $request, Product $product)
    {
        $fields = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'promo_price' => 'nullable|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'stock' => 'sometimes|integer|min:0',
            'status' => 'sometimes|in:available,out_of_stock,coming_soon',
            'is_featured' => 'boolean',
            'color' => 'nullable|string|max:50',
            'category_id' => 'sometimes|exists:categories,id',
            'origin' => 'nullable|string',
            'is_indoor' => 'boolean',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            // Keep old category for backward compatibility
            'category' => 'sometimes|in:flowers,grass,soil,services',
        ]);

        $product->update($fields);

        // Update category-specific details if provided
        $this->updateProductDetails($product, $request->all());

        return response()->json($product->load([
            'category',
            'variants',
            'plantDetails',
            'soilDetails',
            'grassDetails',
            'vaseDetails',
            'serviceDetails',
        ]));
    }

    // Admin: delete product
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

    /**
     * Helper: Create product details based on category
     */
    private function createProductDetails(Product $product, array $data)
    {
        $categoryId = $data['category_id'];

        // Plant details (category_id = 1, 6, 7, 8 for Plants, Cactus, Palm, Tree)
        if (in_array($categoryId, [1, 6, 7, 8])) {
            $product->plantDetails()->create([
                'sunlight' => $data['sunlight'] ?? null,
                'watering' => $data['watering'] ?? null,
                'growth_rate' => $data['growth_rate'] ?? null,
                'maintenance_level' => $data['maintenance_level'] ?? null,
                'toxicity' => $data['toxicity'] ?? null,
                'pet_friendly' => $data['pet_friendly'] ?? false,
            ]);
        }

        // Soil details (category_id = 2)
        if ($categoryId === 2) {
            $product->soilDetails()->create([
                'ph' => $data['ph'] ?? null,
                'composition' => $data['composition'] ?? null,
                'texture' => $data['texture'] ?? null,
                'drainage' => $data['drainage'] ?? null,
                'nutrients' => $data['nutrients'] ?? null,
            ]);
        }

        // Vase details (category_id = 3)
        if ($categoryId === 3) {
            $product->vaseDetails()->create([
                'material' => $data['material'] ?? null,
                'style' => $data['style'] ?? null,
                'diameter' => $data['diameter'] ?? null,
                'height' => $data['height'] ?? null,
                'weight' => $data['weight'] ?? null,
                'drainage_hole' => $data['drainage_hole'] ?? false,
            ]);
        }

        // Service details (category_id = 4)
        if ($categoryId === 4) {
            $product->serviceDetails()->create([
                'service_type' => $data['service_type'] ?? null,
                'location_type' => $data['location_type'] ?? null,
                'duration' => $data['duration'] ?? null,
                'includes' => $data['includes'] ?? null,
                'requirements' => $data['requirements'] ?? null,
            ]);
        }

        // Grass details (category_id = 5)
        if ($categoryId === 5) {
            $product->grassDetails()->create([
                'grass_type' => $data['grass_type'] ?? null,
                'blade_height' => $data['blade_height'] ?? null,
                'density' => $data['density'] ?? null,
                'climate_suitability' => $data['climate_suitability'] ?? null,
                'maintenance_frequency' => $data['maintenance_frequency'] ?? null,
            ]);
        }
    }

    /**
     * Helper: Update product details
     */
    private function updateProductDetails(Product $product, array $data)
    {
        if ($product->plantDetails) {
            $product->plantDetails->update(array_filter([
                'sunlight' => $data['sunlight'] ?? null,
                'watering' => $data['watering'] ?? null,
                'growth_rate' => $data['growth_rate'] ?? null,
                'maintenance_level' => $data['maintenance_level'] ?? null,
                'toxicity' => $data['toxicity'] ?? null,
                'pet_friendly' => $data['pet_friendly'] ?? null,
            ]));
        }

        if ($product->soilDetails) {
            $product->soilDetails->update(array_filter([
                'ph' => $data['ph'] ?? null,
                'composition' => $data['composition'] ?? null,
                'texture' => $data['texture'] ?? null,
                'drainage' => $data['drainage'] ?? null,
                'nutrients' => $data['nutrients'] ?? null,
            ]));
        }

        if ($product->grassDetails) {
            $product->grassDetails->update(array_filter([
                'grass_type' => $data['grass_type'] ?? null,
                'blade_height' => $data['blade_height'] ?? null,
                'density' => $data['density'] ?? null,
                'climate_suitability' => $data['climate_suitability'] ?? null,
                'maintenance_frequency' => $data['maintenance_frequency'] ?? null,
            ]));
        }

        if ($product->vaseDetails) {
            $product->vaseDetails->update(array_filter([
                'material' => $data['material'] ?? null,
                'style' => $data['style'] ?? null,
                'diameter' => $data['diameter'] ?? null,
                'height' => $data['height'] ?? null,
                'weight' => $data['weight'] ?? null,
                'drainage_hole' => $data['drainage_hole'] ?? null,
            ]));
        }

        if ($product->serviceDetails) {
            $product->serviceDetails->update(array_filter([
                'service_type' => $data['service_type'] ?? null,
                'location_type' => $data['location_type'] ?? null,
                'duration' => $data['duration'] ?? null,
                'includes' => $data['includes'] ?? null,
                'requirements' => $data['requirements'] ?? null,
            ]));
        }
    }

    /**
     * Helper: Map category_id to old category string
     */
    private function mapCategoryIdToOldCategory($categoryId)
    {
        $mapping = [
            1 => 'flowers',
            2 => 'soil',
            3 => 'services',
            4 => 'services',
            5 => 'grass',
            6 => 'flowers', // Cactus
            7 => 'flowers', // Palm
            8 => 'flowers', // Tree
        ];

        return $mapping[$categoryId] ?? 'flowers';
    }
}
