<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class OrderItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    public function form(Form $form): Form
    {
        return $form->schema([]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('product_name')
            ->columns([
                Tables\Columns\ImageColumn::make('product_image')
                    ->label(fn () => __('admin.order_item.image'))
                    ->circular(),

                Tables\Columns\TextColumn::make('product_name')
                    ->label(fn () => __('admin.order_item.product')),

                Tables\Columns\TextColumn::make('product_color')
                    ->label(fn () => __('admin.order_item.color'))
                    ->badge(),

                Tables\Columns\TextColumn::make('quantity')
                    ->label(fn () => __('admin.order_item.qty')),

                Tables\Columns\TextColumn::make('unit_price')
                    ->label(fn () => __('admin.order_item.unit_price'))
                    ->money('MAD'),

                Tables\Columns\TextColumn::make('subtotal')
                    ->label(fn () => __('admin.order_item.subtotal'))
                    ->money('MAD'),
            ])
            ->filters([])
            ->headerActions([])
            ->actions([])
            ->bulkActions([]);
    }
}
