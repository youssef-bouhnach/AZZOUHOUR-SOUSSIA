<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'serviceDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('service_type')
                    ->label('Service Type')
                    ->options([
                        'planting'            => 'Plantation des végétaux',
                        'watering'            => 'Arrosage',
                        'garden_cleaning'     => 'Nettoyage de jardins',
                        'outdoor_decoration'  => 'Décoration extérieure',
                        'garden_treatment'    => 'Traitement et suivi des jardins',
                        'other_services'      => 'Autres services',
                    ])
                    ->required(),

                Forms\Components\Select::make('location_type')
                    ->label('Location Type')
                    ->options([
                        'indoor'  => 'Indoor',
                        'outdoor' => 'Outdoor',
                        'both'    => 'Both',
                    ])
                    ->required(),

                Forms\Components\Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->maxLength(500),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('service_type')
            ->columns([
                Tables\Columns\TextColumn::make('service_type')
                    ->label('Service Type')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'planting'           => 'Plantation',
                        'watering'           => 'Arrosage',
                        'garden_cleaning'    => 'Nettoyage',
                        'outdoor_decoration' => 'Décoration',
                        'garden_treatment'   => 'Traitement',
                        'other_services'     => 'Autres',
                        default              => $state,
                    }),

                Tables\Columns\TextColumn::make('location_type')
                    ->label('Location')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'indoor'  => 'warning',
                        'outdoor' => 'success',
                        'both'    => 'info',
                        default   => 'gray',
                    }),

                Tables\Columns\TextColumn::make('description')
                    ->label('Description')
                    ->limit(50)
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
