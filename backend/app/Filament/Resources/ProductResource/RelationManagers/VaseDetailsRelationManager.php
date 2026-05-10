<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class VaseDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'vaseDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('material')
                    ->label('Material')
                    ->options([
                        'ceramic' => 'Ceramic',
                        'glass'   => 'Glass',
                        'metal'   => 'Metal',
                        'plastic' => 'Plastic',
                        'wood'    => 'Wood',
                        'other'   => 'Other',
                    ])
                    ->required(),

                Forms\Components\Select::make('style')
                    ->label('Style')
                    ->options([
                        'modern'     => 'Modern',
                        'classic'    => 'Classic',
                        'minimalist' => 'Minimalist',
                        'decorative' => 'Decorative',
                        'vintage'    => 'Vintage',
                    ])
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('material')
            ->columns([
                Tables\Columns\TextColumn::make('material')
                    ->label('Material')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'ceramic' => 'warning',
                        'glass'   => 'info',
                        'metal'   => 'gray',
                        'plastic' => 'danger',
                        'wood'    => 'success',
                        default   => 'gray',
                    }),

                Tables\Columns\TextColumn::make('style')
                    ->label('Style')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'modern'     => 'info',
                        'classic'    => 'warning',
                        'minimalist' => 'gray',
                        'decorative' => 'success',
                        'vintage'    => 'danger',
                        default      => 'gray',
                    }),
            ])
            ->filters([])
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
