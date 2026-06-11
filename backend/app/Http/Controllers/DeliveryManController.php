<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DeliveryManController extends Controller
{
    // GET /api/delivery/dashboard
    public function dashboard()
    {
        $user = Auth::user();

        $assignments = $user->deliveryAssignments()->with('order')->get();

        $delivered = $assignments->where('status', 'delivered')->count();
        $assigned  = $assignments->whereIn('status', ['assigned', 'in_progress'])->count();

        // Total collected today (delivered orders where order was updated today)
        $todayTotal = $assignments
            ->where('status', 'delivered')
            ->filter(fn($a) => $a->updated_at && Carbon::parse($a->updated_at)->isToday())
            ->sum(fn($a) => $a->order?->total ?? 0);

        // Last 5 delivered orders
        $lastDelivered = $assignments
            ->where('status', 'delivered')
            ->sortByDesc('updated_at')
            ->take(5)
            ->map(fn($a) => [
                'id' => $a->order?->id,
                'shipping_name' => $a->order?->shipping_name,
                'shipping_city' => $a->order?->shipping_city,
                'total'  => $a->order?->total,
                'currency' => $a->order?->currency ?? 'MAD',
                'delivered_at'  => $a->updated_at,
            ])
            ->values();

        return response()->json([
            'delivered' => $delivered,
            'assigned' => $assigned,
            'total_payment_day' => round($todayTotal, 2),
            'last_delivered' => $lastDelivered,
        ]);
    }

    //  /api/delivery/orders
    public function myOrders()
    {
        $orders = Auth::user()
            ->deliveryAssignments()
            ->with(['order.user', 'order.deliveryAssignment', 'order.items'])
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
                'status'         => 'delivery',
                // Cash collected by the deliveryman — admin must confirm to mark as paid
                'payment_status' => 'collected_by_deliveryman',
            ]);
        }

        if ($request->action === 'canceled') {
            $assignment->update(['status' => 'canceled']);
            $order->update([
                'status'         => 'cancelled',
                'payment_status' => 'unpaid',
            ]);
        }

        return response()->json(['message' => 'Order updated.']);
    }

    // GET /api/delivery/profile
    public function profile()
    {
        $user = Auth::user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'role' => $user->role,
        ]);
    }
}
