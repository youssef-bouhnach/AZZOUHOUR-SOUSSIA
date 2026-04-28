<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route as FacadesRoute;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \BezhanSalleh\FilamentLanguageSwitch\LanguageSwitch::configureUsing(function (\BezhanSalleh\FilamentLanguageSwitch\LanguageSwitch $switch) {
            $switch
                ->locales(['ar','en','fr']); // also accepts a closure
        });

        FacadesRoute::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));
    }
}
