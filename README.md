# ÇLB Yapı - Mimarlık • Mühendislik • İnşaat

Modern ve profesyonel bir mimarlık firması web sitesi ve admin paneli.

## Özellikler

### Ana Site
- ✅ Responsive tasarım
- ✅ Modern ve şık arayüz
- ✅ Animasyonlu SVG grafikler
- ✅ Dinamik proje portföyü
- ✅ İletişim formu
- ✅ SEO dostu yapı

### Admin Paneli
- ✅ Güvenli giriş sistemi
- ✅ Proje yönetimi (CRUD işlemleri)
- ✅ Resim yükleme ve yönetimi
- ✅ Kategori filtreleme
- ✅ Dashboard istatistikleri
- ✅ Responsive admin arayüzü

## Kurulum

### Gereksinimler
- Python 3.7+
- pip

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd clb-mimarlik-main
```

2. **Sanal ortam oluşturun:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate  # Windows
```

3. **Bağımlılıkları yükleyin:**
```bash
pip install -r requirements.txt
```

4. **Uygulamayı çalıştırın:**
```bash
python app.py
```

5. **Tarayıcıda açın:**
```
http://localhost:5000
```

## Admin Paneli Erişimi

### Varsayılan Giriş Bilgileri
- **URL:** `http://localhost:5000/admin`
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

### Admin Paneli Özellikleri
- **Dashboard:** Proje istatistikleri ve genel bakış
- **Projeler:** Tüm projeleri görüntüleme, düzenleme ve silme
- **Yeni Proje Ekleme:** Resim yükleme ile proje ekleme
- **Proje Düzenleme:** Mevcut projeleri güncelleme

## Proje Yapısı

```
clb-mimarlik-main/
├── app.py                 # Flask uygulaması
├── requirements.txt       # Python bağımlılıkları
├── README.md             # Bu dosya
├── templates/            # HTML şablonları
│   ├── index.html        # Ana sayfa
│   └── admin/            # Admin paneli şablonları
│       ├── login.html
│       ├── dashboard.html
│       ├── projects.html
│       ├── new_project.html
│       └── edit_project.html
├── static/               # Statik dosyalar
│   ├── styles.css        # CSS stilleri
│   ├── script.js         # JavaScript kodları
│   ├── images/           # Resimler
│   └── uploads/          # Yüklenen proje resimleri
└── clb_yapi.db          # SQLite veritabanı (otomatik oluşturulur)
```

## API Endpoints

### Projeler
- `GET /api/projects` - Tüm projeleri listele
- `GET /api/projects?category=architecture` - Kategoriye göre filtrele
- `GET /api/projects/<id>` - Belirli projeyi getir

### Admin
- `GET /admin` - Admin giriş sayfası
- `POST /admin/login` - Admin girişi
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/projects` - Proje listesi
- `GET /admin/projects/new` - Yeni proje formu
- `POST /admin/projects/new` - Yeni proje ekle
- `GET /admin/projects/<id>/edit` - Proje düzenleme formu
- `POST /admin/projects/<id>/edit` - Proje güncelle
- `POST /admin/projects/<id>/delete` - Proje sil

## Veritabanı Modelleri

### Admin
- `id`: Birincil anahtar
- `username`: Kullanıcı adı
- `password_hash`: Şifre hash'i
- `email`: E-posta adresi
- `created_at`: Oluşturulma tarihi

### Project
- `id`: Birincil anahtar
- `title`: Proje başlığı
- `description`: Proje açıklaması
- `category`: Kategori (architecture, engineering, construction)
- `image_path`: Resim dosya yolu
- `client`: Müşteri adı
- `location`: Proje konumu
- `completion_date`: Tamamlanma tarihi
- `status`: Durum (completed, ongoing, planned)
- `created_at`: Oluşturulma tarihi
- `updated_at`: Güncellenme tarihi

## Güvenlik

- Şifreler bcrypt ile hash'lenir
- Session tabanlı kimlik doğrulama
- CSRF koruması
- Dosya yükleme güvenliği
- SQL injection koruması

## Özelleştirme

### Renkler ve Tema
Ana renkler `static/styles.css` dosyasında tanımlanmıştır:
- Birincil renk: `#1a237e`
- İkincil renk: `#3949ab`
- Vurgu rengi: `#1976d2`

### Logo ve Resimler
- Logo: `static/images/logo.jpg`
- Proje resimleri: `static/uploads/` klasörüne yüklenir

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

ÇLB Yapı - Mimarlık • Mühendislik • İnşaat
- E-posta: info@clbyapi.com
- Telefon: +90 (212) 555 01 01
- Adres: İstanbul, Türkiye 