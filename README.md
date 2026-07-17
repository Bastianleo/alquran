# Al-Qur'an Digital

Aplikasi web untuk membaca Al-Qur'an 114 surat lengkap, dengan teks Arab, transliterasi Latin, terjemahan Bahasa Indonesia, dan tafsir per ayat. Dibangun dengan **Vite + React + TypeScript (TSX)**, styling ala **shadcn/ui** di atas Tailwind CSS v4, mendukung **mode terang & gelap**, dan dirancang mobile-first agar rapi di layar ponsel.

## Fitur

- Daftar 114 surat lengkap dengan pencarian (nama, arti, atau nomor)
- Halaman baca per surat: teks Arab, Latin, terjemahan, dan tafsir yang bisa dibuka/tutup per ayat
- Audio murottal per ayat (tombol putar/jeda)
- Navigasi surat sebelumnya/selanjutnya
- Mode terang & gelap (mengikuti preferensi sistem, bisa diganti manual, tersimpan otomatis)
- Desain manuskrip/illuminated Qur'an: medali beraksen emas untuk penomoran ayat, tipografi Arab (Amiri) dan serif (Lora) yang nyaman dibaca
- Layout responsif, dioptimalkan untuk mobile

## Sumber Data

Teks, terjemahan, dan tafsir diambil secara langsung (client-side fetch, tanpa API key) dari **EQuran.id API v2** (https://equran.id/apidev/v2), bersumber dari Kementerian Agama RI.

## Menjalankan Secara Lokal

Butuh Node.js 18+ terpasang.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk Produksi

```bash
npm run build
npm run preview   # opsional, untuk mencoba hasil build
```

Hasil build ada di folder `dist/`, siap di-deploy ke Vercel, Netlify, Cloudflare Pages, GitHub Pages, atau hosting statis lainnya.

## Struktur Proyek

```
src/
  components/
    ui/            komponen dasar ala shadcn (Button, Input, Badge, Switch, Skeleton)
    quran/         komponen khusus Qur'an (Header, SurahCard, AyahCard, Medallion)
    theme-provider.tsx / theme-toggle.tsx
  lib/
    quran-api.ts   client untuk EQuran.id API v2
    utils.ts       helper cn() (clsx + tailwind-merge)
  pages/
    home.tsx       daftar surat + pencarian
    surah.tsx      halaman baca satu surat
  index.css        design tokens (warna, font) + Tailwind v4
```

## Catatan

- Karena data diambil langsung dari EQuran.id di sisi browser, aplikasi membutuhkan koneksi internet saat digunakan.
- Semua warna didefinisikan sebagai CSS variable di `src/index.css` sehingga mode gelap/terang tinggal toggle class `.dark` di elemen `<html>`.
