<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class SoilDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'soilDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('ph')
                    ->label('pH')
                    ->numeric()
                    ->step(0.1)
                    ->minValue(0)
                    ->maxValue(14),

                Forms\Components\TextInput::make('composition')
                    ->label('Composition')
                    ->maxLength(255),

                Forms\Components\Select::make('grass_type')
                    ->label('Grass Type')
                    ->options([
                        'natural'    => 'Natural',
                        'artificial' => 'Artificial',
                    ])
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('composition')
            ->columns([
                Tables\Columns\TextColumn::make('ph')
                    ->label('pH')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('composition')
                    ->label('Composition')
                    ->placeholder('—')
                    ->limit(40),

                Tables\Columns\TextColumn::make('grass_type')
                    ->label('Grass Type')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'natural'    => 'success',
                        'artificial' => 'warning',
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
