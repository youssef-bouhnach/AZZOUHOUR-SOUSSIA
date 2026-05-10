<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class PlantDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'plantDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('sunlight')
                    ->label('Sunlight')
                    ->options([
                        'full_sun'      => 'Full Sun',
                        'partial_shade' => 'Partial Shade',
                        'shade'         => 'Shade',
                    ])
                    ->required(),

                Forms\Components\Select::make('watering')
                    ->label('Watering')
                    ->options([
                        'low'      => 'Low',
                        'moderate' => 'Moderate',
                        'frequent' => 'Frequent',
                    ])
                    ->required(),

                Forms\Components\Select::make('growth_rate')
                    ->label('Growth Rate')
                    ->options([
                        'slow'   => 'Slow',
                        'medium' => 'Medium',
                        'fast'   => 'Fast',
                    ]),

                Forms\Components\Select::make('maintenance_level')
                    ->label('Maintenance Level')
                    ->options([
                        'low'    => 'Low',
                        'medium' => 'Medium',
                        'high'   => 'High',
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('sunlight')
            ->columns([
                Tables\Columns\TextColumn::make('sunlight')
                    ->label('Sunlight')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'full_sun'      => 'warning',
                        'partial_shade' => 'info',
                        'shade'         => 'gray',
                        default         => 'gray',
                    }),

                Tables\Columns\TextColumn::make('watering')
                    ->label('Watering')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'low'      => 'success',
                        'moderate' => 'info',
                        'frequent' => 'danger',
                        default    => 'gray',
                    }),

                Tables\Columns\TextColumn::make('growth_rate')
                    ->label('Growth Rate')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'fast'   => 'success',
                        'medium' => 'warning',
                        'slow'   => 'gray',
                        default  => 'gray',
                    })
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('maintenance_level')
                    ->label('Maintenance')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'low'    => 'success',
                        'medium' => 'warning',
                        'high'   => 'danger',
                        default  => 'gray',
                    })
                    ->placeholder('—'),
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
