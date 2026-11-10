# Setup Supabase — Ngopi Samarinda

Aplikasi tetap memakai katalog di `src/data/cafes.ts` selama `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` kosong. Laporan keramaian di browser tetap tersimpan di `localStorage`.

## 1. Buat proyek

1. Buka [supabase.com](https://supabase.com) dan buat proyek baru.
2. Tunggu database selesai provisioning.

## 2. Jalankan skema

1. Buka **SQL Editor**.
2. Tempel isi `schema.sql` dari akar repo, lalu jalankan.
3. Tabel yang terbentuk: `cafes` dan `crowd_reports`.

`crowd_reports.cafe_slug` mengacu ke `cafes.slug`. Isi `cafes` dulu sebelum mengirim laporan ke Supabase. Kolomnya mengikuti tipe `Cafe` di `src/data/cafes.ts` (`image_alt` untuk `imageAlt`, `story` dan `menu` berupa JSON, `crowd` berisi 24 angka 0–3).

Kalau `cafes` masih kosong, `fetchCafes()` kembali ke data static.

## 3. Isi env

1. Di Supabase: **Project Settings → API**.
2. Salin **Project URL** dan **anon public** key.
3. Salin `.env.example` menjadi `.env.local` (file ini tidak di-commit):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

4. Jalankan ulang dev server supaya Vite membaca env baru.

Jangan pakai `service_role` key di variabel `VITE_`. Kunci itu tidak boleh masuk ke browser.

## 4. Yang dipanggil aplikasi

- `fetchCafes()` membaca tabel `cafes`. Gagal, kosong, atau env belum diisi → data static.
- `insertCrowdReport(slug, level)` menulis ke `crowd_reports` hanya bila Supabase sudah dikonfigurasi. Level: `sepi`, `sedang`, `ramai`, `penuh`.
