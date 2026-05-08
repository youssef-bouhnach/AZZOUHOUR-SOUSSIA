<?php

namespace App\Filament\Widgets;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalOrders   = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $revenue       = Order::where('payment_status', 'paid')->sum('total');
        $users         = User::count();
        $activeCarts   = CartItem::distinct('user_id')->count('user_id');

        return [
            Stat::make(__('admin.widgets.total_orders'), $totalOrders)
                ->description(__('admin.widgets.all_orders'))
                ->descriptionIcon('heroicon-o-shopping-bag')
                ->color('primary'),

            Stat::make(__('admin.widgets.pending_orders'), $pendingOrders)
                ->description(__('admin.widgets.unpaid'))
                ->descriptionIcon('heroicon-o-clock')
                ->color('warning'),

            Stat::make(__('admin.widgets.revenue'), number_format($revenue, 2) . ' MAD')
                ->description(__('admin.widgets.revenue_desc'))
                ->descriptionIcon('heroicon-o-banknotes')
                ->color('success'),

            Stat::make(__('admin.widgets.clients'), $users)
                ->description(__('admin.widgets.registered'))
                ->descriptionIcon('heroicon-o-users')
                ->color('info'),

            Stat::make(__('admin.widgets.carts'), $activeCarts)
                ->description(__('admin.widgets.abandoned'))
                ->descriptionIcon('heroicon-o-shopping-cart')
                ->color('danger'),
        ];
    }
}
