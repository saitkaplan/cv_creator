# 📄 CV Creator - Modern CV Builder
> *Created by Sait Kaplan*

Modern, kullanıcı dostu ve ATS (Applicant Tracking System) uyumlu CV oluşturma uygulaması. React ve Vite ile geliştirilmiş, PDF ve PNG export özellikleri ile profesyonel CV'ler oluşturun.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Özellikler

### 🎯 **Temel Özellikler**
- 📝 **Farklı Dil Desteği** - Türkçe ve İngilizce
- 🎨 **Modern UI/UX** - Responsive ve Kullanıcı Dostu Arayüz
- 📱 **Mobil Uyumlu** - Tüm Cihazlarda Mükemmel Görünüm
- ⚡ **Hızlı ve Performanslı** - Vite ile Optimize Edilmiş

### 📄 **CV Bölümleri**
- 👤 **Kişisel Bilgiler** - Fotoğraf ve İletişim Bilgileri
- 🎓 **Eğitim Geçmişi** - Derece, Kurum, Tarih Aralıkları
- 💼 **İş Deneyimi** - Şirket, Pozisyon, Başarılar
- 🛠️ **Yetenekler** - Seviye ve Kategori Bazlı
- 🌍 **Dil Becerileri** - Seviye Belirtme
- 🏆 **Sertifikalar & Başarılar**
- 📊 **Projeler**
- 🎖️ **Askerlik Durumu & Ehliyet**

### 🚀 **Export Özellikleri**
- 📄 **PDF Export** - A4 Formatında Yüksek Kalite Çıktılar
- 🖼️ **PNG Export** - Görsel Format
- 🖨️ **Print** - Direkt Yazdırma ve İndirme Seçeneği
- 💾 **Local Storage** - Verilerinizi Kaydedin

### 🎯 **ATS Uyumluluğu**
- ✅ **Profesyonel Özet** - ATS sistemleri için optimize edilmiş!
- ✅ **Temiz Format** - Otomatik sistemler tarafından okunabilir!
- ✅ **Anahtar Kelime Optimizasyonu**

## 🛠️ Teknolojiler

- **Frontend:** React 19.1.0
- **Build Tool:** Vite 7.0.4
- **PDF Generation:** jsPDF, html2pdf.js
- **Print:** react-to-print
- **Image Processing:** html2canvas
- **Styling:** CSS3
- **Linting:** ESLint

## 🚀 Kurulum

### **Gereksinimler**
- Node.js (v16 veya üzeri)
- npm veya yarn

### **Adımlar**

1. **Repository'yi Klonlayın**
```bash
git clone https://github.com/saitkaplan/cv_creator.git
cd cv-creator
```

2. **Bağımlılıkları Yükleyin**
```bash
npm install
```

3. **Development Server'ı Başlatın**
```bash
npm run dev
```

4. **Tarayıcıda Açın**
```
http://localhost:5173
```

## 📖 Kullanım

### 🎯 **CV Oluşturma Adımları**

1. **Kişisel Bilgiler**
   - Ad, Soyad, e-Posta, Telefon
   - LinkedIn, GitHub Profilleri
   - Profil Fotoğrafı Yükleme
   - Profesyonel Özet Yazma

2. **Eğitim Bilgileri**
   - Kurum Adı, Derece, Alan
   - Başlangıç - Bitiş Tarihleri
   - GPA yani GANO ve Açıklama (opsiyonel)

3. **İş Deneyimi**
   - Şirket Adı, Pozisyon
   - İş Tanımı ve Başarılar
   - Kullanılan Teknolojiler

4. **Diğer Bölümler**
   - Yetenekler
   - Dil Becerileri
   - Projeler
   - Sertifikalar

### 💾 **Export İşlemleri**

- **PDF Export:** A4 Formatında Profesyonel CV
- **PNG Export:** Görsel Format
- **Print:** Direkt Yazdırma
- **Local Storage:** Verilerinizi Kaydetme

## 🎨 Özelleştirme

### **Dil Değiştirme**
```javascript
// Türkçe
updateCVLanguage('tr')

// İngilizce  
updateCVLanguage('en')
```

### **Tarih Formatları (Özelleştirilebilir Format Ayarı)**
- Ay-Yıl: `07.2021`
- Sadece Yıl: `2021`

## 📁 Proje Yapısı

```
cv-creator/
├── public/               # Statik Dosyalar
├── src/
│   ├── App.jsx           # Ana Uygulama Bileşeni
│   ├── App.css           # Ana Stil Dosyası
│   ├── main.jsx          # Giriş Noktası
│   └── assets/           # Görseller
├── package.json          # Bağımlılıklar
├── vite.config.js        # Vite Konfigürasyonu
└── README.md             # Bu dosya
```

## 🚀 Üretim Yapısı

```bash
# Üretim Yapısı
npm run build

# Üretim Yapısının Önizlemesi
npm run preview

# Lint Kontrolü
npm run lint
```

## ⚖️ Lisans ve Kullanım Koşulları

Bu proje [MIT Lisansı](./LICENSE) altında lisanslanmıştır.

> **Tüm hakları Sait Kaplan'a aittir.** 
> Yeniden dağıtım ve yeniden kullanıma lisans koşulları altında izin verilir, ancak:
>
> - ❌ Bu çalışmanın **yazarlığını** iddia edemezsiniz.
> - ❌ **Lisans veya kredi bildirimlerini** kaldıramazsınız.
> - ❌ İzin almadan **ticari amaçlarla** kullanamazsınız.
>
> ✅Lisansa saygı gösterin ve **orijinal yazara** atıfta bulunun.

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [jsPDF](https://github.com/parallax/jsPDF) - PDF Generation
- [html2canvas](https://html2canvas.hertzen.com/) - Canvas Conversion

## 📞 İletişim

- **GitHub:** [Sait Kaplan](https://github.com/saitkaplan)
- **E-mail**: [Sait Kaplan](mailto:sait.kaplan@icloud.com)
- **LinkedIn**: [Sait Kaplan](https://www.linkedin.com/in/saitkaplan)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
