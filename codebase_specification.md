# Çetin Konak Düğün Salonu Web Sitesi - Detaylı Kod Tabanı ve Mimari Dokümantasyonu (AI-Ready Specification)

Bu doküman, **Çetin Konak Düğün Salonu** web projesinin mimarisini, dosya yapısını, veri akışını, bileşenlerin durum (state) yönetimlerini ve en ince teknik detaylarını bir yapay zekanın (LLM) projeyi tamamen anlayıp üzerinde geliştirme yapabilmesi amacıyla tasarlanmıştır.

---

## 1. Genel Bakış & Teknoloji Yığını (Tech Stack)

Proje, modern web standartlarına uygun, mobil uyumlu (responsive) ve lüks bir düğün salonu tanıtım sitesidir.

*   **Çatı (Framework):** React (v18.3.1) + TypeScript
*   **Derleme/Sunucu Aracı:** Vite (v5.4.2)
*   **Stil/Tasarım (Styling):** Tailwind CSS (v3.4.1) + Autoprefixer & PostCSS + Özel CSS Animasyonları (`src/index.css`)
*   **İkon Kütüphanesi:** Lucide React (v0.344.0)
*   **Harici Servis Bağlantısı:** Supabase JS İstemcisi (`@supabase/supabase-js` kurulu ancak servis katmanı boş durumdadır, şu an aktif veri tabanı bağlantısı yoktur).
*   **Özel Multimedya Deneyimi:**
    *   **Video Kontrolü:** `requestAnimationFrame` ve doğrusal enterpolasyon (lerp) ile kaydırma (scroll) tabanlı video oynatma/scrubbing (`/aa.mp4` dosyası).
    *   **Ses Sentezleyici (Audio Synth):** Web Audio API tabanlı dinamik frekans modülasyonlu akor üreteci (hiçbir harici ses dosyası indirmeden tarayıcıda luxury/ambient drone sentezler).
    *   **Rezervasyon:** WhatsApp API (`wa.me`) entegrasyonlu dinamik teklif formu.

---

## 2. Dizin Yapısı (Project Directory Tree)

```text
konakv2-main/
├── .bolt/                  # Bolt yapılandırma klasörü
├── dist/                   # Üretim (production) derleme çıktısı
├── node_modules/           # Node.js bağımlılıkları
├── public/                 # Statik varlıklar (Assets)
│   ├── aa.mp4              # Sinematik tur videosu (15.9 MB)
│   └── logo.png            # Çetin Konak logosu (193 KB)
├── src/                    # Kaynak kodlar
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── fotos/          # Yerel fotoğraf varlıkları
│   │   │   ├── konakdış/
│   │   │   │   └── konakgiriş.jpg
│   │   │   ├── saloniç/
│   │   │   │   ├── gelinodası.jpg
│   │   │   │   ├── salonikigiris.jpg
│   │   │   │   ├── saloniç1.jpg
│   │   │   │   └── salonsahne.jpg
│   │   │   └── logo.png
│   │   ├── AboutPreview.tsx # Ana sayfa Hakkımızda önizleme kartı
│   │   ├── Features.tsx     # 8 adet öne çıkan özellik ızgarası
│   │   ├── FloatingButtons.tsx # Sabit Hızlı Arama & Konum butonları
│   │   ├── Footer.tsx       # Sosyal medya ve hızlı linklerin olduğu alt bilgi
│   │   ├── GalleryPreview.tsx # Ana sayfa galeri önizlemesi (modal/lightbox ile)
│   │   ├── Header.tsx       # Yapışkan (Sticky) ve mobil uyumlu başlık / navigasyon
│   │   ├── Hero.tsx         # Giriş karşılama ekranı (Call to Action butonları ile)
│   │   └── Logo.tsx         # Döner ışıltılı altın kenarlıklı dinamik logo bileşeni
│   ├── pages/              # Alt sayfalar (App.tsx tarafından yönetilir)
│   │   ├── About.tsx       # Hakkımızda, Hikayemiz, Vizyon/Misyon ve Değerlerimiz
│   │   ├── CinematicTour.tsx # Kaydırma tetiklemeli sinematik sanal tur (En karmaşık bileşen)
│   │   ├── Contact.tsx     # İletişim bilgileri, sosyal medya ve Google Maps iframe
│   │   ├── Gallery.tsx     # Kategori filtreli fotoğraf galerisi ve lightbox modali
│   │   ├── Reservation.tsx # WhatsApp yönlendirmeli detaylı Teklif Formu ve SSS
│   │   └── VenueDetails.tsx # Salon kapasiteleri, özellikler ve Google Maps
│   ├── services/           # Servis entegrasyonları klasörü (Boş)
│   ├── App.tsx             # Ana uygulama bileşeni ve sayfa yönlendirici (Router)
│   ├── index.css           # Global Tailwind kuralları, mobil kaydırma fixleri, altın parıltı animasyonları
│   ├── main.tsx            # React DOM render başlangıcı
│   └── vite-env.d.ts       # Vite TypeScript ortam tanımları
├── package.json            # Bağımlılıklar ve npm scriptleri
├── tailwind.config.js      # Tailwind yapılandırması
├── tsconfig.json           # TypeScript derleme kuralları
└── vite.config.ts          # Vite derleme ayarları
```

