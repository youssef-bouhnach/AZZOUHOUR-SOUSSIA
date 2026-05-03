#!/bin/bash

echo "🌿 Starting Verdant & Co. Application..."
echo ""

# Check if backend is set up
if [ ! -f "backend/database/database.sqlite" ]; then
    echo "📦 Setting up backend..."
    cd backend
    touch database/database.sqlite
    php artisan migrate:fresh --seed
    cd ..
    echo "✅ Backend setup complete!"
    echo ""
fi

# Start backend
echo "🚀 Starting Laravel backend on http://localhost:8000..."
cd backend
php artisan serve &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 2

# Start frontend
echo "🚀 Starting React frontend on http://localhost:5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend:  http://localhost:8000"
echo ""
echo "👤 Test accounts:"
echo "   Admin: admin@verdant.co / password"
echo "   User:  user@verdant.co / password"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
