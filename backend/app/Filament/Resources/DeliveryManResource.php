<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DeliveryManResource\Pages;
use App\Models\DeliveryMan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DeliveryManResource extends Resource
{
    protected static ?string $model = DeliveryMan::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';
    protected static ?int    $navigationSort = 3;

    public static function getNavigationLabel(): string
    {
        return 'Livreurs';
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Ventes';
    }

    public static function getModelLabel(): string
    {
        return 'Livreur';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Livreurs';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations du livreur')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('tel')
                            ->label('Téléphone')
                            ->tel()
                            ->required()
                            ->maxLength(20),

                        Forms\Components\Select::make('user_id')
                            ->label('Compte utilisateur')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable(),

                        Forms\Components\Select::make('order_id')
                            ->label('Commande assignée')
                            ->relationship('order', 'id')
                            ->searchable()
                            ->preload()
                            ->nullable(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('tel')
                    ->label('Téléphone')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Compte utilisateur')
                    ->searchable()
                    ->default('—'),

                Tables\Columns\TextColumn::make('order.id')
                    ->label('Commande')
                    ->default('—'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListDeliveryMen::route('/'),
            'create' => Pages\CreateDeliveryMan::route('/create'),
            'edit'   => Pages\EditDeliveryMan::route('/{record}/edit'),
        ];
    }
}