---

## 3. Sayfa Yönlendirme ve Durum Yönetimi (`App.tsx`)

Uygulamada harici bir yönlendirici kütüphane (react-router-dom vb.) kullanılmamış, bunun yerine **state tabanlı dinamik render** tercih edilmiştir. Bu sayede sayfalar arası geçişlerde gecikme yaşanmaz ve durum kontrolü tek elden yürütülür.

### Durum (State) Tanımı:
*   `currentPage`: `'home' | 'about' | 'venue' | 'gallery' | 'contact' | 'reservation' | 'tour'` tipindedir. Varsayılan değer `'home'`'dur.

### Sayfa Akış Mantığı:
```typescript
const renderPage = () => {
  switch (currentPage) {
    case 'about':       return <About />;
    case 'venue':       return <VenueDetails />;
    case 'gallery':     return <Gallery />;
    case 'contact':     return <Contact onNavigate={setCurrentPage} />;
    case 'reservation': return <Reservation />;
    case 'tour':        return <CinematicTour onNavigate={setCurrentPage} />;
    default:
      return (
        <>
          <Hero 
            onReservation={() => setCurrentPage('reservation')} 
            onGallery={() => setCurrentPage('gallery')}
            onTour={() => setCurrentPage('tour')}
          />
          <Features />
          <GalleryPreview onViewAll={() => setCurrentPage('gallery')} />
          <AboutPreview onReadMore={() => setCurrentPage('about')} />
        </>
      );
  }
};
```
*   `Header` ve `Footer` tüm sayfalarda ortaktır ve `onNavigate` prop'u ile `currentPage` durumunu değiştirirler.
*   Her sayfa geçişinde pencere koordinatı `window.scrollTo({ top: 0, behavior: 'smooth' })` komutuyla yumuşak bir şekilde tepeye taşınır.

---

## 4. Sayfaların Teknik Özellikleri ve Detayları

### 4.1. CinematicTour.tsx (Sinematik Dijital Keşif)
Bu sayfa projenin en teknik ve görsel açıdan gelişmiş bölümüdür. Kullanıcı sayfayı aşağı kaydırdıkça video karesi ilerler veya geriler.

