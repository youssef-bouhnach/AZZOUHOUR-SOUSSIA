<?php

namespace App\Filament\Resources\DeliveryManResource\Pages;

use App\Filament\Resources\DeliveryManResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDeliveryMan extends EditRecord
{
    protected static string $resource = DeliveryManResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
