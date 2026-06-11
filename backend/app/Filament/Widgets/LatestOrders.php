<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestOrders extends BaseWidget
{
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 'full';

    public function getHeading(): string
    {
        return __('admin.widgets.latest_orders');
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Order::query()->latest()->limit(5)
            )
            ->paginated(false)
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label(fn () => __('admin.order.id')),

                Tables\Columns\TextColumn::make('user.name')
                    ->label(fn () => __('admin.order.client')),

                Tables\Columns\TextColumn::make('shipping_city')
                    ->label(fn () => __('admin.order.city')),

                Tables\Columns\TextColumn::make('total')
                    ->label(fn () => __('admin.order.total'))
                    ->money('MAD', locale: fn () => app()->getLocale() === 'ar' ? 'ar_MA@numbers=latn' : 'fr'),

                Tables\Columns\BadgeColumn::make('status')
                    ->label(fn () => __('admin.order.status'))
                    ->colors([
                        'gray' => 'pending',
                        'success' => 'paid',
                        'primary' => 'processing',
                        'info' => 'shipped',
                        'warning' => 'delivered',
                        'danger' => 'cancelled',
                    ])
                    ->formatStateUsing(fn ($state) => __($state)),

                Tables\Columns\BadgeColumn::make('payment_status')
                    ->label(fn () => __('admin.order.payment'))
                    ->colors([
                        'danger' => 'unpaid',
                        'success' => 'paid',
                        'warning' => 'refunded',
                    ])
                    ->formatStateUsing(fn ($state) => __($state)),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(fn () => __('admin.order.date'))
                    ->dateTime('d/m/Y H:i'),
            ]);
    }
}
