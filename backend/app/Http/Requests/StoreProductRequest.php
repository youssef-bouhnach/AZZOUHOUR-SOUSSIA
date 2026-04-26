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
            "name" => "required|string|max:255|unique:products,name",
            "description" => "nullable|string",
            "price" => "required|numeric|min:0",
            "promo_price" => "nullable|numeric|min:0",
            "currency" => "required|string|size:3",
            "stock" => "required|integer|min:0",
            "status" => "required|in:available,out_of_stock,coming_soon",
            "is_featured" => "required|boolean",
            "color" => "nullable|string|max:50",
            "category_id" => "required|exists:categories,id",
            "origin" => "nullable|string",
            "is_indoor" => "boolean",

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

        $categoryId = $this->input('category_id');

        // Plant details
        if ($categoryId === 1) {
            $rules += [
                "sunlight" => "nullable|in:full_sun,partial_shade,shade",
                "watering" => "nullable|in:low,moderate,frequent",
                "growth_rate" => "nullable|in:slow,medium,fast",
                "maintenance_level" => "nullable|in:low,medium,high",
            ];
        }

        // Soil details
        if ($categoryId === 2) {
            $rules += [
                // "ph" => "nullable|numeric",
                "composition" => "nullable|string",
                "grass_type" => "nullable|in:natural,artificial",
            ];
        }

        // Vase details
        if ($categoryId === 3) {
            $rules += [
                "material" => "nullable|string",
                "style" => "nullable|in:modern,classic,minimalist,decorative,vintage",
            ];
        }

        // Service details
        if ($categoryId === 4) {
            $rules += [
                "service_type" => "nullable|in:planting,watering,garden_cleaning,outdoor_decoration,garden_treatment,other_services",
                "location_type" => "nullable|in:indoor,outdoor,other",
                "description" => "nullable|string",
            ];
        }

        return $rules;
    }
}
