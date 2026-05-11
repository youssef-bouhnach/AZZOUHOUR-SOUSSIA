<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\TextColumn;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon  = 'heroicon-o-rectangle-stack';
    protected static ?int    $navigationSort  = 2;

    public static function getNavigationLabel(): string
    {
        return __('admin.products.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.nav.catalogue');
    }

    public static function getModelLabel(): string
    {
        return __('admin.products.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.products.plural_label');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->saveUploadedFileUsing(function ($file) {
                        return (new \App\Services\CloudinaryService)->upload($file, 'products');
                    }),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('promo_price')
                    ->numeric(),
                Forms\Components\TextInput::make('currency')
                    ->required()
                    ->maxLength(3)
                    ->default('MAD'),
                Forms\Components\TextInput::make('stock')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\Toggle::make('is_featured')
                    ->required(),
                Forms\Components\TextInput::make('color')
                    ->maxLength(255),
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required()
                    ->live(),
                Forms\Components\TextInput::make('origin')
                    ->maxLength(255),
                Forms\Components\Toggle::make('is_indoor')
                    ->required(),

                // Plant Details (plant)
                Forms\Components\Fieldset::make('Plant Details')
                    ->relationship('plantDetails')
                    ->visible(fn(Get $get) => optional(\App\Models\Category::find($get('category_id')))->slug === 'plant')
                    ->schema([
                        Forms\Components\Select::make('sunlight')
                            ->options(['full_sun' => 'Full Sun', 'partial_shade' => 'Partial Shade', 'shade' => 'Shade']),
                        Forms\Components\Select::make('watering')
                            ->options(['low' => 'Low', 'moderate' => 'Moderate', 'frequent' => 'Frequent']),
                        Forms\Components\Select::make('growth_rate')
                            ->options(['slow' => 'Slow', 'medium' => 'Medium', 'fast' => 'Fast']),
                        Forms\Components\Select::make('maintenance_level')
                            ->options(['low' => 'Low', 'medium' => 'Medium', 'high' => 'High']),
                    ]),

                // Soil Details
                Forms\Components\Fieldset::make('Soil Details')
                    ->relationship('soilDetails')
                    ->visible(fn(Get $get) => optional(\App\Models\Category::find($get('category_id')))->slug === 'soil')
                    ->schema([
                        Forms\Components\TextInput::make('composition'),
                        Forms\Components\TextInput::make('grass_type'),
                    ]),

                // Vase Details
                Forms\Components\Fieldset::make('Vase Details')
                    ->relationship('vaseDetails')
                    ->visible(fn(Get $get) => optional(\App\Models\Category::find($get('category_id')))->slug === 'vase')
                    ->schema([
                        Forms\Components\Select::make('material')
                            ->options([
                                'ceramic' => 'Ceramic',
                                'glass' => 'Glass',
                                'metal' => 'Metal',
                                'plastic' => 'Plastic',
                                'wood' => 'Wood',
                                'other' => 'Other',
                            ]),
                        Forms\Components\Select::make('style')
                            ->options([
                                'modern' => 'Modern',
                                'classic' => 'Classic',
                                'minimalist' => 'Minimalist',
                                'decorative' => 'Decorative',
                                'vintage' => 'Vintage',
                            ]),
                    ]),

                // Service Details
                Forms\Components\Fieldset::make('Service Details')
                    ->relationship('serviceDetails')
                    ->visible(fn(Get $get) => optional(\App\Models\Category::find($get('category_id')))->slug === 'service')
                    ->schema([
                        Forms\Components\Select::make('service_type')
                            ->options([
                                'planting' => 'Planting',
                                'watering' => 'Watering',
                                'garden_cleaning' => 'Garden Cleaning',
                                'outdoor_decoration' => 'Outdoor Decoration',
                                'garden_treatment' => 'Garden Treatment',
                                'other_services' => 'Other Services'
                            ]),
                        Forms\Components\Select::make('location_type')
                            ->options(['indoor' => 'Indoor', 'outdoor' => 'Outdoor', 'both' => 'Both']),
                        Forms\Components\TextInput::make('description'),
                    ]),

                // Grass Details
                Forms\Components\Fieldset::make('Grass Details')
                    ->relationship('grassDetails')
                    ->visible(fn(Get $get) => optional(\App\Models\Category::find($get('category_id')))->slug === 'grass')
                    ->schema([
                        Forms\Components\Select::make('size')
                            ->options(['small' => 'Small', 'medium' => 'Medium', 'large' => 'Large']),
                        Forms\Components\Select::make('grass_type')
                            ->options(['khassna' => 'Khassna', 'nsowlo' => 'Nsowlo', 'si' => 'Si', 'houssien' => 'Houssien']),
                        Forms\Components\Select::make('growth')
                            ->options(['fast' => 'Fast', 'slow' => 'Slow', 'medium' => 'Medium']),
                    ]),
                Forms\Components\Repeater::make('variants')
                    ->relationship()
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\TextInput::make('stock')
                            ->required()
                            ->numeric()
                            ->default(0),
                        Forms\Components\TextInput::make('size')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('diameter')
                            ->numeric(),
                        Forms\Components\TextInput::make('height')
                            ->numeric(),
                        Forms\Components\TextInput::make('weight')
                            ->numeric(),
                        Forms\Components\TextInput::make('duration')
                            ->numeric()
                            ->label('Duration (days)'),
                    ])
                    ->columns(3)
                    ->columnSpanFull()
                    ->defaultItems(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(fn() => __('admin.product.name'))
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image')
                    ->label(fn() => __('admin.product.image'))
                    ->url(fn($record) => $record->image),
                Tables\Columns\TextColumn::make('price')
                    ->label(fn() => __('admin.product.price'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('currency')
                    ->label(fn() => __('admin.product.currency'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('promo_price')
                    ->label(fn() => __('admin.product.promo_price'))
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->label(fn() => __('admin.product.stock'))
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label(fn() => __('admin.product.status')),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label(fn() => __('admin.product.is_featured'))
                    ->boolean(),
                Tables\Columns\TextColumn::make('color')
                    ->label(fn() => __('admin.product.color'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label(fn() => __('admin.product.category'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('origin')
                    ->label(fn() => __('admin.product.origin'))
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_indoor')
                    ->label(fn() => __('admin.product.is_indoor'))
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\VariantsRelationManager::class,
            RelationManagers\PlantDetailsRelationManager::class,
            RelationManagers\SoilDetailsRelationManager::class,
            RelationManagers\VaseDetailsRelationManager::class,
            RelationManagers\ServiceDetailsRelationManager::class,
            RelationManagers\GrassDetailsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
