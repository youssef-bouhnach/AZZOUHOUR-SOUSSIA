<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeliveryManController extends Controller
{
    //  /api/delivery/orders
    public function myOrders()
    {
        $orders = Auth::user()
            ->deliveryAssignments()
            ->with(['order.user', 'order.deliveryAssignment'])
            ->get()
            ->map(fn($a) => $a->order);

        return response()->json([
            "orders" => $orders
        ]);
    }

    // /api/delivery/orders/{order}/status
    public function updateOrder(Request $request, Order $order)
    {
        $assignment = $order->deliveryAssignment;

        // Make sure this deliveryMan owns this assignment
        abort_if($assignment->delivery_man_id !== Auth::id(), 403);

        $request->validate([
            'action' => 'required|in:delivered,canceled',
        ]);

        if ($request->action === 'delivered') {
            $assignment->update(['status' => 'delivered']);
            $order->update([
                'status'         => 'delivered',
                'payment_status' => 'collected_by_deliveryman',
            ]);
        }

        if ($request->action === 'canceled') {
            $assignment->update(['status' => 'canceled']);
            $order->update([
                'status'         => 'canceled',
                'payment_status' => 'unpaid',
            ]);
        }

        return response()->json(['message' => 'Order updated.']);
    }
}
