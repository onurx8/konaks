@echo off
echo ========================================
echo Vite Dev Server - Firewall Acma
echo ========================================
echo.
echo Bu script Windows Firewall'u port 3000 icin acacak.
echo YONETICI OLARAK CALISTIRMANIZ GEREKIYOR!
echo.
pause

netsh advfirewall firewall add rule name="Vite Dev Server (TCP 3000)" dir=in action=allow protocol=TCP localport=3000

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Firewall kurali basariyla eklendi!
    echo.
    echo Mobil cihazinizdan su adresleri deneyin:
    echo   http://192.168.1.133:3000
    echo   http://10.2.0.2:3000
    echo.
) else (
    echo.
    echo [HATA] Bu scripti YONETICI OLARAK calistirmaniz gerekiyor!
    echo Dosyaya sag tiklayip "Yonetici olarak calistir" secenegini kullanin.
    echo.
)

pause

