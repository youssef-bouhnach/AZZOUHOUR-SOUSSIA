@echo off
echo 🌿 Starting Verdant ^& Co. Application...
echo.

REM Check if backend database exists
if not exist "backend\database\database.sqlite" (
    echo 📦 Setting up backend...
    cd backend
    type nul > database\database.sqlite
    php artisan migrate:fresh --seed
    cd ..
    echo ✅ Backend setup complete!
    echo.
)

echo 🚀 Starting Laravel backend on http://localhost:8000...
start "Laravel Backend" cmd /k "cd backend && php artisan serve"

timeout /t 3 /nobreak > nul

echo 🚀 Starting React frontend on http://localhost:5173...
start "React Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Application started!
echo.
echo 📍 Frontend: http://localhost:5173
echo 📍 Backend:  http://localhost:8000
echo.
echo 👤 Test accounts:
echo    Admin: admin@verdant.co / password
echo    User:  user@verdant.co / password
echo.
echo Close the terminal windows to stop the servers
pause
