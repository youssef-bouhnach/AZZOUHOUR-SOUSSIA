<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\DeliveryAssignment;
use App\Models\Order;
use App\Models\PlantDetails;
use App\Models\User;
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

    protected static ?string $navigationIcon  = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = 'Ventes';
    protected static ?int    $navigationSort  = 1;

    public static function getNavigationLabel(): string
    {
        return __('admin.orders.plural_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.nav.ventes');
    }

    public static function getModelLabel(): string
    {
        return __('admin.orders.label');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.orders.plural_label');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\Section::make(fn() => __('admin.order.section_info'))
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->required(),

                        Forms\Components\Select::make('status')
                            ->options(fn() => [
                                'pending' => __('admin.status.pending'),
                                'paid' => __('admin.status.paid'),
                                'processing' => __('admin.status.processing'),
                                'shipped' => __('admin.status.shipped'),
                                'delivered' => __('admin.status.delivered'),
                                'cancelled' => __('admin.status.cancelled'),
                            ])
                            ->required(),

                        Forms\Components\Select::make('payment_status')
                            ->options(fn() => [
                                'unpaid' => __('admin.payment_status.unpaid'),
                                'paid' => __('admin.payment_status.paid'),
                                'refunded' => __('admin.payment_status.refunded'),
                            ])
                            ->required(),

                        Forms\Components\TextInput::make('payment_method')
                            ->label(fn() => __('admin.order.payment_method'))
                            ->placeholder('cmi, cash...'),

                        Forms\Components\TextInput::make('subtotal')
                            ->label(fn() => __('admin.order.subtotal'))
                            ->numeric()->required()->suffix('MAD'),

                        Forms\Components\TextInput::make('total')
                            ->label(fn() => __('admin.order.total'))
                            ->numeric()->required()->suffix('MAD'),
                        Forms\Components\Select::make('deliveryAssignment.delivery_man_id')
                            ->label('Assigner un livreur')
                            ->options(User::where('role', 'deliveryman')->pluck('name', 'id'))
                            ->searchable()
                            ->nullable()
                            ->reactive(),

                        Forms\Components\TextInput::make('cmi_order_id')
                            ->label(fn() => __('admin.order.cmi_order_id')),
                    ]),

                Forms\Components\Section::make(fn() => __('admin.order.section_shipping'))
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('shipping_name')
                            ->label(fn() => __('admin.order.shipping_name'))->required(),
                        Forms\Components\TextInput::make('shipping_phone')
                            ->label(fn() => __('admin.order.shipping_phone'))->tel(),
                        Forms\Components\TextInput::make('shipping_address')
                            ->label(fn() => __('admin.order.shipping_address'))
                            ->required()->columnSpanFull(),
                        Forms\Components\TextInput::make('shipping_city')
                            ->label(fn() => __('admin.order.shipping_city'))->required(),
                        Forms\Components\TextInput::make('shipping_country')
                            ->label(fn() => __('admin.order.shipping_country'))->default('MA'),
                        Forms\Components\Textarea::make('notes')
                            ->label(fn() => __('admin.order.notes'))->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label(fn() => __('admin.order.id'))->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label(fn() => __('admin.order.client'))->searchable()->sortable(),

                Tables\Columns\TextColumn::make('shipping_city')
                    ->label(fn() => __('admin.order.city'))->searchable(),

                Tables\Columns\TextColumn::make('total')
                    ->label(fn() => __('admin.order.total'))->money('MAD')->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label(fn() => __('admin.order.status'))
                    ->colors([
                        'gray' => 'pending',
                        'success' => 'paid',
                        'primary' => 'processing',
                        'info' => 'shipped',
                        'danger' => 'cancelled',
                    ])
                    ->formatStateUsing(fn($state) => __('admin.status.' . $state, [], app()->getLocale()) ?: $state),


                Tables\Columns\TextColumn::make('payment_status')
                    ->label('Paiement')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'paid' => 'success',
                        'collected_by_deliveryman' => 'warning',
                        'unpaid' => 'danger',
                    }),

                Tables\Columns\TextColumn::make('deliveryAssignment.deliveryMan.name')
                    ->label('Livreur')
                    ->default('—')
                    ->badge()
                    ->color('warning'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(fn() => __('admin.order.date'))->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label(fn() => __('admin.order.status'))
                    ->options(fn() => [
                        'pending' => __('admin.status.pending'),
                        'paid' => __('admin.status.paid'),
                        'processing' => __('admin.status.processing'),
                        'shipped' => __('admin.status.shipped'),
                        'delivered' => __('admin.status.delivered'),
                        'cancelled' => __('admin.status.cancelled'),
                    ]),

                Tables\Filters\SelectFilter::make('payment_status')
                    ->label(fn() => __('admin.order.payment'))
                    ->options(fn() => [
                        'unpaid' => __('admin.payment_status.unpaid'),
                        'paid' => __('admin.payment_status.paid'),
                        'refunded' => __('admin.payment_status.refunded'),
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                // admin can assign directly from the list without opening each order
                Tables\Actions\Action::make('assign')
                    ->label('Assigner')
                    ->icon('heroicon-o-truck')
                    ->form([
                        Forms\Components\Select::make('delivery_man_id')
                            ->label('Livreur')
                            ->options(User::where('role', 'deliveryMan')->pluck('name', 'id'))
                            ->required(),
                    ])
                    ->action(function (Order $record, array $data) {
                        DeliveryAssignment::updateOrCreate(
                            ['order_id' => $record->id],
                            ['delivery_man_id' => $data['delivery_man_id'], 'status' => 'assigned']
                        );
                    }),
                Tables\Actions\Action::make('confirm_payment')
                    ->label('Confirmer paiement')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn(Order $record) => $record->payment_status === 'collected_by_deliveryman')
                    ->action(fn(Order $record) => $record->update(['payment_status' => 'paid'])),

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
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
