<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class VariantsRelationManager extends RelationManager
{
    protected static string $relationship = 'variants';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('size')
                    ->label('Size')
                    ->maxLength(255),

                Forms\Components\TextInput::make('diameter')
                    ->label('Diameter (cm)')
                    ->numeric()
                    ->step(0.1),

                Forms\Components\TextInput::make('height')
                    ->label('Height (cm)')
                    ->numeric()
                    ->step(0.1),

                Forms\Components\TextInput::make('weight')
                    ->label('Weight (kg)')
                    ->numeric()
                    ->step(0.1),

                Forms\Components\TextInput::make('duration')
                    ->label('Duration (days)')
                    ->numeric(),

                Forms\Components\TextInput::make('price')
                    ->label('Price')
                    ->numeric()
                    ->step(0.01)
                    ->required()
                    ->prefix('MAD'),

                Forms\Components\TextInput::make('stock')
                    ->label('Stock')
                    ->numeric()
                    ->required()
                    ->default(0),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('size')
            ->columns([
                Tables\Columns\TextColumn::make('size')
                    ->label('Size')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('diameter')
                    ->label('Ø (cm)')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('height')
                    ->label('H (m)')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('weight')
                    ->label('Weight (kg)')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('duration')
                    ->label('Duration (days)')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('price')
                    ->label('Price')
                    ->money('MAD'),

                Tables\Columns\TextColumn::make('stock')
                    ->label('Stock')
                    ->badge()
                    ->color(fn ($state) => $state > 0 ? 'success' : 'danger'),
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