#### A. Video Kare Kontrol Mekanizması (Scroll-Scrubbing)
*   **Video Dosyası:** `/public/aa.mp4` (muted ve playsInline ayarlı).
*   **Nasıl Çalışır?**
    1.  Kullanıcı sayfayı kaydırdığında `window.scrollY` değerinin toplam kaydırılabilir yüksekliğe (`document.documentElement.scrollHeight - window.innerHeight`) oranı hesaplanarak `scrollProgress` ($0.0$ ile $1.0$ arasında bir sayı) bulunur.
    2.  Bulunan oran, videonun toplam süresiyle (`video.duration`) çarpılarak hedef saniye (`targetTimeRef.current`) belirlenir.
    3.  `requestAnimationFrame` döngüsü içinde, hedeflenen süre ile mevcut süre arasındaki fark doğrusal enterpolasyon (Linear Interpolation - LERP) formülüyle yumuşatılır:
        $$\text{interpolatedTime} = \text{interpolatedTime} + (\text{targetTime} - \text{interpolatedTime}) \times 0.08$$
    4.  Hesaplanan `interpolatedTime` değeri `video.currentTime`'a atanır. $0.08$ katsayısı kaydırmanın "yağ gibi akan" (smooth) bir his vermesini sağlar.

#### B. Kamera HUD (Vizör) Arayüzü
Kullanıcıyı profesyonel bir kamera arkasındaymış gibi hissettirmek için ekranda sabit bir vizör tasarımı yer alır:
*   **REC 4K Işığı:** Otomatik turdayken veya kaydırma yapıldığında kırmızı nokta yanıp söner.
*   **Zaman Kodu (Timecode):** Videonun oynatma kafasındaki saniye değerini temel alarak `SS:DD:sn:kare` (Saat:Dakika:Saniye:Kare) formatında canlı güncellenir (30 FPS varsayılmıştır).
*   **Kamera Değerleri:** `ISO 400`, `SHUTTER 1/120s`, `APERTURE f/2.8`, `FOCAL 50mm`, `FORMAT LOG-C` gibi sabit sinematik parametreler ekranda listelenir.

#### C. Web Audio API Ortam Sentezleyicisi (Synthesizer)
Harici bir müzik dosyası indirme yükünden kaçınmak ve tam bir sinematik ambiyans yaratmak için tarayıcının kendi ses motoru kullanılır:
*   **Akor Yapısı:** Luxury ve sıcak bir his veren **C Major 9th/11th** akoruna ait frekanslar üretilir:
    *   `[65.41, 130.81, 196.00, 261.63, 329.63, 392.00, 493.88]` Hz (C2, C3, G3, C4, E4, G4, B4).
*   **Ses Dalgaları:** Zengin bir koro etkisi (chorus) oluşturmak için testere dişi (`sawtooth`) ve üçgen (`triangle`) dalga tipleri karışık olarak kullanılır. Rastgele mikro-detune (`osc.detune`) eklenmiştir.
*   **Dinamik Filtre (Lowpass Filter):** Kullanıcı sayfayı hızlı kaydırdığında LERP farkı büyüyeceğinden filtre frekansı yükselir ve ses "parlaklaşır". Sabit durulduğunda filtre $200\text{Hz}$ civarına kapanarak sesin "boğuk ve derin" bir uğultuya dönüşmesini sağlar.
*   **Gain Node:** Açılışta $2$ saniyelik doğrusal artışla (`linearRampToValueAtTime`) pürüzsüz bir giriş yapar.

#### D. Otomatik Kamera Keşfi (Auto-Scroll)
*   `isAutoScrolling` aktif edildiğinde, `requestAnimationFrame` döngüsü pencereyi her karede `autoScrollSpeed` piksel kadar aşağı kaydırır.
*   Hız seçenekleri: `0.5x` ($0.4$ px/kare), `1.0x` ($0.8$ px/kare), `2.0x` ($1.5$ px/kare).

#### E. Aşamalı Hikaye Kartları (Glassmorphic Cards)
Video ilerledikçe, videonun içeriğiyle uyumlu yarı saydam (glassmorphism) bilgi kartları ekrana girer:
*   **Giriş (Intro):** $\%0 - \%18$ scroll aralığı.
*   **Kokteyl Alanı:** $\%18 - \%45$ scroll aralığı. Karşılama ve bistro detayları.
*   **Yemek Düzeni:** $\%45 - \%76$ scroll aralığı. Masa süslemeleri ve şamdanlar.
*   **Sahne & Pist:** $\%76 - \%95$ scroll aralığı. Ses ve robot ışık sistemleri.
*   **Rezervasyon:** $\%95 - \%100$ scroll aralığı. Hızlı aksiyon butonları.

