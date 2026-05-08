<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CartItemResource\Pages;
use App\Models\CartItem;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CartItemResource extends Resource
{
    protected static ?string $model = CartItem::class;

    protected static ?string $navigationIcon    = 'heroicon-o-shopping-cart';
    protected static ?int    $navigationSort    = 3;

    public static function getNavigationLabel(): string
    {
        return __('admin.cart_items.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.nav.ventes');
    }

    public static function getModelLabel(): string
    {
        return __('admin.cart_items.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.cart_items.plural_label');
    }

    // Read-only: no create button
    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label(fn () => __('admin.cart.client'))
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.email')
                    ->label(fn () => __('admin.cart.email'))
                    ->searchable(),

                Tables\Columns\TextColumn::make('product.name')
                    ->label(fn () => __('admin.cart.product')),

                Tables\Columns\ImageColumn::make('product.image')
                    ->label(fn () => __('admin.cart.image'))
                    ->circular(),

                Tables\Columns\TextColumn::make('quantity')
                    ->label(fn () => __('admin.cart.qty')),

                Tables\Columns\TextColumn::make('product.price')
                    ->label(fn () => __('admin.cart.unit_price'))
                    ->money('MAD'),

                Tables\Columns\TextColumn::make('subtotal')
                    ->label(fn () => __('admin.cart.subtotal'))
                    ->money('MAD')
                    ->getStateUsing(
                        fn ($record) => $record->quantity *
                            ($record->product->promo_price ?? $record->product->price)
                    ),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(fn () => __('admin.cart.added_at'))
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->label(fn () => __('admin.cart.client')),
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCartItems::route('/'),
        ];
    }
}
