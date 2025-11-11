# Windows Firewall'u Vite Dev Server için açma scripti
# Bu scripti PowerShell'i YÖNETİCİ OLARAK açıp çalıştırın

Write-Host "Vite Dev Server için Firewall kuralı ekleniyor..." -ForegroundColor Yellow

# Gelen trafik için kural ekle
netsh advfirewall firewall add rule name="Vite Dev Server (TCP 5173)" dir=in action=allow protocol=TCP localport=5173

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Firewall kuralı başarıyla eklendi!" -ForegroundColor Green
    Write-Host "Mobil cihazınızdan şu adresleri deneyin:" -ForegroundColor Cyan
    Write-Host "  - http://192.168.1.133:5173" -ForegroundColor White
    Write-Host "  - http://10.2.0.2:5173" -ForegroundColor White
} else {
    Write-Host "✗ Hata: Bu scripti YÖNETİCİ OLARAK çalıştırmanız gerekiyor!" -ForegroundColor Red
    Write-Host "PowerShell'i sağ tıklayıp 'Yönetici olarak çalıştır' seçeneğini kullanın." -ForegroundColor Yellow
}


