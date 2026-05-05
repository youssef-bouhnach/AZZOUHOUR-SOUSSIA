<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Commandes';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\Section::make('Informations commande')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->required(),

                        Forms\Components\Select::make('status')
                            ->options([
                                'pending'    => 'En attente',
                                'paid'       => 'Payé',
                                'processing' => 'En traitement',
                                'shipped'    => 'Expédié',
                                'delivered'  => 'Livré',
                                'cancelled'  => 'Annulé',
                            ])
                            ->required(),

                        Forms\Components\Select::make('payment_status')
                            ->options([
                                'unpaid'   => 'Non payé',
                                'paid'     => 'Payé',
                                'refunded' => 'Remboursé',
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('payment_method')
                            ->placeholder('cmi, cash...'),

                        Forms\Components\TextInput::make('subtotal')
                            ->numeric()->required()->suffix('MAD'),

                        Forms\Components\TextInput::make('total')
                            ->numeric()->required()->suffix('MAD'),

                        Forms\Components\TextInput::make('cmi_order_id')
                            ->label('CMI Order ID'),
                    ]),

                Forms\Components\Section::make('Livraison')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('shipping_name')->required(),
                        Forms\Components\TextInput::make('shipping_phone')->tel(),
                        Forms\Components\TextInput::make('shipping_address')
                            ->required()->columnSpanFull(),
                        Forms\Components\TextInput::make('shipping_city')->required(),
                        Forms\Components\TextInput::make('shipping_country')->default('MA'),
                        Forms\Components\Textarea::make('notes')->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('#')->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Client')->searchable()->sortable(),

                Tables\Columns\TextColumn::make('shipping_city')
                    ->label('Ville')->searchable(),

                Tables\Columns\TextColumn::make('total')
                    ->label('Total')->money('MAD')->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Statut')
                    ->colors([
                        'gray'    => 'pending',
                        'success' => 'paid',
                        'primary' => 'processing',
                        'info'    => 'shipped',
                        'danger'  => 'cancelled',
                    ])
                    ->formatStateUsing(fn($state) => match ($state) {
                        'pending'    => 'En attente',
                        'paid'       => 'Payé',
                        'processing' => 'En traitement',
                        'shipped'    => 'Expédié',
                        'delivered'  => 'Livré',
                        'cancelled'  => 'Annulé',
                        default      => $state,
                    }),

                Tables\Columns\BadgeColumn::make('payment_status')
                    ->label('Paiement')
                    ->colors([
                        'danger'  => 'unpaid',
                        'success' => 'paid',
                        'warning' => 'refunded',
                    ])
                    ->formatStateUsing(fn($state) => match ($state) {
                        'unpaid'   => 'Non payé',
                        'paid'     => 'Payé',
                        'refunded' => 'Remboursé',
                        default    => $state,
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
    Tables\Filters\SelectFilter::make('status')
        ->label('Statut')
        ->options([
            'pending'    => 'En attente',
            'paid'       => 'Payé',
            'processing' => 'En traitement',
            'shipped'    => 'Expédié',
            'delivered'  => 'Livré',
            'cancelled'  => 'Annulé',
        ]),

    Tables\Filters\SelectFilter::make('payment_status')
        ->label('Paiement')
        ->options([
            'unpaid'   => 'Non payé',
            'paid'     => 'Payé',
            'refunded' => 'Remboursé',
        ]),
])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
            RelationManagers\OrderItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view'   => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
