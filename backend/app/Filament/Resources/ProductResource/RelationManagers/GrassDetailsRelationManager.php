<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class GrassDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'grassDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('size')
                    ->options(['small' => 'Small', 'medium' => 'Medium', 'large' => 'Large']),
                Forms\Components\Select::make('grass_type')
                    ->options(['khassna' => 'Khassna', 'nsowlo' => 'Nsowlo', 'si' => 'Si', 'houssien' => 'Houssien']),
                Forms\Components\Select::make('growth')
                    ->options(['fast' => 'Fast', 'slow' => 'Slow', 'medium' => 'Medium']),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('grass_type')
            ->columns([
                Tables\Columns\TextColumn::make('size'),
                Tables\Columns\TextColumn::make('grass_type'),
                Tables\Columns\TextColumn::make('growth'),
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
