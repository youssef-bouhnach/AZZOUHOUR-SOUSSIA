<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class GrassDetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'grassDetails';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('size')
                    ->label('Size')
                    ->options([
                        'small'  => 'Small',
                        'medium' => 'Medium',
                        'large'  => 'Large',
                    ])
                    ->required(),

                Forms\Components\Select::make('grass_type')
                    ->label('Grass Type')
                    ->options([
                        'khassna'  => 'Khassna',
                        'nsowlo'   => 'Nsowlo',
                        'si'       => 'Si',
                        'houssien' => 'Houssien',
                    ])
                    ->required(),

                Forms\Components\Select::make('growth')
                    ->label('Growth Rate')
                    ->options([
                        'slow'   => 'Slow',
                        'medium' => 'Medium',
                        'fast'   => 'Fast',
                    ])
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('grass_type')
            ->columns([
                Tables\Columns\TextColumn::make('size')
                    ->label('Size')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'small'  => 'info',
                        'medium' => 'warning',
                        'large'  => 'success',
                        default  => 'gray',
                    }),

                Tables\Columns\TextColumn::make('grass_type')
                    ->label('Grass Type')
                    ->badge()
                    ->color('success'),

                Tables\Columns\TextColumn::make('growth')
                    ->label('Growth Rate')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'fast'   => 'success',
                        'medium' => 'warning',
                        'slow'   => 'gray',
                        default  => 'gray',
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
