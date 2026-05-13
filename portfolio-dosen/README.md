# Portfolio Dosen

Platform berbasis web untuk portfolio dosen Indonesia dengan sistem autentikasi aman menggunakan Supabase.

## 🚀 Fitur Utama

### Public Pages
- **Home**: Landing page dengan informasi dan statistik platform
- **About**: Penjelasan lengkap manfaat website untuk dosen dan publik
- **Portfolio**: Direktori dosen terverifikasi dengan karya ilmiah mereka
- **Contact**: Form kontak untuk komunikasi

### Authentication & Authorization
- **Register**: Pendaftaran dosen baru dengan NIDN
- **Login**: Autentikasi aman dengan Supabase Auth
- **Role-based Access**: Admin dan Dosen dengan hak akses berbeda

### Dashboard Dosen
- ✅ Curriculum Vitae digital lengkap
  - Nama, NIDN, Institusi
  - Bidang keahlian
  - Bio singkat
  - Riwayat pendidikan
- ✅ Upload Karya Ilmiah
  - Paper/Publikasi jurnal
  - Buku dan bab buku
  - HKI (Paten, Hak Cipta, Merek, dll)
  - Proyek penelitian
  - Video pembelajaran
  - Penghargaan
  - Sertifikasi
- ✅ Status verifikasi akun
- ✅ Manage portfolio karya

### Dashboard Admin
- ✅ Verifikasi pendaftaran dosen baru
- ✅ Lihat semua dosen terdaftar
- ✅ Kelola konten yang diupload dosen
- ✅ Lihat pesan kontak dari publik
- ✅ Statistik platform

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v7
- **Backend/Auth**: Supabase
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js >= 18
- npm atau yarn
- Akun Supabase (gratis)

## 🚦 Getting Started

### 1. Clone dan Install Dependencies

```bash
cd portfolio-dosen
npm install
```

### 2. Setup Supabase

Ikuti panduan lengkap di [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

Singkatnya:
1. Buat project di https://supabase.com
2. Copy `.env.example` ke `.env`
3. Isi variabel environment dengan kredensial Supabase Anda
4. Jalankan SQL schema di Supabase SQL Editor

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:5173

## 📁 Struktur Folder

```
portfolio-dosen/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── DosenDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── SUPABASE_SETUP.md
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Database policies untuk proteksi data
- **Role-based Access Control**: Pembatasan akses berdasarkan role
- **Email Verification**: Konfirmasi email untuk registrasi
- **Protected Routes**: Halaman dashboard hanya untuk authenticated users
- **Data Privacy**: Informasi sensitif tidak ditampilkan ke publik

## 📝 Cara Membuat Admin Pertama

1. Register user biasa melalui halaman `/register`
2. Di Supabase Dashboard > SQL Editor, jalankan:

```sql
UPDATE public.profiles 
SET role = 'admin', verified = true 
WHERE email = 'email-anda@example.com';
```

3. Logout dan login kembali

## 🎨 Customization

### Mengubah Tema Warna

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Menambah Fitur Baru

1. Buat component/page baru di folder yang sesuai
2. Tambahkan route di `App.jsx`
3. Update database schema jika diperlukan
4. Tambahkan RLS policies baru

## 📄 License

MIT License

## 👥 Kontribusi

Silakan fork repository ini dan buat pull request untuk kontribusi.

## 📞 Support

Untuk pertanyaan atau bantuan, silakan hubungi tim pengembang atau buat issue di repository ini.