---

### 4.2. Reservation.tsx (Teklif & Rezervasyon Formu)
Kullanıcıların tarih ve paket seçerek doğrudan işletmenin WhatsApp hattına bilgi göndermesini sağlar.

#### A. Form Verisi Yapısı (State):
```typescript
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  eventDate: '',
  eventTime: '',
  eventType: '',
  guestCount: '',
  package: '',
  notes: ''
});
```

#### B. WhatsApp Entegrasyonu:
Form gönderildiğinde tarayıcı üzerinden şu API tetiklenir:
*   **WhatsApp Numarası:** `+90 541 451 38 06`
*   **Metin Biçimlendirme:** Form verileri düzgün satırlar halinde birleştirilir ve `encodeURIComponent` ile URL'e güvenli hale getirilerek `https://wa.me/905414513806?text=...` adresi yeni sekmede açılır.

#### C. Rezervasyon Bilgileri & Koşulları:
*   Rezervasyon kesinleşmesi için $\%30$ ön ödeme şartı.
*   Etkinliğe 30 gün kalana kadar iptal ve 45 gün öncesine kadar tarih değişiklik hakları.
*   Kapasite aralığı: $50$ ile $900$ kişi arası giriş sınırı (`min="50"`, `max="900"`).

---

### 4.3. Gallery.tsx (Kategori Filtreli Fotoğraf Galerisi)
*   **Kategoriler:** Tümü, Salon, Küçük Salon, Dekorasyon, Düğünler, Yemek.
*   **Resim Kaynakları:**
    *   Yerel klasörden aktarılan 4 adet ana görsel (`gelinodası.jpg`, `salonikigiris.jpg`, `saloniç1.jpg`, `salonsahne.jpg`).
    *   Pexels üzerinden çekilen yüksek çözünürlüklü tematik stok görseller.
*   **Lightbox Özelliği:** Herhangi bir resme tıklandığında `selectedImage` state'ine resim URL'i atanır. Sabit konumlandırılmış (`fixed inset-0 bg-black/90`), tam ekran bir görsel görüntüleyici açılır. Kapatma butonu veya arka plana tıklama ile modal kapatılır.

---

### 4.4. VenueDetails.tsx & About.tsx & Contact.tsx
*   **VenueDetails:** Salonun detaylı teknik özelliklerini (klima, JBL ses sistemi, 30 araçlık otopark vb.) ve Bursa/Karacabey'deki konumu gösteren gömülü bir Google Haritalar iframe'ini barındırır.
*   **About:** Çetin ailesi tarafından 2022'de Karacabey Esentepe'de kurulan düğün salonunun hikayesini, $400\text{m}^2$ büyüklüğündeki çim bahçe kafesini, vizyon ve misyonunu açıklar.
*   **Contact:** Hızlı arama butonları, detaylı çalışma saatleri (`09:00 - 22:00`), sosyal medya yönlendirmeleri ve detaylı harita görünümünü içerir.

---

## 5. Önemli Arayüz Bileşenleri (UI Components)

### 5.1. Logo.tsx (Altın Parıltılı Çerçeveli Logo)
Görsel olarak üst düzey bir tasarım sunmak amacıyla, logoyu çevreleyen ve sürekli dönen altın bir ışıltı çerçevesi CSS ile tasarlanmıştır:
```css
.logo-border-effect {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: linear-gradient(90deg, transparent 0%, transparent 20%, #D4AF37 40%, #B8860B 50%, #D4AF37 60%, transparent 80%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer-border 3s linear infinite;
}
```
*   Logonun arkasındaki bu degrade sınır çizgisi `shimmer-border` animasyonu ile sürekli kayarak altın sarısı parıltı efekti yaratır.

