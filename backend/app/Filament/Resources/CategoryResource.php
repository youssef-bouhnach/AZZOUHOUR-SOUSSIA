<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon  = 'heroicon-o-rectangle-stack';
    protected static ?int    $navigationSort  = 1;

    public static function getNavigationLabel(): string
    {
        return __('admin.categories.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.nav.catalogue');
    }

    public static function getModelLabel(): string
    {
        return __('admin.categories.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.categories.plural_label');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->dehydrated(),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                // cloudinary image
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->saveUploadedFileUsing(function ($file) {
                        $cloudinary = new \Cloudinary\Cloudinary(
                            \Cloudinary\Configuration\Configuration::instance([
                                'cloud' => [
                                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                                    'api_key'    => env('CLOUDINARY_API_KEY'),
                                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                                ],
                            ])
                        );

                        $result = $cloudinary->uploadApi()->upload(
                            $file->getRealPath(),
                            ['folder' => 'categories']
                        );

                        return $result['secure_url'];
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image')
                    ->url(fn($record) => $record->image), // use URL as-is
                Tables\Columns\TextColumn::make('name')
                    ->label(fn() => __('admin.category.name'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->label(fn() => __('admin.category.slug'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
