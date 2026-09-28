# Panduan Deployment Produksi — BUILDY GYM

Panduan teknis langkah demi langkah untuk menerbitkan website publik dan sistem CMS Buildy Gym ke lingkungan produksi (*live*).

---

## 1. Arsitektur Produksi

```
[ Pengunjung / Browser ]
         │
         ├───► [ Frontend ]  Vercel (React 19 SPA)
         │                   ├── Edge CDN Global
         │                   └── URL: https://buildygym.com
         │
         └───► [ Backend ]   Docker Container (Laravel 11 + PHP 8.4 + Nginx)
                             ├── Railway / Render / VPS
                             ├── URL: https://api.buildygym.com
                             └── Database: Supabase PostgreSQL (Managed Cloud)
```

---

## 2. Langkah 1: Setup Database Produksi (Supabase)

1. Masuk ke [Supabase Dashboard](https://supabase.com) dan buat project baru:
   - **Name**: `buildygym-production`
   - **Region**: `Singapore (ap-southeast-1)`
   - Simpan kata sandi database (*Database Password*).
2. Ambil informasi koneksi di menu **Project Settings** > **Database** > **Connection string** (Mode: Transaction / Session Pooler, port: `6543` atau `5432`).
3. Catat variabel berikut:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
   DB_PORT=6543
   DB_DATABASE=postgres
   DB_USERNAME=postgres.YOUR_PROJECT_REF
   DB_PASSWORD=YOUR_STRONG_PASSWORD
   DB_SSLMODE=require
   ```

---

## 3. Langkah 2: Deploy Backend API (Railway / Render / Docker VPS)

### Metode A: Railway (Rekomendasi Cepat & Otomatis)
1. Buka [Railway.app](https://railway.app), klik **New Project** > **Deploy from GitHub repo**.
2. Pilih repository `BuildyGYM-Antigravity`.
3. Buka **Settings**:
   - **Root Directory**: `backend`
   - **Builder**: `Dockerfile`
4. Buka tab **Variables** dan tambahkan variabel environment berikut (sesuai `backend/.env.production.example`):
   ```env
   APP_NAME="BUILDY GYM API"
   APP_ENV=production
   APP_KEY=base64:JALANKAN_KEY_GENERATE
   APP_DEBUG=false
   APP_URL=https://api.domainanda.com
   FRONTEND_URL=https://buildygym.vercel.app

   DB_CONNECTION=pgsql
   DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
   DB_PORT=6543
   DB_DATABASE=postgres
   DB_USERNAME=postgres.YOUR_PROJECT_REF
   DB_PASSWORD=YOUR_PASSWORD
   DB_SSLMODE=require

   SESSION_DRIVER=database
   CACHE_STORE=database
   QUEUE_CONNECTION=database
   FILESYSTEM_DISK=public
   AUTO_MIGRATE=true
   ```
   > **Catatan Pembuatan APP_KEY**: Jalankan perintah lokal `php artisan key:generate --show` untuk mendapatkan token acak 32 karakter baru.

5. Buka tab **Settings** > **Networking** > Klik **Generate Domain** (misal: `buildygym-api-production.up.railway.app`).
6. Jalankan seeding awal via Railway CLI atau Web Terminal:
   ```bash
   php artisan db:seed --class=AdminSeeder --force
   php artisan db:seed --class=WebsiteSettingSeeder --force
   php artisan db:seed --class=RealisticGymSeeder --force
   ```

---

## 4. Langkah 3: Deploy Frontend (Vercel)

1. Buka [Vercel Dashboard](https://vercel.com), klik **Add New** > **Project**.
2. Pilih repository `BuildyGYM-Antigravity`.
3. Konfigurasi Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` (Penting: klik *Edit* dan pilih folder `frontend`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Tambahkan **Environment Variables**:
   | Name | Value | Keterangan |
   |---|---|---|
   | `VITE_API_BASE_URL` | `https://api.domainanda.com/api/v1` | URL Backend API dari Langkah 2 |
   | `VITE_APP_NAME` | `BUILDY GYM` | Nama aplikasi |
5. Klik **Deploy**.
6. File [vercel.json](file:///d:/Web%20Development/BuildyGYM-Antigravity/frontend/vercel.json) yang telah disiapkan otomatis menangani rewrites rute SPA React (seperti `/admin`, `/admin/login`, `/admin/memberships`) sehingga tidak terjadi error 404 saat pengguna melakukan refresh halaman langsung.

---

## 5. Langkah 4: Kredensial Akses CMS Pertama Kali

Setelah backend berhasil di-seed, gunakan akun administrator default berikut untuk masuk pertama kali ke portal CMS:

- **URL Login Admin**: `https://domainanda.com/admin/login`
- **Email**: `admin@buildygym.com`
- **Password**: `password`

> **Sangat Penting**: Segera ubah kata sandi administrator default setelah berhasil masuk pertama kali melalui pengaturan akun database.

---

## 6. Verifikasi Pasca-Deployment (Post-Deployment Checklist)

Lakukan pengujian cepat pada domain produksi live:

1. **Health Check API**:
   Kunjungi `https://api.domainanda.com/api/v1/health`.
   Harus mengembalikan:
   ```json
   {
     "status": "ok",
     "app": "BUILDY GYM API",
     "environment": "production"
   }
   ```
2. **Landing Page Publik**:
   Buka `https://domainanda.com`.
   - Pastikan seluruh 12 seksi ter-render rapi dengan data dinamis.
   - Buka DevTools > Network: pastikan permintaan `GET /api/v1/public/landing-data` mengembalikan `200 OK`.
3. **Direct Navigation / SPA Refresh**:
   Buka langsung `https://domainanda.com/admin/login` lalu tekan tombol `F5 / Refresh`.
   - Pastikan halaman me-render form login tanpa error 404.
4. **Login Admin & Sesi**:
   - Masukkan `admin@buildygym.com` dan kata sandi.
   - Pastikan diarahkan ke dashboard statistik `/admin`.
5. **Uji Upload Berkas**:
   - Masuk ke menu **Fasilitas** atau **Trainer** > Tambah data baru.
   - Unggah gambar (JPG/PNG/WebP <= 2MB).
   - Pastikan gambar terunggah dan ditampilkan dengan benar pada tabel dan preview.
