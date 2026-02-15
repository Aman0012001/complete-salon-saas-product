@echo off
echo Starting Salon SaaS (Frontend + Backend)...
start cmd /k "C:\xampp\php\php.exe -S localhost:8000 -t backend backend/router.php"
start cmd /k "cd /d e:\salon saas\Saloon-Saas-main\frontend && npm run dev"
echo Both servers are starting...
echo.
echo Dashboard: http://localhost:5174
echo Backend: http://localhost:8000
pause
