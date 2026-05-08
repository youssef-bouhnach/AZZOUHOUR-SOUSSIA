<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    // GET /api/favorites — list all favorites for the authenticated user
    public function index(Request $request)
    {
        $favorites = $request->user()
            ->favorites()
            ->with('product')
            ->get()
            ->map(fn($fav) => $fav->product);

        return response()->json(['favorites' => $favorites]);
    }

    // POST /api/favorites — add a product to favorites
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id'    => $request->user()->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message'  => 'Produit ajouté aux favoris',
            'favorite' => $favorite,
        ], 201);
    }

    // DELETE /api/favorites/{productId} — remove a product from favorites
    public function destroy(Request $request, int $productId)
    {
        Favorite::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Produit retiré des favoris']);
    }

    // GET /api/favorites/ids — return only the product IDs (for quick heart state check)
    public function ids(Request $request)
    {
        $ids = $request->user()
            ->favorites()
            ->pluck('product_id');

        return response()->json(['ids' => $ids]);
    }
}
