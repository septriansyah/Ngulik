# Ngulik!

Media pembelajaran algoritma dasar Python untuk Informatika SMP/MTs (Fase D), dibuat dengan React + Vite. Siswa belajar bersama maskot **Bito** lewat pelajaran pendek ala aplikasi belajar bahasa: penjelasan bergambar, soal interaktif, nyawa, XP, streak harian, lencana, dan papan peringkat.

## Isi materi

| Unit | Pelajaran |
| --- | --- |
| 1. Kenalan Algoritma | Apa itu algoritma? · Urutan itu penting · Program pertamamu · Komentar & error |
| 2. Variabel | Kotak bernama · int · Melacak isi variabel · float · str · bool & nama variabel |
| 3. Operator & Hitungan | Tambah, kurang, kali · / dan // · Sisa bagi % · Urutan operasi · Operator pada teks |
| 4. Input & Output | print() lebih jauh · f-string · input() · int() dan float() · Program interaktif |
| 5. Percabangan | Perbandingan · if · else · elif · and/or/not · Studi kasus tiket wisata |
| 6. Perulangan | Kenapa perlu loop · range() · Memakai i · Akumulator · Loop + if · Pola & teks |
| 7. Misi Akhir | Rapor Digital · Kasir Warung · Pemburu Genap |

Totalnya 35 pelajaran dan 210 soal dengan enam bentuk: pilihan ganda, tebak keluaran, isi bagian kosong, susun blok kode, ketik jawaban, dan pasangkan. Setiap unit juga punya halaman **Panduan** untuk mengulang materi tanpa soal.

Semua materi ada di `src/data/curriculum.js`. Guru bisa menambah atau mengubah soal langsung di file itu.

## Cara memakai

Langkah penggunaan untuk siswa (masuk, peta belajar, soal, XP dan streak, lencana) ada di [PANDUAN.md](PANDUAN.md) dan tampil juga di halaman `/#/cara-pakai` (tautan "Lihat cara memakainya" di landing page).

Screenshot panduan disimpan di `public/tutorial/` dengan nama `langkah-1-masuk.png` sampai `langkah-8-menu.png` (disarankan 1080 × 1920 px, PNG). Teks langkah ada di `src/data/tutorial.js`. Daftar lengkap file dan keterangan gambar ada di PANDUAN.md.

## Menjalankan di komputer

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173). Tanpa konfigurasi Firebase, aplikasi berjalan dalam **mode tamu**: progres disimpan di browser dan papan peringkat berisi data contoh.

## Mengaktifkan login Google, streak di akun, dan papan peringkat

1. Buka [Firebase Console](https://console.firebase.google.com), buat proyek baru.
2. **Authentication → Sign-in method → Google → Enable.**
3. **Firestore Database → Create database** (mode production, lokasi `asia-southeast2` Jakarta).
4. **Project settings → General → Your apps → Web (`</>`)**, daftarkan aplikasi, lalu salin konfigurasinya.
5. Salin `.env.example` menjadi `.env`, lalu isi setiap nilai `VITE_FIREBASE_*`.
6. Pasang aturan keamanan: salin isi `firestore.rules` ke **Firestore → Rules → Publish**, atau jalankan `firebase deploy --only firestore:rules`.
7. Jalankan ulang `npm run dev`. Tombol **Masuk dengan Google** sekarang muncul di landing page.

Data yang disimpan:

- `users/{uid}`: progres lengkap (XP, streak, pelajaran selesai, lencana). Hanya pemilik akun yang bisa membaca.
- `leaderboard/{uid}`: nama, foto, XP, dan streak untuk papan peringkat. Semua pengguna yang login bisa membaca, tapi hanya bisa menulis barisnya sendiri.

Kalau siswa sempat belajar di mode tamu lalu masuk dengan Google untuk pertama kali, progres tamunya ikut dipindahkan ke akun.

## Publikasi (hosting)

```bash
npm run build
```

Folder `dist/` siap diunggah ke Firebase Hosting (`firebase deploy --only hosting`), Netlify, atau Vercel. Setelah punya domain, tambahkan domain itu di **Authentication → Settings → Authorized domains** supaya login Google berfungsi.

`npm run build:single` menghasilkan satu file `dist/index.html` untuk demo tanpa server (mode tamu).

## Struktur kode

```
src/
  data/curriculum.js    materi dan soal
  data/badges.js        daftar lencana dan syaratnya
  lib/progress.js       aturan XP, streak, dan lencana
  lib/sound.js          efek suara (Web Audio, tanpa file audio)
  context/AppContext.jsx  login, penyimpanan progres, papan peringkat
  components/           Bito, lencana, soal interaktif, kerangka aplikasi
  data/tutorial.js      langkah cara memakai (landing page)
  pages/                Landing, Peta Belajar, Pelajaran, Panduan, Peringkat, Lencana, Profil
```

## Aturan permainan

- Setiap pelajaran: 2–3 kartu penjelasan Bito, lalu 6 soal dengan 5 nyawa.
- Jawaban salah mengurangi satu nyawa, dan soalnya muncul lagi di akhir.
- XP: 10 per soal yang benar di percobaan pertama, +10 saat pertama kali menuntaskan pelajaran, +5 bila tanpa salah.
- Streak bertambah sekali sehari saat siswa menuntaskan minimal satu pelajaran, dan putus bila sehari terlewat.
- 15 lencana: satu per unit, plus pencapaian seperti Tanpa Cela, Lima Beruntun, Api Tiga Hari, dan Pemburu XP.