### 5.2. FloatingButtons.tsx (Sabit İletişim Butonları)
*   Ekranın sağ alt köşesinde sabittir (`fixed bottom-6 right-6 z-40`).
*   **Telefon Butonu:** Tıklandığında `tel:+905414513806` adresini çalıştırır.
*   **Konum Butonu:** Tıklandığında salonun tam konumunu Google Haritalar'da yeni sekmede açar.
*   Mobil cihazlarda parmakla basma alanını optimize etmek için minimum dokunma alanı kurallarına uygun olarak `min-h-[56px] min-w-[56px]` olarak ayarlanmıştır.

### 5.3. Features.tsx (Öne Çıkan Özellikler)
*   **Kapasite, Otopark, Klima, Ses Sistemi, Yemek, Fotoğraf Köşesi, Gelin Odası, Gece Boyu Eğlence** başlıklarını barındırır.
*   Tailwind'in transform özellikleri kullanılarak üzerine gelindiğinde (hover) yukarı doğru $2$ birim kayma (`hover:-translate-y-2`) ve ikonların büyümesi gibi mikro animasyonlara sahiptir.

---

## 6. Stil Sistemi ve Optimizasyonlar (`src/index.css`)

Mobil cihazlarda mükemmel bir kullanıcı deneyimi (UX) sunmak için CSS düzeyinde özel çözümler uygulanmıştır:

### A. Mobil Touch Delay ve Highlight Engelleme
Mobil cihazlarda butonlara basıldığında oluşan mavi gölgeyi ve tıklama gecikmelerini önlemek amacıyla global sıfırlama yapılmıştır:
```css
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
```

### B. iOS Safari Zoom Hatasını Önleme
iOS Safari, mobil cihazlarda `font-size` değeri `16px`'den küçük olan girdi kutularına (input) odaklanıldığında ekranı otomatik olarak yakınlaştırır (zoom). Bunu engellemek için tüm form elemanları `16px` tabanına zorlanmıştır:
```css
@media screen and (max-width: 768px) {
  input, textarea, select {
    font-size: 16px !important;
  }
}
```

### C. Golden Shimmer Animasyonu
Ana sayfadaki büyük slogan başlıklarının içinden geçen altın rengi ışık dalgası efekti:
```css
.golden-text-shimmer {
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 25%, rgba(212, 175, 55, 0.8) 40%, rgba(255, 215, 0, 1) 50%, rgba(212, 175, 55, 0.8) 60%, #ffffff 75%, #ffffff 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-text 12s ease-in-out infinite;
}
```
*   Tarayıcının `background-clip` özelliğini desteklemediği durumlarda hata vermemesi için `@supports not (-webkit-background-clip: text)` medya sorgusu ile şık bir text-shadow gölge düşürme alternatifi eklenmiştir.

### D. Safe Area Padding (Çentik Uyumları)
Yeni nesil ekran çentikli telefonlar (örn. iPhone X ve üstü modeller) yatay veya dikey tutulduğunda içeriğin çentik altında kalmasını önlemek için CSS env değişkenleri kullanılmıştır:
```css
.safe-area-top { padding-top: env(safe-area-inset-top); }
.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
```

---

## 7. Derleme ve Yapılandırma Dosyaları

*   **vite.config.ts:** `@vitejs/plugin-react` eklentisini kullanır. Sunucu port yapılandırmasında `--host` parametresi eklenerek yerel ağda mobil cihazlardan kolay test edilmesi sağlanmıştır (`npm run dev` ile ağa açılır).
*   **tailwind.config.js:** Standart Tailwind kurulumu olup `content` alanında `index.html` ve `./src/**/*.{js,ts,jsx,tsx}` dosyalarını tarar.
*   **tsconfig.json / tsconfig.app.json:** Katı tip kontrol kuralları (`strict: true`) aktif edilmiş, Vite ortamına uygun şekilde yapılandırılmıştır.
