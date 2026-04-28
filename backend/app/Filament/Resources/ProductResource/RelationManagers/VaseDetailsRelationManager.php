<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;

class VaseDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'vaseDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
            Select::make('material')
                ->options([
                    'ceramic' => 'Ceramic',
                    'glass'   => 'Glass',
                    'metal'   => 'Metal',
                    'plastic' => 'Plastic',
                    'wood'    => 'Wood',
                    'other'   => 'Other',
                ])
                ->required(),
            Select::make('style')
                ->options([
                    'modern'      => 'Modern',
                    'classic'     => 'Classic',
                    'minimalist'  => 'Minimalist',
                    'decorative'  => 'Decorative',
                    'vintage'     => 'Vintage',
                ])
                ->required(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                TextColumn::make('id'),
                TextColumn::make('material')
                    ->badge()
                    ->color('warning'),
                TextColumn::make('style')
                    ->badge()
                    ->color('success'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
