//onurx
import { useState, FormEvent } from 'react';
import { Send, Info, HelpCircle, CheckCircle } from 'lucide-react';

function Reservation() {
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

  const eventTimes = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const eventTypes = ['Düğün', 'Nişan', 'Kına Gecesi', 'Doğum Günü', 'Kurumsal Etkinlik', 'Diğer'];
  const packages = [
    { value: 'kina', label: 'Kına Paketi', desc: 'Standart dekorasyon' },
    { value: 'sunnet', label: 'Sünnet Paketi', desc: 'Özel dekorasyon' },
    { value: 'dugun', label: 'Düğün Paketi', desc: 'Lüks dekorasyon' },
    { value: 'diger', label: 'Diğer Paket', desc: 'Özel talep ve özelleştirme' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const selectedPackage = packages.find(p => p.value === formData.package);
    const packageInfo = selectedPackage
      ? `${selectedPackage.label} (${selectedPackage.desc})`
      : formData.package;

    const message = `Merhaba Çetin Konak Düğün Salonu, web siteniz üzerinden bir teklif talebim bulunmaktadır.

Ad-Soyad: ${formData.fullName}
Telefon: ${formData.phone}
E-Posta: ${formData.email}
Etkinlik: ${formData.eventType} - ${formData.eventDate} - ${formData.eventTime}
Misafir Sayısı: ${formData.guestCount}
Seçilen Paket: ${packageInfo}
Notlar: ${formData.notes || 'Belirtilmedi'}

En kısa sürede geri dönüşünüzü rica ederim.`;

    const whatsappUrl = `https://wa.me/905414513806?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="relative h-[250px] sm:h-[300px] flex items-center justify-center mt-20 overflow-hidden border-b border-white/5">
        {/* Massive Static Text Background (Watermark) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 select-none">
          <span className="text-[45px] sm:text-[80px] md:text-[130px] lg:text-[200px] xl:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] tracking-tighter whitespace-nowrap drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            ÇETİN KONAK
          </span>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3E5AB] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wide mb-3 sm:mb-4">
            Rezervasyon
          </h1>
          <div className="luxury-divider w-20 sm:w-24 mx-auto mb-3 sm:mb-4"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-5 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Teklif Formu</h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      Adınız Soyadınız <span className="text-red-1000">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                      placeholder="Adınız ve Soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      E-posta Adresiniz <span className="text-red-1000">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      Telefon Numaranız <span className="text-red-1000">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      Etkinlik Tarihi <span className="text-red-1000">*</span>
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      Etkinlik Saati <span className="text-red-1000">*</span>
                    </label>
                    <select
                      name="eventTime"
                      required
                      value={formData.eventTime}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                    >
                      <option value="" className="bg-[#1a1a1a] text-white">Saat Seçiniz</option>
                      {eventTimes.map(time => (
                        <option key={time} value={time} className="bg-[#1a1a1a] text-white">{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1.5 sm:mb-2">
                      Etkinlik Türü <span className="text-red-1000">*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all touch-manipulation"
                    >
                      <option value="" className="bg-[#1a1a1a] text-white">Etkinlik Türü Seçiniz</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type} className="bg-[#1a1a1a] text-white">{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Misafir Sayısı <span className="text-red-1000">*</span>
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    required
                    min="50"
                    max="900"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                    placeholder="Misafir sayısı (50-900)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 sm:mb-3">
                    Paket Seçimi <span className="text-red-1000">*</span>
                  </label>
                  <div className="space-y-2 sm:space-y-3">
                    {packages.map(pkg => (
                      <label
                        key={pkg.value}
                        className={`flex items-start p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all touch-manipulation min-h-[60px] ${
                          formData.package === pkg.value
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                            : 'border-white/10 hover:border-[#D4AF37]/50 active:border-[#D4AF37]/30 bg-white/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name="package"
                          value={pkg.value}
                          required
                          checked={formData.package === pkg.value}
                          onChange={handleChange}
                          className="mt-1 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <div className="ml-2 sm:ml-3">
                          <div className="font-semibold text-white text-sm sm:text-base">{pkg.label}</div>
                          <div className="text-xs sm:text-sm text-gray-400">{pkg.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Notlar
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all resize-none touch-manipulation"
                    placeholder="Özel isteklerinizi belirtebilirsiniz..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-3 sm:py-3.5 md:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-[#B8860B] hover:to-[#D4AF37] active:from-[#A67A0A] active:to-[#B8860B] transition-all shadow-2xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 active:shadow-md transform active:scale-[0.98] hover:scale-[1.02] flex items-center justify-center space-x-2 touch-manipulation min-h-[52px]"
                >
                  <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Teklif Al (WhatsApp)</span>
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-2xl shadow-2xl shadow-[#D4AF37]/20 p-4 sm:p-5 md:p-6 text-white">
              <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Info className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-1" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Rezervasyon Bilgileri</h3>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Rezervasyon talebinizi aldıktan sonra ekibimiz 24 saat içinde sizinle iletişime geçecektir. Telefonla hızlı bilgi almak isterseniz{' '}
                    <a href="tel:+905414513806" className="font-bold underline touch-manipulation min-h-[44px] inline-flex items-center">
                      +90 541 451 38 06
                    </a>{' '}
                    numaralı telefondan bize ulaşabilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4 sm:p-5 md:p-6">
              <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-1 text-[#D4AF37]" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Rezervasyon Koşulları</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    <li>• Rezervasyon kesinleşmesi için %30 ön ödeme gerekmektedir.</li>
                    <li>• Etkinlik tarihine 30 gün kalana kadar iptal durumunda ödeme iade edilir.</li>
                    <li>• Tarih değişikliği için etkinlikten en az 45 gün önce bilgi verilmelidir.</li>
                    <li>• Özel menü talepleri etkinlikten en az 15 gün önce bildirilmelidir.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-4 sm:p-5 md:p-6">
              <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5 sm:mt-1 text-[#D4AF37]" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Sık Sorulan Sorular</h3>
                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div>
                      <p className="font-semibold text-white mb-1">Rezervasyon için ne kadar önceden başvurmalıyım?</p>
                      <p className="text-gray-400">Özellikle yaz ve bahar ayları için en az 6 ay önceden rezervasyon yapmanızı öneririz.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Kendi ikramlarımızı getirebilir miyiz?</p>
                      <p className="text-gray-400">Düğün pastası hariç dışarıdan ikram getirilmesine izin verilmemektedir.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Minimum ve maksimum misafir sayınız nedir?</p>
                      <p className="text-gray-400">Minimum 50, maksimum 900 kişi ağırlayabiliyoruz. Alt kat büyük salonda 700, üst kat küçük salonda 200 kişi kapasitemiz bulunmaktadır.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
