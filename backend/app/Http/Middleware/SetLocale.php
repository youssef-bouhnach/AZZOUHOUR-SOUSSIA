<?php

namespace App\Http\Middleware;

use Closure;
use Filament\Tables\Table;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = session('locale', config('app.locale', 'fr'));

        if (in_array($locale, ['fr', 'ar'])) {
            app()->setLocale($locale);

            // Arabic locale uses Eastern Arabic numerals (٠١٢٣) by default.
            // Force Latin digits (0123) for all Filament money/number columns
            // by pointing the table number locale to the latn extension.
            Table::$defaultNumberLocale = $locale === 'ar'
                ? 'ar_MA@numbers=latn'
                : null; // null = use app locale (fr → fine as-is)
        }

        return $next($request);
    }
}
