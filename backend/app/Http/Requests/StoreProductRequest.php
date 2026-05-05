<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            // Product
            "name" => "required|string|max:255|unique:products,name," . ($this->route('product')?->id ?? 'NULL'),
            "description" => "nullable|string",
            "price" => "required|numeric|min:0",
            "promo_price" => "nullable|numeric|min:0",
            "currency" => "required|string|size:3",
            "stock" => "required|integer|min:0",
            "status" => "required|in:available,out_of_stock,coming_soon",
            "is_featured" => "nullable|boolean",
            "color" => "nullable|string|max:50",
            "category_id" => "required|exists:categories,id",
            "origin" => "nullable|string",
            "is_indoor" => "nullable|boolean",
            "image" => "nullable|string",
            "is_active" => "nullable|boolean",
            "category" => "nullable|string",

            // Variants per product
            "variants" => "nullable|array",
            "variants.*.price" => "required|numeric|min:0",
            "variants.*.stock" => "required|integer|min:0",
            "variants.*.diameter" => "nullable|numeric",
            "variants.*.height" => "nullable|numeric",
            "variants.*.weight" => "nullable|numeric",
            "variants.*.size" => "nullable|string",
            "variants.*.duration" => "nullable|integer",
        ];

        $categoryId = (int) $this->input('category_id');

        // Plant details (category_id = 1, 6, 7, 8)
        if (in_array($categoryId, [1, 6, 7, 8])) {
            $rules += [
                "sunlight" => "nullable|in:full_sun,partial_shade,shade",
                "watering" => "nullable|in:low,moderate,frequent",
                "growth_rate" => "nullable|in:slow,medium,fast",
                "maintenance_level" => "nullable|in:low,medium,high",
                "toxicity" => "nullable|string",
                "pet_friendly" => "nullable|boolean",
            ];
        }

        // Soil details (category_id = 2)
        if ($categoryId === 2) {
            $rules += [
                "ph" => "nullable|numeric",
                "composition" => "nullable|string",
                "texture" => "nullable|string",
                "drainage" => "nullable|string",
                "nutrients" => "nullable|string",
            ];
        }

        // Vase details (category_id = 3)
        if ($categoryId === 3) {
            $rules += [
                "material" => "nullable|string",
                "style" => "nullable|in:modern,classic,minimalist,decorative,vintage",
                "diameter" => "nullable|numeric",
                "height" => "nullable|numeric",
                "weight" => "nullable|numeric",
                "drainage_hole" => "nullable|boolean",
            ];
        }

        // Service details (category_id = 4)
        if ($categoryId === 4) {
            $rules += [
                "service_type" => "nullable|in:planting,watering,garden_cleaning,outdoor_decoration,garden_treatment,other_services",
                "location_type" => "nullable|in:indoor,outdoor,other",
                "duration" => "nullable|integer",
                "includes" => "nullable|string",
                "requirements" => "nullable|string",
            ];
        }

        // Grass details (category_id = 5)
        if ($categoryId === 5) {
            $rules += [
                "grass_type" => "nullable|in:natural,artificial",
                "blade_height" => "nullable|numeric",
                "density" => "nullable|string",
                "climate_suitability" => "nullable|string",
                "maintenance_frequency" => "nullable|string",
            ];
        }

        return $rules;
    }
}
