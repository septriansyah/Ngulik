// Langkah penggunaan Ngulik!. Dipakai di landing page (bagian "Cara memakai") dan dicerminkan di PANDUAN.md.
// Gambar: taruh screenshot di public/tutorial/ dengan nama file di bawah (ukuran disarankan 1080 x 1920 px, PNG).
export const TUTORIAL = [
  {
    id: 'masuk',
    img: 'langkah-1-masuk.png',
    title: 'Masuk ke Ngulik!',
    body: 'Buka halaman utama, lalu ketuk Masuk dengan Google. Kalau tombol Google tidak muncul, ketuk Mulai belajar, isi nama panggilan, lalu ketuk Ayo mulai. Dengan akun Google, progresmu tersimpan di akun dan tampil di papan peringkat.',
    caption: 'Landing page dengan tombol "Masuk dengan Google" (atau "Mulai belajar" pada mode tamu).',
  },
  {
    id: 'peta',
    img: 'langkah-2-peta.png',
    title: 'Kenali Peta Belajar',
    body: 'Setelah masuk, kamu tiba di peta. Lingkaran yang bergoyang adalah pelajaran berikutnya. Di bar atas ada streak (api), total XP (petir), dan jumlah lencana. Unit baru terbuka setelah unit sebelumnya tuntas.',
    caption: 'Peta Belajar: lingkaran pelajaran yang bergoyang dan bar atas berisi streak, XP, lencana.',
  },
  {
    id: 'materi',
    img: 'langkah-3-materi.png',
    title: 'Dengarkan Bito',
    body: 'Ketuk lingkaran pelajaran, lalu Mulai. Bito menjelaskan lewat 2–3 kartu berisi contoh kode dan keluarannya. Ketuk Lanjut untuk pindah kartu, dan Siap, ayo latihan! di kartu terakhir.',
    caption: 'Kartu penjelasan Bito dengan contoh kode dan tombol "Lanjut".',
  },
  {
    id: 'soal',
    img: 'langkah-4-soal.png',
    title: 'Jawab soal latihan',
    body: 'Tiap pelajaran punya 6 soal dan kamu punya 5 nyawa. Bentuknya bisa pilihan ganda, tebak keluaran, isi bagian kosong, susun blok kode, ketik jawaban, atau pasangkan. Pilih atau isi jawabanmu, lalu ketuk Periksa.',
    caption: 'Layar soal: bar kemajuan, jumlah nyawa, pertanyaan, pilihan jawaban, dan tombol "Periksa".',
  },
  {
    id: 'hasil',
    img: 'langkah-5-hasil.png',
    title: 'Baca hasilnya',
    body: 'Jawaban benar menampilkan penjelasan singkat. Jawaban salah mengurangi satu nyawa, tapi soalnya muncul lagi di akhir sampai kamu paham. Ketuk Lanjut untuk soal berikutnya.',
    caption: 'Umpan balik setelah menjawab: kotak hijau (benar) atau merah (salah) beserta penjelasan Bito.',
  },
  {
    id: 'selesai',
    img: 'langkah-6-selesai.png',
    title: 'Kumpulkan XP dan jaga streak',
    body: 'Di akhir pelajaran kamu mendapat XP (bonus bila tanpa salah). Selesaikan minimal satu pelajaran per hari supaya api streak tidak padam. Lencana baru muncul otomatis saat syaratnya terpenuhi.',
    caption: 'Layar selesai pelajaran: perolehan XP, streak bertambah, dan lencana baru.',
  },
  {
    id: 'panduan',
    img: 'langkah-7-panduan.png',
    title: 'Ulangi materi lewat Panduan',
    body: 'Lupa materinya? Ketuk tombol Panduan di tiap unit pada peta untuk membaca ringkasan tanpa soal.',
    caption: 'Tombol "Panduan" pada kepala unit di peta dan halaman ringkasan materinya.',
  },
  {
    id: 'menu',
    img: 'langkah-8-menu.png',
    title: 'Peringkat, Lencana, dan Profil',
    body: 'Menu bawah memuat Peringkat (bandingkan XP dan streak dengan teman), Lencana (15 pencapaian), dan Profil (ringkasan progres, masuk dengan Google, keluar, atau hapus progres).',
    caption: 'Menu bawah (Belajar, Peringkat, Lencana, Profil) dan salah satu halamannya.',
  },
];
