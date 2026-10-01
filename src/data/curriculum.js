// Kurikulum Ngulik! — 7 unit, disusun bertahap dari konsep algoritma sampai proyek mini.
// Tipe soal: mc (pilihan ganda), fill (isi bagian kosong), order (susun blok kode),
// type (ketik jawaban), match (pasangkan).

const M = (q, opts, a, why, x = {}) => ({ t: 'mc', tag: 'Pilih jawaban', q, opts, a, why, ...x });
const OUT = (code, opts, a, why, q = 'Apa yang ditampilkan program ini?') => ({ t: 'mc', tag: 'Tebak keluaran', q, code, opts, a, why, mono: true });
const F = (q, code, opts, a, why) => ({ t: 'fill', tag: 'Lengkapi kode', q, code, opts, a, why });
const O = (q, lines, why) => ({ t: 'order', tag: 'Susun kode', q, lines, why });
const BUG = (q, code, opts, a, why) => ({ t: 'mc', tag: 'Cari kesalahan', q, code, opts, a, why });
const TYPE = (q, code, a, why) => ({ t: 'type', tag: 'Ketik jawaban', q, code, a: Array.isArray(a) ? a : [a], why });
const MATCH = (q, pairs, why) => ({ t: 'match', tag: 'Pasangkan', q, pairs, why });

export const UNITS = [
  /* ============================ UNIT 1 ============================ */
  {
    id: 'algo', title: 'Kenalan Algoritma', desc: 'Berpikir langkah demi langkah sebelum menulis kode',
    color: '#12968A', deep: '#0B6B62', badge: { glyph: '1-2-3', name: 'Pemikir Runut' },
    goals: ['Menjelaskan arti algoritma dengan contoh sehari-hari', 'Menyusun langkah dengan urutan yang benar', 'Menulis dan membaca program print() pertama', 'Mengenali komentar dan error yang sering muncul'],
    lessons: [
      {
        title: 'Apa itu algoritma?',
        materi: [
          { say: 'Halo, aku <b>Bito</b>! Sebelum menulis kode, kenalan dulu dengan <b>algoritma</b>: urutan langkah yang jelas untuk menyelesaikan suatu masalah. Kamu sebenarnya sudah sering memakainya.', note: '<b>Contoh algoritma sehari-hari:</b> resep memasak, cara menyeberang jalan, dan petunjuk arah ke sekolah.' },
          { say: 'Ini algoritma memasak mi instan. Perhatikan: setiap langkah jelas, urutannya masuk akal, dan ada titik selesai.', steps: ['Rebus air sampai mendidih', 'Masukkan mi, tunggu 3 menit', 'Tuang bumbu ke mangkuk', 'Tiriskan mi ke mangkuk, lalu aduk', 'Selesai, mi siap dimakan'] },
          { say: 'Komputer itu patuh, tapi tidak bisa menebak maksudmu. Kalau perintahnya samar, komputer bingung. Karena itu perintah untuk komputer harus <b>tepat</b>.', note: '<b>Bandingkan:</b> "masak sebentar" itu samar. "Masak selama 3 menit" itu jelas.' },
        ],
        soal: [
          M('Apa itu algoritma?', ['Nama bahasa pemrograman', 'Urutan langkah yang jelas untuk menyelesaikan masalah', 'Komputer yang canggih', 'Aplikasi di ponsel'], 1, 'Algoritma adalah urutan langkah yang jelas dan berurutan untuk menyelesaikan masalah.'),
          M('Mana yang termasuk algoritma?', ['Warna favoritku biru', 'Langkah-langkah mencuci tangan', 'Sepatu baru milik Rani', 'Nama sekolahku'], 1, 'Mencuci tangan punya langkah berurutan dari awal sampai selesai.'),
          O('Susun algoritma menyeberang jalan dengan aman.', ['Berhenti di tepi jalan', 'Lihat ke kanan dan ke kiri', 'Tunggu sampai jalan sepi', 'Menyeberang dengan hati-hati'], 'Kita harus berhenti dan memeriksa jalan dulu sebelum menyeberang.'),
          M('Perintah mana yang paling jelas untuk komputer?', ['Masak sebentar', 'Masak sampai pas', 'Masak selama 3 menit', 'Masak kira-kira saja'], 2, 'Hanya "3 menit" yang punya ukuran pasti.'),
          M('Ciri algoritma yang baik adalah...', ['Langkahnya jelas, berurutan, dan ada titik selesai', 'Langkahnya boleh melompat-lompat', 'Tidak perlu titik selesai', 'Makin panjang makin baik'], 0, 'Algoritma yang baik jelas, berurutan, dan pasti selesai.'),
          MATCH('Pasangkan kegiatan dengan langkah pertamanya.', [['Menggosok gigi', 'Ambil sikat gigi'], ['Menyalakan laptop', 'Tekan tombol daya'], ['Menelepon teman', 'Buka aplikasi telepon']], 'Setiap kegiatan diawali langkah yang paling masuk akal.'),
        ],
      },
      {
        title: 'Urutan itu penting',
        materi: [
          { say: 'Langkah yang sama bisa gagal kalau urutannya tertukar. Bayangkan memakai sepatu dulu, baru kaus kaki!', steps: ['Pakai kaus kaki', 'Pakai sepatu', 'Ikat tali sepatu'] },
          { say: 'Komputer menjalankan perintah <b>dari atas ke bawah</b>, satu baris setiap kali. Cara kerja ini disebut <b>runtutan</b> (sequence).', code: 'print("Langkah 1")\nprint("Langkah 2")\nprint("Langkah 3")', out: 'Langkah 1\nLangkah 2\nLangkah 3' },
          { say: 'Karena urutannya dari atas ke bawah, menukar baris bisa mengubah hasil program.', code: 'print("pagi")\nprint("Selamat")', out: 'pagi\nSelamat', note: '<b>Hasilnya jadi aneh</b>, padahal perintahnya sama. Yang berbeda hanya urutannya.' },
        ],
        soal: [
          OUT('print("A")\nprint("B")\nprint("C")', ['A\nB\nC', 'C\nB\nA', 'ABC', 'A B C'], 0, 'Program berjalan dari atas ke bawah, dan setiap print mencetak satu baris.'),
          M('Komputer menjalankan perintah dengan urutan...', ['Acak', 'Dari bawah ke atas', 'Dari atas ke bawah', 'Yang paling pendek dulu'], 2, 'Perintah dijalankan baris demi baris dari atas.'),
          O('Susun langkah memakai sepatu.', ['Pakai kaus kaki', 'Pakai sepatu', 'Ikat tali sepatu'], 'Kaus kaki dipakai dulu, sepatu kemudian, tali diikat terakhir.'),
          O('Susun program agar tampil Satu, Dua, lalu Tiga dari atas ke bawah.', ['print("Satu")', 'print("Dua")', 'print("Tiga")'], 'Baris yang ditulis lebih dulu akan tampil lebih dulu.'),
          OUT('print("pagi")\nprint("Selamat")', ['Selamat\npagi', 'pagi\nSelamat', 'Selamat pagi', 'pagi Selamat'], 1, 'Baris pertama mencetak "pagi", jadi "pagi" tampil di atas.'),
          M('Istilah untuk perintah yang dijalankan berurutan satu per satu adalah...', ['Runtutan (sequence)', 'Percabangan', 'Perulangan', 'Variabel'], 0, 'Runtutan adalah urutan perintah yang dijalankan satu per satu.'),
        ],
      },
      {
        title: 'Program pertamamu',
        materi: [
          { say: 'Saatnya menulis kode! Kita memakai bahasa <b>Python</b>. Perintah pertama: <code>print()</code> untuk menampilkan tulisan ke layar.', code: 'print("Halo, dunia!")', out: 'Halo, dunia!' },
          { say: 'Tulisan (teks) harus diapit <b>tanda kutip</b>. Nama perintah juga harus persis: <code>print</code> dengan huruf kecil semua.', code: 'print("Aku siap ngoding!")', out: 'Aku siap ngoding!', note: '<b>Tanda kutip tidak ikut tampil.</b> Tanda kutip hanya memberi tahu Python di mana teks dimulai dan berakhir.' },
          { say: 'Setiap <code>print</code> menampilkan satu baris baru. Mau tiga baris? Tulis tiga print.', code: 'print("Nama: Sari")\nprint("Kelas: 7B")\nprint("Hobi: membaca")', out: 'Nama: Sari\nKelas: 7B\nHobi: membaca' },
        ],
        soal: [
          M('Perintah untuk menampilkan tulisan di Python adalah...', ['show()', 'print()', 'tulis()', 'display()'], 1, 'print() menampilkan tulisan ke layar.', { mono: true }),
          OUT('print("Halo, dunia!")', ['Halo, dunia!', '"Halo, dunia!"', 'print Halo, dunia!', 'Halo dunia'], 0, 'Tanda kutip tidak ikut ditampilkan.'),
          F('Tampilkan tulisan Aku siap ngoding!', '___("Aku siap ngoding!")', ['print', 'Print', 'tulis', 'show'], 'print', 'Nama perintahnya print dengan huruf kecil semua.'),
          BUG('Kenapa kode ini error?', 'print(Halo)', ['Teks Halo tidak diapit tanda kutip', 'print harus huruf kapital', 'Kurang titik koma', 'Tidak error'], 0, 'Teks wajib diapit tanda kutip: print("Halo").'),
          TYPE('Ketik keluaran program ini.', 'print("Bito")', 'Bito', 'print menampilkan isi tanda kutip, yaitu Bito.'),
          O('Susun program agar tampil Nama, lalu Kelas, lalu Hobi.', ['print("Nama: Sari")', 'print("Kelas: 7B")', 'print("Hobi: membaca")'], 'Urutan tampilan sama dengan urutan baris kode.'),
        ],
      },
      {
        title: 'Komentar & error',
        materi: [
          { say: 'Tulisan setelah tanda <code>#</code> disebut <b>komentar</b>. Komputer melewatinya. Komentar ditulis untuk manusia yang membaca kode.', code: '# Program sapaan\nprint("Halo")  # menampilkan sapaan', out: 'Halo' },
          { say: 'Salah tulis kode memunculkan <b>error</b>. Itu wajar! Programmer profesional juga sering melihat error. Baca pesannya, cari barisnya, lalu perbaiki.', code: 'print("Halo"', out: "SyntaxError: '(' was never closed", note: '<b>Arti pesan ini:</b> ada kurung buka yang tidak pernah ditutup.' },
          { say: 'Tiga kesalahan yang paling sering dibuat pemula:', steps: ['Lupa tanda kutip: print(Halo)', 'Lupa kurung tutup: print("Halo"', 'Salah huruf besar-kecil: Print("Halo")'] },
        ],
        soal: [
          OUT('# ini komentar\nprint("Hai")', ['# ini komentar\nHai', 'Hai', 'ini komentar', 'Tidak ada keluaran'], 1, 'Komentar dilewati, jadi yang tampil hanya Hai.'),
          M('Apa fungsi komentar (#)?', ['Membuat program lebih cepat', 'Catatan untuk manusia yang tidak dijalankan komputer', 'Menampilkan tulisan', 'Menghapus error'], 1, 'Komentar adalah catatan yang dilewati komputer.'),
          BUG('Apa kesalahan kode ini?', 'print("Selamat pagi"', ['Kurang kurung tutup', 'Kurang tanda kutip', 'print salah ketik', 'Tidak ada kesalahan'], 0, 'Kurung yang dibuka harus ditutup.'),
          BUG('Apa kesalahan kode ini?', 'Print("Halo")', ['Print harus ditulis huruf kecil: print', 'Kurang kurung', 'Teks harus pakai kutip satu', 'Tidak ada kesalahan'], 0, 'Python membedakan huruf besar dan kecil.'),
          M('Saat muncul error, sebaiknya kamu...', ['Menyerah', 'Membaca pesan error dan memeriksa barisnya', 'Menghapus semua kode', 'Mematikan komputer'], 1, 'Pesan error memberi petunjuk letak dan jenis kesalahan.'),
          MATCH('Pasangkan kode dengan kesalahannya.', [['print(Hai)', 'Lupa tanda kutip'], ['print("Hai"', 'Lupa kurung tutup'], ['Print("Hai")', 'Salah huruf besar']], 'Ketiganya kesalahan paling umum bagi pemula.'),
        ],
      },
    ],
  },

  /* ============================ UNIT 2 ============================ */
  {
    id: 'var', title: 'Variabel', desc: 'Menyimpan data di kotak berlabel',
    color: '#22955F', deep: '#16683F', badge: { glyph: 'x=', name: 'Penjinak Variabel' },
    goals: ['Membuat variabel dan mengisinya dengan =', 'Melacak perubahan isi variabel', 'Membedakan tipe int, float, str, dan bool', 'Memberi nama variabel sesuai aturan'],
    lessons: [
      {
        title: 'Kotak bernama',
        materi: [
          { say: '<b>Variabel</b> itu seperti kotak berlabel. Kotaknya menyimpan data, labelnya adalah nama variabel.', code: 'nama = "Sari"\nprint(nama)', out: 'Sari' },
          { say: 'Tanda <code>=</code> artinya <b>simpan</b> nilai di kanan ke kotak di kiri. Bacanya: "nama diisi Sari".', note: '<b>Hati-hati:</b> <code>=</code> di Python bukan "sama dengan" seperti di matematika.' },
          { say: 'Setelah disimpan, variabel bisa dipakai berkali-kali. Tapi jangan diberi tanda kutip, nanti Python mengira itu teks biasa.', code: 'kota = "Bandung"\nprint(kota)\nprint("kota")', out: 'Bandung\nkota' },
        ],
        soal: [
          M('Variabel paling mirip dengan...', ['Kotak berlabel untuk menyimpan data', 'Tombol di keyboard', 'Layar komputer', 'Kabel listrik'], 0, 'Variabel menyimpan data dan punya nama sebagai label.'),
          OUT('hewan = "kucing"\nprint(hewan)', ['hewan', 'kucing', '"kucing"', 'hewan kucing'], 1, 'print(hewan) menampilkan isi variabel hewan.'),
          OUT('hewan = "kucing"\nprint("hewan")', ['kucing', 'hewan', '"hewan"', 'Error'], 1, 'Karena diberi kutip, "hewan" dianggap teks biasa, bukan variabel.'),
          F('Simpan teks Bandung ke variabel kota.', 'kota ___ "Bandung"', ['=', '==', ':', '->'], '=', 'Tanda = dipakai untuk menyimpan nilai.'),
          M('Pada kode skor = 10, mana yang merupakan nama variabel?', ['skor', '=', '10', 'skor = 10'], 0, 'Nama variabel ditulis di sebelah kiri tanda =.', { mono: true }),
          O('Susun program yang menyimpan lalu menampilkan nama sekolah.', ['sekolah = "SMPN 1"', 'print(sekolah)'], 'Variabel harus diisi dulu sebelum dipakai.'),
        ],
      },
      {
        title: 'Bilangan bulat: int',
        materi: [
          { say: 'Bilangan bulat tanpa koma disebut <b>int</b> (integer). Angka ditulis <b>tanpa</b> tanda kutip.', code: 'umur = 13\njumlah_siswa = 32\nprint(umur)', out: '13' },
          { say: 'Variabel int bisa dihitung seperti angka biasa.', code: 'a = 7\nb = 3\nprint(a + b)', out: '10' },
          { say: 'Isi variabel bisa diganti. Nilai lama dibuang dan diganti nilai baru.', code: 'skor = 10\nskor = 25\nprint(skor)', out: '25' },
        ],
        soal: [
          M('Mana yang merupakan data int?', ['13', '"13"', '1.3', 'True'], 0, 'int adalah bilangan bulat tanpa kutip dan tanpa titik desimal.', { mono: true }),
          OUT('a = 7\nb = 3\nprint(a + b)', ['73', '10', 'a + b', '4'], 1, 'a berisi 7 dan b berisi 3, jadi a + b = 10.'),
          OUT('skor = 10\nskor = 25\nprint(skor)', ['10', '25', '35', '10\n25'], 1, 'Nilai 10 diganti 25, jadi yang tersimpan 25.'),
          TYPE('Ketik keluaran program ini.', 'x = 4\ny = 5\nprint(x * y)', '20', 'Tanda * berarti kali. 4 × 5 = 20.'),
          F('Simpan jumlah siswa sebanyak 32 sebagai angka.', 'jumlah_siswa = ___', ['32', '"32"', 'tiga puluh dua', '3.2'], '32', 'Angka int ditulis tanpa kutip.'),
          MATCH('Pasangkan kode dengan keluarannya.', [['print(2 + 3)', '5'], ['print(2 * 3)', '6'], ['print(9 - 2)', '7']], '+ menambah, * mengali, - mengurangi.'),
        ],
      },
      {
        title: 'Melacak isi variabel',
        materi: [
          { say: 'Variabel bisa memakai nilainya sendiri. <code>skor = skor + 5</code> artinya: ambil skor lama, tambah 5, lalu simpan lagi.', code: 'skor = 10\nskor = skor + 5\nprint(skor)', out: '15' },
          { say: 'Ayo <b>lacak</b> nilai variabel baris demi baris. Programmer menyebutnya <i>tracing</i>.', code: 'koin = 0\nkoin = koin + 3\nkoin = koin + 2\nprint(koin)', out: '5', note: '<b>Jejaknya:</b> koin 0 → 3 → 5.' },
          { say: 'Saat menyalin <code>b = a</code>, b mengambil nilai a <b>saat itu</b>. Mengubah a sesudahnya tidak mengubah b.', code: 'a = 10\nb = a\na = 20\nprint(b)', out: '10' },
        ],
        soal: [
          OUT('x = 5\nx = x + 3\nprint(x)', ['5', '3', '8', 'x + 3'], 2, 'x mula-mula 5, lalu 5 + 3 = 8 disimpan ke x.'),
          TYPE('Ketik keluaran program ini.', 'koin = 0\nkoin = koin + 4\nkoin = koin + 6\nprint(koin)', '10', 'Jejaknya: 0 → 4 → 10.'),
          OUT('a = 10\nb = a\na = 20\nprint(b)', ['10', '20', 'a', '30'], 0, 'b menyalin nilai 10 sebelum a diganti.'),
          OUT('n = 2\nn = n * 3\nn = n - 1\nprint(n)', ['5', '6', '2', '7'], 0, 'Jejaknya: 2 → 6 → 5.'),
          F('Tambahkan 1 ke nyawa.', 'nyawa = nyawa ___ 1', ['+', '-', '=', '*'], '+', 'Menambah berarti memakai tanda +.'),
          O('Susun program: total mulai 0, tambah 5, lalu tambah 7, lalu tampilkan.', ['total = 0', 'total = total + 5', 'total = total + 7', 'print(total)'], 'Ikuti urutan yang diminta: isi awal, tambah 5, tambah 7, tampilkan.'),
        ],
      },
      {
        title: 'Bilangan desimal: float',
        materi: [
          { say: 'Bilangan berkoma disebut <b>float</b>. Di Python, desimal ditulis dengan <b>titik</b>, bukan koma.', code: 'tinggi = 1.55\nberat = 42.5\nprint(tinggi)', out: '1.55' },
          { say: 'Pembagian dengan <code>/</code> selalu menghasilkan float, walaupun hasilnya bulat.', code: 'print(10 / 4)\nprint(6 / 2)', out: '2.5\n3.0' },
          { say: 'Perlu membulatkan? Pakai <code>round(angka, jumlah_digit)</code>.', code: 'print(round(3.14159, 2))', out: '3.14' },
        ],
        soal: [
          M('Penulisan float yang benar adalah...', ['1.55', '1,55', '"1.55"', '1 55'], 0, 'Desimal memakai titik dan tanpa kutip.', { mono: true }),
          OUT('print(10 / 4)', ['2', '2.5', '2,5', '3'], 1, '10 dibagi 4 sama dengan 2.5.'),
          OUT('print(6 / 2)', ['3', '3.0', '6/2', '2'], 1, 'Pembagian dengan / selalu menghasilkan float.'),
          F('Isi rata-rata dengan delapan puluh tujuh koma lima.', 'rata_rata = ___', ['87.5', '87,5', '"87.5"', '875'], '87.5', 'Float memakai titik dan tanpa kutip.'),
          M('Nilai 7.0 bertipe apa?', ['int', 'float', 'str', 'bool'], 1, 'Ada titik desimalnya, jadi float.'),
          OUT('print(round(2.567, 1))', ['2.5', '2.6', '2.56', '3'], 1, 'Dibulatkan ke 1 angka di belakang titik: 2.567 menjadi 2.6.'),
        ],
      },
      {
        title: 'Teks: str',
        materi: [
          { say: 'Teks disebut <b>str</b> (string). Tulis di antara tanda kutip, boleh kutip dua atau kutip satu.', code: 'nama = "Sari"\nkota = \'Bandung\'\nprint(nama, kota)', out: 'Sari Bandung' },
          { say: 'Teks bisa disambung dengan <code>+</code>. Ingat, <code>"13"</code> itu teks, sedangkan <code>13</code> angka.', code: 'depan = "Ngu"\nbelakang = "lik"\nprint(depan + belakang)', out: 'Ngulik' },
          { say: 'Teks dikali angka akan diulang. <code>len()</code> menghitung jumlah karakternya.', code: 'print("ha" * 3)\nprint(len("Bito"))', out: 'hahaha\n4' },
        ],
        soal: [
          M('Data "Bandung" bertipe apa?', ['int', 'float', 'str', 'bool'], 2, 'Data di dalam kutip adalah teks (str).'),
          OUT('a = "5"\nb = "3"\nprint(a + b)', ['8', '53', '5 + 3', 'Error'], 1, 'Keduanya teks. Tanda + menyambung teks menjadi 53.'),
          OUT('print("Ha" + "lo")', ['Ha lo', 'Halo', '"Halo"', 'Ha+lo'], 1, 'Dua teks disambung tanpa spasi.'),
          F('Simpan nama Dimas sebagai teks.', 'nama = ___', ['"Dimas"', 'Dimas', '[Dimas]', '(Dimas)'], '"Dimas"', 'Tanpa kutip, Python mengira Dimas nama variabel.'),
          OUT('print("wk" * 3)', ['wk3', 'wkwkwk', 'wk wk wk', 'Error'], 1, 'Teks dikali 3 diulang tiga kali.'),
          TYPE('Ketik keluaran program ini.', 'print(len("Python"))', '6', 'P-y-t-h-o-n ada 6 karakter.'),
        ],
      },
      {
        title: 'bool & nama variabel',
        materi: [
          { say: '<b>bool</b> hanya punya dua nilai: <code>True</code> (benar) dan <code>False</code> (salah). Huruf depannya kapital dan tanpa kutip.', code: 'sudah_bayar = True\nhujan = False\nprint(sudah_bayar)', out: 'True' },
          { say: 'Aturan nama variabel: diawali huruf atau garis bawah, tanpa spasi, dan bukan kata khusus Python. Huruf besar dan kecil dianggap berbeda.', code: 'nilai_siswa = 90    # benar\numur2 = 14          # benar\n2umur = 14          # salah: diawali angka\nnilai siswa = 90    # salah: ada spasi' },
          { say: 'Nama yang baik menjelaskan isinya. <code>uang_jajan</code> jauh lebih jelas daripada <code>u</code>.', note: '<b>Rangkuman tipe data:</b> int untuk bilangan bulat, float untuk desimal, str untuk teks, dan bool untuk benar/salah.' },
        ],
        soal: [
          M('Nilai True termasuk tipe apa?', ['str', 'bool', 'int', 'float'], 1, 'True dan False adalah boolean.'),
          M('Nama variabel mana yang benar?', ['nilai siswa', 'nilai_siswa', '2nilai', 'for'], 1, 'Tanpa spasi, tidak diawali angka, dan bukan kata khusus.', { mono: true }),
          M('Nama variabel mana yang SALAH?', ['umur2', '_skor', '2umur', 'uangJajan'], 2, 'Nama variabel tidak boleh diawali angka.', { mono: true }),
          F('Isi variabel dengan nilai benar (boolean).', 'lampu_menyala = ___', ['True', '"True"', 'true', 'Benar'], 'True', 'Boolean ditulis True dengan T kapital dan tanpa kutip.'),
          M('Apakah nilai dan Nilai dianggap variabel yang sama?', ['Sama', 'Berbeda', 'Tergantung isinya', 'Error'], 1, 'Python membedakan huruf besar dan kecil.'),
          MATCH('Pasangkan data dengan tipenya.', [['25', 'int'], ['2.5', 'float'], ['"25"', 'str'], ['True', 'bool']], 'Kutip menandakan str, titik menandakan float, True/False menandakan bool.'),
        ],
      },
    ],
  },

  /* ============================ UNIT 3 ============================ */
  {
    id: 'ops', title: 'Operator & Hitungan', desc: 'Menghitung seperti kalkulator pintar',
    color: '#C8457F', deep: '#8E2F59', badge: { glyph: '+-×', name: 'Kalkulator Cilik' },
    goals: ['Memakai operator + - * / // %', 'Menghitung sisa bagi untuk cek genap/ganjil', 'Menerapkan urutan operasi dan tanda kurung', 'Menggabungkan teks dan angka dengan str()'],
    lessons: [
      {
        title: 'Tambah, kurang, kali',
        materi: [
          { say: 'Python bisa jadi kalkulator. Perkalian memakai tanda <code>*</code>, bukan huruf x.', code: 'print(8 + 2)\nprint(8 - 2)\nprint(8 * 2)', out: '10\n6\n16' },
          { say: 'Hasil hitungan bisa disimpan ke variabel lain.', code: 'panjang = 8\nlebar = 5\nluas = panjang * lebar\nprint(luas)', out: '40' },
          { say: 'Contoh nyata: menghitung uang kembalian di kantin.', code: 'bayar = 20000\nharga = 13500\nkembali = bayar - harga\nprint(kembali)', out: '6500' },
        ],
        soal: [
          M('Operator perkalian di Python adalah...', ['x', '*', '×', '.'], 1, 'Python memakai tanda * untuk perkalian.', { mono: true }),
          OUT('print(8 * 2)', ['82', '16', '10', '8 * 2'], 1, '8 dikali 2 sama dengan 16.'),
          TYPE('Ketik keluaran program ini.', 'p = 6\nl = 4\nprint(p * l)', '24', 'Luas 6 × 4 = 24.'),
          OUT('bayar = 10000\nharga = 7500\nprint(bayar - harga)', ['17500', '2500', '7500', '-2500'], 1, '10000 dikurangi 7500 sama dengan 2500.'),
          F('Hitung keliling persegi dengan sisi 5.', 'sisi = 5\nkeliling = 4 ___ sisi', ['*', '+', 'x', '/'], '*', 'Keliling persegi = 4 × sisi.'),
          O('Susun program untuk menghitung harga 3 pulpen seharga 2000.', ['harga = 2000', 'total = harga * 3', 'print(total)'], 'harga harus ada sebelum dipakai menghitung total.'),
        ],
      },
      {
        title: 'Pembagian: / dan //',
        materi: [
          { say: 'Ada dua jenis pembagian. <code>/</code> memberi hasil desimal. <code>//</code> memberi hasil bulat yang dibulatkan ke bawah.', code: 'print(7 / 2)\nprint(7 // 2)', out: '3.5\n3' },
          { say: 'Kapan pakai <code>//</code>? Saat hasilnya harus utuh, misalnya membagi permen.', code: 'permen = 17\nanak = 5\nprint(permen // anak)', out: '3', note: '<b>Artinya:</b> setiap anak mendapat 3 permen utuh.' },
          { say: 'Ingat: <code>/</code> tetap memberi float walaupun hasilnya bulat.', code: 'print(6 / 2)\nprint(6 // 2)', out: '3.0\n3' },
        ],
        soal: [
          OUT('print(7 / 2)', ['3', '3.5', '4', '3,5'], 1, '/ memberi hasil desimal.'),
          OUT('print(7 // 2)', ['3', '3.5', '4', '1'], 0, '// membulatkan ke bawah, jadi 3.'),
          OUT('print(6 / 2)', ['3', '3.0', '6/2', '2'], 1, '/ selalu memberi float.'),
          TYPE('Ketik keluaran program ini.', 'print(20 // 6)', '3', '20 dibagi 6 = 3,33 lalu dibulatkan ke bawah menjadi 3.'),
          M('Apa beda / dan //?', ['Tidak ada bedanya', '/ hasilnya desimal, // hasilnya bulat ke bawah', '/ untuk teks, // untuk angka', '// adalah komentar'], 1, '// disebut pembagian bulat.'),
          F('Hitung jumlah kotak penuh jika 25 kue dimasukkan ke kotak berisi 6.', 'kotak = 25 ___ 6', ['//', '/', '%', '*'], '//', 'Kotak harus utuh, jadi pakai //.'),
        ],
      },
      {
        title: 'Sisa bagi: %',
        materi: [
          { say: 'Operator <code>%</code> (modulo) memberi <b>sisa bagi</b>.', code: 'print(17 % 5)', out: '2', note: '<b>Karena</b> 17 = 5 × 3 + 2. Sisanya 2.' },
          { say: 'Kegunaan terpenting <code>%</code>: mengecek genap atau ganjil. Bilangan genap kalau dibagi 2 sisanya 0.', code: 'print(8 % 2)\nprint(7 % 2)', out: '0\n1' },
          { say: '<code>//</code> dan <code>%</code> sering dipakai bersama. 17 permen untuk 5 anak: masing-masing dapat berapa, dan sisa berapa?', code: 'print(17 // 5, 17 % 5)', out: '3 2' },
        ],
        soal: [
          OUT('print(17 % 5)', ['3', '2', '3.4', '12'], 1, '17 = 5 × 3 + 2, sisanya 2.'),
          OUT('print(7 % 2)', ['1', '3', '3.5', '0'], 0, '7 = 2 × 3 + 1, sisanya 1.'),
          TYPE('Ketik keluaran program ini.', 'print(10 % 3)', '1', '10 = 3 × 3 + 1, sisanya 1.'),
          M('Bilangan n genap jika...', ['n % 2 == 0', 'n % 2 == 1', 'n / 2 == 0', 'n // 2 == 1'], 0, 'Bilangan genap habis dibagi 2, sisanya 0.', { mono: true }),
          OUT('print(20 // 6, 20 % 6)', ['3 2', '3.3 2', '2 3', '3 0'], 0, '20 = 6 × 3 + 2. Hasil bulat 3, sisa 2.'),
          MATCH('Pasangkan operasi dengan hasilnya.', [['9 % 2', '1'], ['9 // 2', '4'], ['9 / 2', '4.5']], '% sisa, // bulat ke bawah, / desimal.'),
        ],
      },
      {
        title: 'Urutan operasi',
        materi: [
          { say: 'Seperti di matematika, kali dan bagi dikerjakan <b>lebih dulu</b> daripada tambah dan kurang.', code: 'print(2 + 3 * 4)', out: '14', note: '<b>Langkahnya:</b> 3 × 4 = 12 dulu, baru 2 + 12 = 14.' },
          { say: 'Mau tambah dulu? Pakai <b>tanda kurung</b>. Isi kurung selalu dikerjakan paling awal.', code: 'print((2 + 3) * 4)', out: '20' },
          { say: 'Contoh penting: menghitung rata-rata wajib pakai kurung.', code: 'rata = (80 + 90 + 70) / 3\nprint(rata)', out: '80.0' },
        ],
        soal: [
          OUT('print(2 + 3 * 4)', ['20', '14', '24', '9'], 1, 'Kali dulu: 3 × 4 = 12, lalu 2 + 12 = 14.'),
          OUT('print((2 + 3) * 4)', ['20', '14', '24', '9'], 0, 'Kurung dulu: 2 + 3 = 5, lalu 5 × 4 = 20.'),
          TYPE('Ketik keluaran program ini.', 'print(10 - 2 * 3)', '4', '2 × 3 = 6 dulu, lalu 10 - 6 = 4.'),
          BUG('Program ingin menghitung rata-rata 80 dan 90. Apa yang salah?', 'rata = 80 + 90 / 2', ['Harus diberi kurung: (80 + 90) / 2', 'Harus memakai //', 'Harus memakai *', 'Tidak ada yang salah'], 0, 'Tanpa kurung, yang dibagi 2 hanya 90.'),
          OUT('print(8 / (2 + 2))', ['2.0', '6.0', '2', '4.0'], 0, 'Kurung dulu: 2 + 2 = 4, lalu 8 / 4 = 2.0.'),
          MATCH('Pasangkan ekspresi dengan hasilnya.', [['1 + 2 * 3', '7'], ['(1 + 2) * 3', '9'], ['10 - 4 / 2', '8.0']], 'Perhatikan kurung dan urutan kali/bagi.'),
        ],
      },
      {
        title: 'Operator pada teks',
        materi: [
          { say: 'Tanda <code>+</code> pada teks berarti <b>menyambung</b>.', code: 'print("Selamat" + " " + "pagi")', out: 'Selamat pagi' },
          { say: 'Teks dikali angka akan <b>diulang</b>.', code: 'print("ab" * 3)', out: 'ababab' },
          { say: 'Teks dan angka <b>tidak bisa</b> dijumlah langsung. Ubah angka menjadi teks dengan <code>str()</code>.', code: 'umur = 13\nprint("Umurku " + str(umur))', out: 'Umurku 13' },
        ],
        soal: [
          OUT('print("Ha" + "lo")', ['Ha lo', 'Halo', 'Ha+lo', 'Error'], 1, '+ menyambung dua teks.'),
          OUT('print("5" + "3")', ['8', '53', '5 3', 'Error'], 1, 'Keduanya teks, jadi disambung.'),
          OUT('print("ab" * 3)', ['ab3', 'ababab', 'ab ab ab', 'Error'], 1, 'Teks diulang tiga kali.'),
          BUG('Kenapa kode ini error?', 'print("Umur: " + 13)', ['Teks tidak bisa dijumlah dengan angka', 'Kurang kutip', 'print salah', 'Harus pakai *'], 0, 'Ubah dulu angkanya: "Umur: " + str(13).'),
          F('Gabungkan teks dengan angka.', 'umur = 13\nprint("Umurku " + ___(umur))', ['str', 'int', 'print', 'len'], 'str', 'str() mengubah angka menjadi teks.'),
          TYPE('Ketik keluaran program ini.', 'print("Na" * 2)', 'NaNa', 'Teks "Na" diulang dua kali.'),
        ],
      },
    ],
  },

  /* ============================ UNIT 4 ============================ */
  {
    id: 'io', title: 'Input & Output', desc: 'Bertanya ke pengguna dan menampilkan jawaban',
    color: '#2C7FD0', deep: '#1C5A99', badge: { glyph: 'I/O', name: 'Juru Bicara' },
    goals: ['Menampilkan beberapa nilai dengan print()', 'Merapikan keluaran dengan f-string', 'Meminta masukan dengan input()', 'Mengubah masukan menjadi angka dengan int() dan float()', 'Membuat program Masukan → Proses → Keluaran'],
    lessons: [
      {
        title: 'print() lebih jauh',
        materi: [
          { say: 'Pisahkan dengan koma untuk mencetak beberapa nilai dalam satu baris. Python menyisipkan spasi di antaranya.', code: 'print("Halo", "Sari")', out: 'Halo Sari' },
          { say: 'Variabel dan hitungan juga bisa dicetak bersama teks.', code: 'kelas = "7B"\nnilai = 88\nprint("Kelas", kelas, "nilai", nilai)\nprint("Total:", 3 * 5)', out: 'Kelas 7B nilai 88\nTotal: 15' },
          { say: '<code>print()</code> tanpa isi mencetak baris kosong. Gunanya untuk memberi jarak.', code: 'print("Baris 1")\nprint()\nprint("Baris 3")', out: 'Baris 1\n\nBaris 3' },
        ],
        soal: [
          OUT('print("Halo", "Sari")', ['HaloSari', 'Halo Sari', 'Halo, Sari', '"Halo" "Sari"'], 1, 'Koma memisahkan nilai dan Python menambah satu spasi.'),
          OUT('kelas = "7B"\nprint("Kelas", kelas)', ['Kelas kelas', 'Kelas 7B', 'Kelas"7B"', 'Kelas7B'], 1, 'kelas berisi 7B.'),
          OUT('print("Nilai:", 80 + 5)', ['Nilai: 80 + 5', 'Nilai: 85', 'Nilai:85', 'Error'], 1, '80 + 5 dihitung dulu menjadi 85.'),
          F('Cetak isi variabel umur setelah teks.', 'umur = 13\nprint("Umurku", ___)', ['umur', '"umur"', 'Umur', 'umur()'], 'umur', 'Nama variabel ditulis tanpa kutip.'),
          TYPE('Ketik keluaran program ini.', 'print("Skor", 7 + 3)', 'Skor 10', 'Teks Skor, spasi, lalu hasil 7 + 3.'),
          O('Susun program yang menampilkan "Hasil: 8".', ['a = 4', 'b = a * 2', 'print("Hasil:", b)'], 'a dibuat dulu, lalu b, lalu ditampilkan.'),
        ],
      },
      {
        title: 'f-string: teks yang rapi',
        materi: [
          { say: '<b>f-string</b> memudahkan menggabung teks dan variabel. Tulis huruf <code>f</code> sebelum kutip, lalu taruh variabel di dalam <code>{ }</code>.', code: 'nama = "Sari"\numur = 13\nprint(f"Halo, {nama}! Umurmu {umur} tahun.")', out: 'Halo, Sari! Umurmu 13 tahun.' },
          { say: 'Di dalam <code>{ }</code> boleh ada hitungan. Tidak perlu <code>str()</code> lagi!', code: 'harga = 5000\nprint(f"Dua buku: {harga * 2} rupiah")', out: 'Dua buku: 10000 rupiah' },
          { say: 'Lupa huruf <code>f</code>? Kurung kurawalnya akan tampil apa adanya.', code: 'nama = "Sari"\nprint("Halo, {nama}")', out: 'Halo, {nama}' },
        ],
        soal: [
          OUT('nama = "Bito"\nprint(f"Halo, {nama}!")', ['Halo, {nama}!', 'Halo, Bito!', 'Halo, nama!', 'f"Halo, Bito!"'], 1, '{nama} diganti isi variabel nama.'),
          OUT('nama = "Bito"\nprint("Halo, {nama}!")', ['Halo, Bito!', 'Halo, {nama}!', 'Halo, nama!', 'Error'], 1, 'Tanpa huruf f, teks dicetak apa adanya.'),
          F('Lengkapi agar isi variabel kota tampil.', 'print(___"Aku tinggal di {kota}")', ['f', 's', 'str', '+'], 'f', 'Huruf f menandai f-string.'),
          TYPE('Ketik keluaran program ini.', 'x = 3\nprint(f"{x} + {x} = {x + x}")', '3 + 3 = 6', 'Setiap { } diganti nilainya.'),
          M('Di dalam f-string, variabel ditulis di antara...', ['( )', '[ ]', '{ }', '" "'], 2, 'f-string memakai kurung kurawal.', { mono: true }),
          BUG('Kenapa yang tampil "Halo {nama}" dan bukan nama Bito?', 'nama = "Bito"\nprint("Halo {nama}")', ['Lupa huruf f sebelum tanda kutip', 'Salah kurung kurawal', 'Nama variabel salah', 'print salah tulis'], 0, 'Tambahkan f: print(f"Halo {nama}").'),
        ],
      },
      {
        title: 'Bertanya dengan input()',
        materi: [
          { say: '<code>input()</code> menampilkan pertanyaan, menunggu pengguna mengetik, lalu memberikan jawabannya.', code: 'nama = input("Siapa namamu? ")\nprint(f"Halo, {nama}!")', out: 'Siapa namamu? Dimas\nHalo, Dimas!' },
          { say: 'Ingat baik-baik: hasil <code>input()</code> <b>selalu teks</b>, walaupun yang diketik angka.', code: 'umur = input("Umur? ")\nprint(umur + 1)   # error!', note: '<b>Kenapa error?</b> umur berisi teks "13", sedangkan 1 angka. Teks dan angka tidak bisa dijumlah.' },
          { say: 'Satu program boleh punya beberapa input. Setiap input menunggu jawaban sebelum lanjut ke baris berikutnya.', code: 'nama = input("Nama: ")\nhobi = input("Hobi: ")\nprint(f"{nama} suka {hobi}")', out: 'Nama: Rani\nHobi: menggambar\nRani suka menggambar' },
        ],
        soal: [
          M('Apa fungsi input()?', ['Menampilkan tulisan', 'Meminta masukan dari pengguna', 'Mengubah teks jadi angka', 'Mengulang perintah'], 1, 'input() menunggu pengguna mengetik.'),
          M('Hasil dari input() selalu bertipe...', ['int', 'str', 'bool', 'float'], 1, 'input() selalu memberi teks.'),
          F('Tanyakan nama pengguna.', 'nama = ___("Siapa namamu? ")', ['input', 'print', 'int', 'str'], 'input', 'input() dipakai untuk bertanya.'),
          O('Susun program yang menyapa pengguna.', ['nama = input("Siapa namamu? ")', 'sapaan = "Halo, " + nama', 'print(sapaan)'], 'Tanya dulu, rangkai sapaan, lalu tampilkan.'),
          BUG('Apa yang terjadi saat program ini dijalankan?', 'umur = input("Umur? ")\nprint(umur + 1)', ['Mencetak umur ditambah 1', 'Error karena teks tidak bisa dijumlah dengan angka', 'Mencetak umur1', 'Tidak menampilkan apa-apa'], 1, 'umur berisi teks. Perbaiki dengan int(input(...)).'),
          OUT('nama = input("Nama: ")\nprint(f"Hai {nama}")', ['Hai nama', 'Nama: Tono\nHai Tono', 'Hai {nama}', 'Tono'], 1, 'Pertanyaan tampil dulu, lalu sapaan. Anggap pengguna mengetik Tono.', 'Pengguna mengetik Tono. Apa yang tampil di layar?'),
        ],
      },
      {
        title: 'Teks jadi angka',
        materi: [
          { say: '<code>int()</code> mengubah teks seperti <code>"13"</code> menjadi angka 13. Bungkus <code>input()</code> dengannya.', code: 'umur = int(input("Umurmu? "))\nprint("Tahun depan:", umur + 1)', out: 'Umurmu? 13\nTahun depan: 14' },
          { say: 'Untuk angka desimal, pakai <code>float()</code>.', code: 'tinggi = float(input("Tinggi (m)? "))\nprint(tinggi * 100, "cm")', out: 'Tinggi (m)? 1.5\n150.0 cm' },
          { say: 'Rangkuman alat ubah tipe:', steps: ['int("12") → 12, angka bulat', 'float("2.5") → 2.5, angka desimal', 'str(12) → "12", teks'] },
        ],
        soal: [
          F('Ubah jawaban pengguna menjadi bilangan bulat.', 'umur = ___(input("Umur? "))', ['int', 'str', 'print', 'bool'], 'int', 'int() mengubah teks menjadi bilangan bulat.'),
          OUT('angka = "12"\nprint(int(angka) + 3)', ['123', '15', '"15"', 'Error'], 1, 'int("12") menjadi 12, ditambah 3 menjadi 15.'),
          TYPE('Ketik keluaran program ini.', 'x = int("7")\nprint(x * 2)', '14', 'x berisi angka 7, dikali 2 menjadi 14.'),
          M('Untuk mengubah "2.5" menjadi angka desimal, pakai...', ['int()', 'float()', 'str()', 'print()'], 1, 'float() untuk bilangan desimal.', { mono: true }),
          O('Susun program yang meminta angka lalu menampilkan dua kalinya.', ['angka = input("Masukkan angka: ")', 'angka = int(angka)', 'hasil = angka * 2', 'print("Dua kalinya:", hasil)'], 'Ambil masukan, ubah ke angka, hitung, tampilkan.'),
          MATCH('Pasangkan kode dengan hasilnya.', [['int("8")', '8'], ['float("8")', '8.0'], ['str(8)', '"8"']], 'Setiap fungsi mengubah ke tipe yang berbeda.'),
        ],
      },
      {
        title: 'Program interaktif',
        materi: [
          { say: 'Hampir semua program mengikuti pola <b>Masukan → Proses → Keluaran</b>.', steps: ['Masukan: tanya data ke pengguna', 'Proses: hitung atau olah datanya', 'Keluaran: tampilkan hasilnya'] },
          { say: 'Contoh kalkulator luas persegi panjang. Coba tunjuk mana bagian masukan, proses, dan keluaran.', code: 'p = int(input("Panjang: "))\nl = int(input("Lebar: "))\nluas = p * l\nprint(f"Luas = {luas}")', out: 'Panjang: 4\nLebar: 5\nLuas = 20' },
          { say: 'Contoh lain dengan desimal: mengubah meter ke sentimeter.', code: 'meter = float(input("Meter: "))\nprint(f"{meter} m = {meter * 100} cm")', out: 'Meter: 1.5\n1.5 m = 150.0 cm' },
        ],
        soal: [
          M('Urutan pola program interaktif yang benar adalah...', ['Keluaran → Proses → Masukan', 'Masukan → Proses → Keluaran', 'Proses → Masukan → Keluaran', 'Masukan → Keluaran → Proses'], 1, 'Data diambil dulu, diolah, lalu ditampilkan.'),
          O('Susun kalkulator luas. Tanya panjang dulu, lalu lebar.', ['p = int(input("Panjang: "))', 'l = int(input("Lebar: "))', 'luas = p * l', 'print(f"Luas = {luas}")'], 'Masukan, proses, lalu keluaran.'),
          M('Pengguna mengetik 3 lalu 7. Apa baris terakhir yang tampil?', ['Luas = 10', 'Luas = 21', 'Luas = 37', 'Luas = {luas}'], 1, '3 × 7 = 21.', { code: 'p = int(input("Panjang: "))\nl = int(input("Lebar: "))\nluas = p * l\nprint(f"Luas = {luas}")', mono: true, tag: 'Tebak keluaran' }),
          TYPE('Pengguna mengetik 7. Ketik keluaran baris terakhir.', 'a = int(input("Angka: "))\nprint(a * 3)', '21', '7 × 3 = 21.'),
          MATCH('Pasangkan kode dengan perannya.', [['input()', 'Masukan'], ['luas = p * l', 'Proses'], ['print()', 'Keluaran']], 'Setiap baris punya peran dalam pola Masukan → Proses → Keluaran.'),
          F('Ubah masukan menjadi bilangan desimal.', 'meter = ___(input("Meter: "))', ['float', 'int', 'str', 'print'], 'float', 'Meter bisa berupa desimal, jadi pakai float().'),
        ],
      },
    ],
  },

  /* ============================ UNIT 5 ============================ */
  {
    id: 'if', title: 'Percabangan', desc: 'Program yang bisa mengambil keputusan',
    color: '#E2702A', deep: '#A9501A', badge: { glyph: 'if', name: 'Pengambil Keputusan' },
    goals: ['Membandingkan nilai dengan == != > < >= <=', 'Membuat keputusan dengan if, else, dan elif', 'Menggabungkan kondisi dengan and, or, not', 'Menguji program dengan kasus batas'],
    lessons: [
      {
        title: 'Membandingkan nilai',
        materi: [
          { say: 'Sebelum memilih, program perlu membandingkan. Hasil perbandingan selalu <code>True</code> atau <code>False</code>.', code: 'print(10 > 7)    # lebih dari\nprint(5 == 5)    # sama dengan\nprint(4 != 4)    # tidak sama dengan', out: 'True\nTrue\nFalse' },
          { say: 'Ada juga <code>&lt;</code>, <code>&gt;=</code>, dan <code>&lt;=</code>.', code: 'print(8 >= 8)\nprint(3 <= 1)', out: 'True\nFalse' },
          { say: 'Jangan tertukar! <code>=</code> untuk menyimpan, <code>==</code> untuk membandingkan.', steps: ['nilai = 80 → menyimpan 80 ke nilai', 'nilai == 80 → bertanya: apakah nilai sama dengan 80?'] },
        ],
        soal: [
          M('Operator untuk memeriksa apakah dua nilai sama adalah...', ['=', '==', '!=', '=>'], 1, '== membandingkan, = menyimpan.', { mono: true }),
          OUT('print(10 > 7)', ['True', 'False', '10', 'Error'], 0, '10 memang lebih dari 7.'),
          OUT('print(5 != 5)', ['True', 'False', '5', '0'], 1, '!= artinya tidak sama dengan. 5 sama dengan 5, jadi False.'),
          OUT('print(8 >= 8)', ['True', 'False', '8', 'Error'], 0, '>= berarti lebih dari atau sama dengan.'),
          F('Periksa apakah nilai sama dengan 100.', 'print(nilai ___ 100)', ['==', '=', '>=', '!='], '==', 'Kesamaan diperiksa dengan ==.'),
          MATCH('Pasangkan operator dengan artinya.', [['!=', 'tidak sama dengan'], ['>=', 'lebih dari atau sama'], ['<', 'kurang dari']], 'Hafalkan operator perbandingan ini.'),
        ],
      },
      {
        title: 'Memutuskan dengan if',
        materi: [
          { say: 'Baris di bawah <code>if</code> hanya jalan kalau kondisinya True. Perhatikan <b>titik dua</b> di akhir baris if dan <b>4 spasi</b> di baris berikutnya.', code: 'nilai = 80\nif nilai >= 75:\n    print("Lulus!")', out: 'Lulus!' },
          { say: 'Kalau kondisinya False, isi if dilewati. Baris yang tidak menjorok tetap dijalankan.', code: 'nilai = 60\nif nilai >= 75:\n    print("Lulus!")\nprint("Selesai")', out: 'Selesai' },
          { say: 'Isi if boleh lebih dari satu baris, asalkan menjorok sama dalam.', code: 'suhu = 33\nif suhu > 30:\n    print("Panas!")\n    print("Minum air putih")', out: 'Panas!\nMinum air putih' },
        ],
        soal: [
          OUT('nilai = 80\nif nilai >= 75:\n    print("Lulus")', ['Lulus', 'Tidak ada keluaran', '80', 'Error'], 0, '80 >= 75 bernilai True.'),
          OUT('nilai = 60\nif nilai >= 75:\n    print("Lulus")\nprint("Selesai")', ['Lulus\nSelesai', 'Selesai', 'Lulus', 'Tidak ada keluaran'], 1, 'Kondisi False, jadi hanya baris di luar if yang jalan.'),
          BUG('Kenapa kode ini error?', 'umur = 13\nif umur > 12\n    print("Remaja")', ['Lupa titik dua di akhir baris if', 'Harus pakai ==', 'print salah tulis', 'Angka harus pakai kutip'], 0, 'Baris if wajib diakhiri titik dua.'),
          F('Cetak "Panas" kalau suhu di atas 30.', 'if suhu ___ 30:\n    print("Panas")', ['>', '<', '==', '='], '>', '"Di atas" berarti lebih dari.'),
          O('Susun program pendeteksi cuaca panas.', ['suhu = int(input("Suhu: "))', 'if suhu > 30:', '    print("Panas")'], 'Ambil suhu dulu, lalu if dengan isinya yang menjorok.'),
          OUT('suhu = 25\nif suhu > 30:\n    print("Panas!")\n    print("Minum air")\nprint("Cek selesai")', ['Panas!\nMinum air\nCek selesai', 'Cek selesai', 'Minum air\nCek selesai', 'Panas!'], 1, 'Kedua baris yang menjorok dilewati karena 25 > 30 bernilai False.'),
        ],
      },
      {
        title: 'Kalau tidak: else',
        materi: [
          { say: '<code>else</code> menangkap semua keadaan saat kondisi if bernilai False. else juga diakhiri titik dua.', code: 'nilai = 60\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Ikut remedial")', out: 'Ikut remedial' },
          { say: 'Dari if dan else, hanya <b>satu</b> yang dijalankan. Tidak mungkin keduanya.', code: 'uang = 3000\nif uang >= 5000:\n    print("Bisa beli")\nelse:\n    print("Uang kurang")', out: 'Uang kurang' },
          { say: 'Contoh klasik: menentukan genap atau ganjil dengan <code>%</code>.', code: 'n = 7\nif n % 2 == 0:\n    print("Genap")\nelse:\n    print("Ganjil")', out: 'Ganjil' },
        ],
        soal: [
          OUT('nilai = 60\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Remedial")', ['Lulus', 'Remedial', 'Lulus\nRemedial', 'Tidak ada'], 1, '60 >= 75 bernilai False, jadi else jalan.'),
          OUT('uang = 8000\nif uang >= 5000:\n    print("Bisa beli")\nelse:\n    print("Uang kurang")', ['Bisa beli', 'Uang kurang', '3000', 'Error'], 0, '8000 >= 5000 bernilai True.'),
          M('Kapan isi else dijalankan?', ['Saat kondisi if True', 'Saat kondisi if False', 'Selalu', 'Tidak pernah'], 1, 'else menangkap keadaan saat kondisi salah.'),
          F('Lengkapi kata kunci yang hilang.', 'if hujan:\n    print("Bawa payung")\n___:\n    print("Pakai topi")', ['else', 'elif', 'if', 'for'], 'else', 'else menangani keadaan saat tidak hujan.'),
          TYPE('Ketik keluaran program ini.', 'n = 10\nif n % 2 == 0:\n    print("Genap")\nelse:\n    print("Ganjil")', 'Genap', '10 % 2 = 0, jadi Genap.'),
          O('Susun program penentu kelulusan dengan batas 75.', ['nilai = int(input("Nilai: "))', 'if nilai >= 75:', '    print("Lulus")', 'else:', '    print("Remedial")'], 'Nilai diambil dulu, lalu if dan isinya, kemudian else dan isinya.'),
        ],
      },
      {
        title: 'Banyak pilihan: elif',
        materi: [
          { say: 'Pakai <code>elif</code> (else if) untuk memeriksa beberapa kondisi berurutan.', code: 'nilai = 85\nif nilai >= 90:\n    print("A")\nelif nilai >= 80:\n    print("B")\nelif nilai >= 70:\n    print("C")\nelse:\n    print("D")', out: 'B' },
          { say: 'Python memeriksa dari atas dan <b>berhenti di kondisi pertama yang True</b>. Sisanya dilewati.', steps: ['85 >= 90? False, lanjut', '85 >= 80? True → cetak B, berhenti', 'elif dan else di bawahnya dilewati'] },
          { say: 'Karena itu, urutan kondisi penting! Taruh kondisi yang paling ketat di atas.', note: '<b>Coba pikir:</b> kalau <code>nilai >= 70</code> ditaruh paling atas, nilai 95 akan mendapat C. Kenapa?' },
        ],
        soal: [
          OUT('nilai = 85\nif nilai >= 90:\n    print("A")\nelif nilai >= 80:\n    print("B")\nelse:\n    print("C")', ['A', 'B', 'C', 'B\nC'], 1, '85 tidak >= 90, tetapi >= 80.'),
          OUT('nilai = 95\nif nilai >= 90:\n    print("A")\nelif nilai >= 80:\n    print("B")\nelse:\n    print("C")', ['A', 'B', 'A\nB', 'C'], 0, '95 >= 90 sudah True, jadi berhenti di A.'),
          OUT('nilai = 50\nif nilai >= 90:\n    print("A")\nelif nilai >= 70:\n    print("B")\nelse:\n    print("C")', ['A', 'B', 'C', 'Tidak ada'], 2, 'Tidak ada kondisi True, jadi else jalan.'),
          F('Lengkapi kata kunci untuk kondisi kedua.', 'if nilai >= 90:\n    print("A")\n___ nilai >= 80:\n    print("B")', ['elif', 'else', 'if', 'for'], 'elif', 'Kondisi tambahan memakai elif.'),
          M('Dari rangkaian if-elif-else, berapa blok yang dijalankan?', ['Semua blok', 'Hanya satu blok', 'Dua blok', 'Tergantung jumlah elif'], 1, 'Python berhenti di kondisi pertama yang True.'),
          BUG('Nilai 95 malah mendapat "C". Apa penyebabnya?', 'if nilai >= 70:\n    print("C")\nelif nilai >= 90:\n    print("A")', ['Urutan kondisi terbalik, yang paling ketat harus di atas', 'Harus memakai else', 'Operator >= salah', 'print salah tulis'], 0, '95 >= 70 sudah True duluan, jadi elif tidak pernah diperiksa.'),
        ],
      },
      {
        title: 'Logika: and, or, not',
        materi: [
          { say: '<code>and</code>: hasilnya True hanya kalau <b>kedua</b> kondisi True.', code: 'umur = 13\npunya_tiket = True\nprint(umur >= 12 and punya_tiket)', out: 'True' },
          { say: '<code>or</code>: hasilnya True kalau <b>salah satu</b> kondisi True.', code: 'hari = "Minggu"\nprint(hari == "Sabtu" or hari == "Minggu")', out: 'True' },
          { say: '<code>not</code> membalik nilai: True menjadi False, False menjadi True.', code: 'hujan = False\nif not hujan:\n    print("Main di luar!")', out: 'Main di luar!' },
        ],
        soal: [
          OUT('print(True and False)', ['True', 'False', 'TrueFalse', 'Error'], 1, 'and butuh keduanya True.'),
          OUT('print(True or False)', ['True', 'False', 'TrueFalse', 'Error'], 0, 'or cukup salah satu True.'),
          OUT('print(not True)', ['True', 'False', 'not True', 'Error'], 1, 'not membalik True menjadi False.'),
          OUT('nilai = 80\nhadir = True\nif nilai >= 75 and hadir:\n    print("Naik kelas")\nelse:\n    print("Belum naik")', ['Naik kelas', 'Belum naik', 'True', 'Error'], 0, 'Kedua syarat terpenuhi.'),
          F('Diskon berlaku di hari Sabtu ATAU Minggu.', 'if hari == "Sabtu" ___ hari == "Minggu":\n    print("Diskon!")', ['or', 'and', 'not', '=='], 'or', 'Cukup salah satu hari, jadi pakai or.'),
          TYPE('Ketik keluaran program ini.', 'print(5 > 3 and 2 > 4)', 'False', '5 > 3 True, tetapi 2 > 4 False. and butuh keduanya True.'),
        ],
      },
      {
        title: 'Studi kasus: tiket wisata',
        materi: [
          { say: 'Ayo pakai semuanya untuk masalah nyata! Harga tiket ditentukan umur: balita gratis, anak-anak 10000, dewasa 20000.', code: 'umur = int(input("Umur: "))\nif umur < 5:\n    print("Gratis")\nelif umur < 13:\n    print("Tiket anak: 10000")\nelse:\n    print("Tiket dewasa: 20000")' },
          { say: 'Programmer yang baik menguji program dengan beberapa nilai, terutama nilai di <b>batas</b> seperti 5 dan 13.', steps: ['umur 3 → Gratis', 'umur 5 → Tiket anak (5 < 5 bernilai False)', 'umur 12 → Tiket anak', 'umur 13 → Tiket dewasa'] },
          { say: 'Menguji kasus batas membantu menemukan kesalahan sebelum program dipakai orang lain.', note: '<b>Kebiasaan baik:</b> setiap selesai menulis if, coba nilai tepat di batasnya, satu di bawah, dan satu di atas.' },
        ],
        soal: [
          M('Pengguna mengetik 3. Apa yang tampil?', ['Gratis', 'Tiket anak: 10000', 'Tiket dewasa: 20000', 'Error'], 0, '3 < 5 bernilai True.', { tag: 'Tebak keluaran', code: 'umur = int(input("Umur: "))\nif umur < 5:\n    print("Gratis")\nelif umur < 13:\n    print("Tiket anak: 10000")\nelse:\n    print("Tiket dewasa: 20000")', mono: true }),
          M('Pengguna mengetik 5. Apa yang tampil?', ['Gratis', 'Tiket anak: 10000', 'Tiket dewasa: 20000', 'Error'], 1, '5 < 5 bernilai False, tetapi 5 < 13 True.', { tag: 'Tebak keluaran', code: 'umur = int(input("Umur: "))\nif umur < 5:\n    print("Gratis")\nelif umur < 13:\n    print("Tiket anak: 10000")\nelse:\n    print("Tiket dewasa: 20000")', mono: true }),
          M('Pengguna mengetik 13. Apa yang tampil?', ['Gratis', 'Tiket anak: 10000', 'Tiket dewasa: 20000', 'Error'], 2, '13 < 13 bernilai False, jadi masuk else.', { tag: 'Tebak keluaran', code: 'umur = int(input("Umur: "))\nif umur < 5:\n    print("Gratis")\nelif umur < 13:\n    print("Tiket anak: 10000")\nelse:\n    print("Tiket dewasa: 20000")', mono: true }),
          M('Kenapa kita perlu menguji nilai batas seperti 5 dan 13?', ['Supaya program lebih panjang', 'Karena kesalahan sering terjadi tepat di batas', 'Karena Python mewajibkannya', 'Tidak perlu diuji'], 1, 'Salah memilih < atau <= paling terlihat di nilai batas.'),
          F('Cetak "Lulus" untuk nilai 75 ke atas, termasuk 75.', 'if nilai ___ 75:\n    print("Lulus")', ['>=', '>', '<=', '=='], '>=', '"75 ke atas" termasuk 75, jadi pakai >=.'),
          O('Susun program pengecek genap atau ganjil.', ['n = int(input("Angka: "))', 'if n % 2 == 0:', '    print("Genap")', 'else:', '    print("Ganjil")'], 'Ambil angka, cek sisa bagi 2, lalu tampilkan hasilnya.'),
        ],
      },
    ],
  },

  /* ============================ UNIT 6 ============================ */
  {
    id: 'for', title: 'Perulangan', desc: 'Mengulang perintah tanpa lelah',
    color: '#8656D3', deep: '#5F3AA0', badge: { glyph: 'for', name: 'Raja Perulangan' },
    goals: ['Mengulang perintah dengan for dan range()', 'Mengatur awal, akhir, dan lompatan', 'Memakai variabel i di dalam loop', 'Menjumlahkan dengan pola akumulator', 'Menggabungkan for dengan if dan membuat pola'],
    lessons: [
      {
        title: 'Kenapa perlu perulangan?',
        materi: [
          { say: 'Disuruh menulis kalimat yang sama 100 kali? Pakai <code>for</code>! Tulis perintahnya sekali, komputer yang mengulang.', code: 'for i in range(3):\n    print("Aku rajin belajar")', out: 'Aku rajin belajar\nAku rajin belajar\nAku rajin belajar' },
          { say: '<code>range(n)</code> menghasilkan angka 0 sampai n-1. Variabel <code>i</code> berisi angka itu satu per satu.', code: 'for i in range(4):\n    print(i)', out: '0\n1\n2\n3', note: '<b>Ingat:</b> batas akhir tidak ikut. range(4) berhenti di 3.' },
          { say: 'Sama seperti if, baris for diakhiri <b>titik dua</b> dan isinya <b>menjorok 4 spasi</b>. Baris yang tidak menjorok dijalankan setelah loop selesai.', code: 'for i in range(2):\n    print("Lompat!")\nprint("Selesai")', out: 'Lompat!\nLompat!\nSelesai' },
        ],
        soal: [
          M('Berapa kali "Hai" dicetak?', ['3 kali', '4 kali', '5 kali', '1 kali'], 1, 'range(4) menghasilkan 0, 1, 2, 3.', { code: 'for i in range(4):\n    print("Hai")' }),
          OUT('for i in range(3):\n    print(i)', ['0\n1\n2', '1\n2\n3', '0\n1\n2\n3', '3'], 0, 'Mulai dari 0 dan berhenti sebelum 3.'),
          F('Cetak "Semangat" sebanyak 5 kali.', 'for i in range(___):\n    print("Semangat")', ['5', '4', '6', '1'], '5', 'range(5) menghasilkan lima putaran.'),
          BUG('Kenapa kode ini error?', 'for i in range(3):\nprint(i)', ['range harus diawali 1', 'Baris print belum menjorok ke dalam', 'Harus pakai if', 'Variabel i belum dibuat'], 1, 'Isi perulangan wajib menjorok.'),
          OUT('for i in range(2):\n    print("Lompat!")\nprint("Selesai")', ['Lompat!\nSelesai', 'Lompat!\nLompat!\nSelesai', 'Lompat!\nSelesai\nLompat!\nSelesai', 'Selesai'], 1, 'print("Selesai") tidak menjorok, jadi jalan sekali setelah loop.'),
          TYPE('Berapa kali tulisan Halo dicetak? Ketik angkanya.', 'for i in range(7):\n    print("Halo")', '7', 'range(7) memberi tujuh putaran.'),
        ],
      },
      {
        title: 'Awal, akhir, lompatan',
        materi: [
          { say: '<code>range(awal, akhir)</code> mulai dari angka awal dan berhenti <b>sebelum</b> angka akhir.', code: 'for i in range(1, 6):\n    print(i)', out: '1\n2\n3\n4\n5' },
          { say: 'Angka ketiga menentukan <b>lompatan</b>.', code: 'for i in range(2, 11, 2):\n    print(i)', out: '2\n4\n6\n8\n10' },
          { say: 'Lompatan negatif dipakai untuk hitung mundur.', code: 'for i in range(3, 0, -1):\n    print(i)\nprint("Meluncur!")', out: '3\n2\n1\nMeluncur!' },
        ],
        soal: [
          OUT('for i in range(1, 4):\n    print(i)', ['1\n2\n3', '1\n2\n3\n4', '0\n1\n2\n3', '1\n4'], 0, 'Mulai 1, berhenti sebelum 4.'),
          F('Cetak angka 1 sampai 5.', 'for i in range(1, ___):\n    print(i)', ['5', '6', '4', '1'], '6', 'Batas akhir tidak ikut, jadi batasnya 6.'),
          M('Angka apa saja yang dihasilkan range(0, 10, 3)?', ['0, 3, 6, 9', '3, 6, 9', '0, 3, 6, 9, 12', '0, 10, 3'], 0, 'Mulai 0, lompat 3, berhenti sebelum 10.', { mono: true }),
          F('Cetak bilangan genap 2 sampai 10.', 'for i in range(2, 11, ___):\n    print(i)', ['2', '1', '3', '10'], '2', 'Lompat 2 dari angka 2 menghasilkan bilangan genap.'),
          OUT('for i in range(3, 0, -1):\n    print(i)', ['3\n2\n1', '1\n2\n3', '3\n2\n1\n0', '0\n1\n2'], 0, 'Hitung mundur, berhenti sebelum 0.'),
          MATCH('Pasangkan range dengan angka yang dihasilkannya.', [['range(3)', '0, 1, 2'], ['range(1, 4)', '1, 2, 3'], ['range(0, 7, 3)', '0, 3, 6']], 'Perhatikan awal, akhir, dan lompatan.'),
        ],
      },
      {
        title: 'Memakai i di dalam loop',
        materi: [
          { say: 'Variabel <code>i</code> berubah di setiap putaran. Pakai untuk menomori sesuatu.', code: 'for i in range(1, 4):\n    print(f"Hari ke-{i}")', out: 'Hari ke-1\nHari ke-2\nHari ke-3' },
          { say: 'i juga bisa dihitung. Contoh: tabel perkalian 3.', code: 'for i in range(1, 6):\n    print(f"3 x {i} = {3 * i}")', out: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15' },
          { say: 'Ayo lacak isi i. Di putaran terakhir, i bernilai <b>akhir - 1</b>.', steps: ['range(2, 5) → i = 2, lalu 3, lalu 4', 'Putaran terakhir: i = 4', 'Jumlah putaran: 5 - 2 = 3'] },
        ],
        soal: [
          OUT('for i in range(1, 4):\n    print(f"Level {i}")', ['Level 1\nLevel 2\nLevel 3', 'Level i\nLevel i\nLevel i', 'Level 0\nLevel 1\nLevel 2', 'Level 1 2 3'], 0, 'i bernilai 1, 2, lalu 3.'),
          TYPE('Ketik baris TERAKHIR yang ditampilkan.', 'for i in range(1, 4):\n    print(i * 10)', '30', 'Putaran terakhir i = 3, jadi 3 × 10 = 30.'),
          OUT('for i in range(1, 3):\n    print(f"2 x {i} = {2 * i}")', ['2 x 1 = 2\n2 x 2 = 4', '2 x i = 2i', '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6', '2\n4'], 0, 'i bernilai 1 lalu 2.'),
          F('Tampilkan tabel perkalian 5.', 'for i in range(1, 11):\n    print(f"5 x {i} = {5 ___ i}")', ['*', '+', 'x', '/'], '*', 'Perkalian memakai *.'),
          M('Berapa nilai i pada putaran terakhir?', ['6', '7', '5', '2'], 0, 'Berhenti sebelum 7, jadi i terakhir 6.', { code: 'for i in range(2, 7):\n    print(i)' }),
          O('Susun program: 3 lompatan bernomor, lalu tulisan Selesai sekali.', ['for i in range(1, 4):', '    print(f"Lompat ke-{i}")', 'print("Selesai!")'], 'Baris yang diulang menjorok. Selesai! di luar loop.'),
        ],
      },
      {
        title: 'Menjumlahkan dengan loop',
        materi: [
          { say: 'Pola <b>akumulator</b>: siapkan variabel penampung bernilai 0 <b>sebelum</b> loop, lalu tambahkan isinya di setiap putaran.', code: 'total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)', out: '10' },
          { say: 'Ayo lacak isi total di setiap putaran.', steps: ['Awal: total = 0', 'i = 1 → total = 0 + 1 = 1', 'i = 2 → total = 1 + 2 = 3', 'i = 3 → total = 3 + 3 = 6', 'i = 4 → total = 6 + 4 = 10'] },
          { say: 'Letak <code>print</code> penting. Di luar loop, tampil sekali. Di dalam loop, tampil setiap putaran.', code: 'total = 0\nfor i in range(1, 4):\n    total = total + i\n    print(total)', out: '1\n3\n6' },
        ],
        soal: [
          OUT('total = 0\nfor i in range(1, 4):\n    total = total + i\nprint(total)', ['3', '4', '6', '10'], 2, '1 + 2 + 3 = 6.'),
          F('Tambahkan i ke total.', 'total = total ___ i', ['+', '-', '*', '='], '+', 'Setiap putaran, i ditambahkan ke total.'),
          M('Kenapa total = 0 ditulis sebelum loop?', ['Supaya ada nilai awal untuk ditambah', 'Supaya loop lebih cepat', 'Karena wajib diawali 0', 'Supaya loop berhenti'], 0, 'total = total + i butuh nilai total yang sudah ada.'),
          OUT('total = 0\nfor i in range(1, 4):\n    total = total + i\n    print(total)', ['6', '1\n3\n6', '1\n2\n3', '0\n1\n3'], 1, 'print di dalam loop, jadi tampil setiap putaran.'),
          TYPE('Ketik keluaran program ini.', 'hasil = 1\nfor i in range(1, 5):\n    hasil = hasil * i\nprint(hasil)', '24', '1 × 1 × 2 × 3 × 4 = 24.'),
          O('Susun program penjumlah 1 sampai 5 yang menampilkan totalnya sekali.', ['total = 0', 'for i in range(1, 6):', '    total = total + i', 'print(total)'], 'Penampung sebelum loop, penjumlahan di dalam, print di luar.'),
        ],
      },
      {
        title: 'Loop bersama if',
        materi: [
          { say: 'Gabungkan <code>for</code> dan <code>if</code> untuk memilih angka tertentu. Perhatikan: isi if menjorok <b>dua kali</b>.', code: 'for i in range(1, 11):\n    if i % 2 == 0:\n        print(i)', out: '2\n4\n6\n8\n10' },
          { say: 'Bisa juga menghitung berapa banyak yang cocok.', code: 'jumlah = 0\nfor i in range(1, 21):\n    if i % 5 == 0:\n        jumlah = jumlah + 1\nprint(jumlah)', out: '4', note: '<b>Yang cocok:</b> 5, 10, 15, dan 20.' },
          { say: 'if di dalam loop juga boleh punya else.', code: 'for i in range(1, 4):\n    if i % 2 == 0:\n        print(i, "genap")\n    else:\n        print(i, "ganjil")', out: '1 ganjil\n2 genap\n3 ganjil' },
        ],
        soal: [
          OUT('for i in range(1, 6):\n    if i % 2 == 1:\n        print(i)', ['2\n4', '1\n3\n5', '1\n2\n3\n4\n5', '1\n3'], 1, 'Sisa bagi 1 berarti ganjil.'),
          F('Pilih bilangan genap saja.', 'if i % 2 ___ 0:\n    print(i)', ['==', '=', '!=', '>'], '==', 'Genap berarti sisa baginya sama dengan 0.'),
          OUT('for i in range(1, 11):\n    if i % 5 == 0:\n        print(i)', ['5', '5\n10', '10', '1\n5'], 1, 'Kelipatan 5 antara 1 dan 10 adalah 5 dan 10.'),
          TYPE('Ketik keluaran program ini.', 'jumlah = 0\nfor i in range(1, 11):\n    if i % 3 == 0:\n        jumlah = jumlah + 1\nprint(jumlah)', '3', 'Kelipatan 3: 3, 6, dan 9.'),
          O('Susun program yang mencetak bilangan genap 1 sampai 10.', ['for i in range(1, 11):', '    if i % 2 == 0:', '        print(i)'], 'if di dalam loop, print di dalam if.'),
          OUT('for i in range(1, 3):\n    if i % 2 == 0:\n        print("genap")\n    else:\n        print("ganjil")', ['ganjil\ngenap', 'genap\nganjil', 'ganjil', 'genap'], 0, 'i = 1 ganjil, i = 2 genap.'),
        ],
      },
      {
        title: 'Pola & teks dengan loop',
        materi: [
          { say: 'Gabungkan loop dengan teks yang dikali untuk membuat pola.', code: 'for i in range(1, 5):\n    print("*" * i)', out: '*\n**\n***\n****' },
          { say: 'Loop juga bisa membaca <b>huruf satu per satu</b> dari teks.', code: 'for huruf in "Bito":\n    print(huruf)', out: 'B\ni\nt\no' },
          { say: 'Selamat! Kamu sudah menguasai runtutan, percabangan, dan perulangan. Ketiganya adalah fondasi semua program di dunia.', note: '<b>Selanjutnya:</b> Misi Akhir. Kamu akan membuat program utuh dari semua yang sudah dipelajari.' },
        ],
        soal: [
          OUT('for i in range(1, 4):\n    print("*" * i)', ['*\n**\n***', '***\n**\n*', '* * *', '*\n*\n*'], 0, 'Baris ke-i berisi i bintang.'),
          OUT('for huruf in "Hai":\n    print(huruf)', ['Hai', 'H\na\ni', 'H a i', '3'], 1, 'Setiap huruf dicetak di baris sendiri.'),
          TYPE('Ketik baris TERAKHIR yang ditampilkan.', 'for i in range(4):\n    print("#" * i)', '###', 'Putaran terakhir i = 3, jadi "#" dikali 3.'),
          F('Buat segitiga bintang setinggi 5 baris.', 'for i in range(1, ___):\n    print("*" * i)', ['6', '5', '4', '1'], '6', 'i harus sampai 5, jadi batas akhirnya 6.'),
          M('Berapa kali loop ini berjalan?', ['5', '6', '7', '1'], 1, '"Python" punya 6 huruf.', { code: 'for huruf in "Python":\n    print(huruf)' }),
          OUT('for i in range(3, 0, -1):\n    print("=" * i)', ['===\n==\n=', '=\n==\n===', '===', '=\n=\n='], 0, 'i bernilai 3, 2, lalu 1.'),
        ],
      },
    ],
  },

  /* ============================ UNIT 7 ============================ */
  {
    id: 'misi', title: 'Misi Akhir', desc: 'Membuat program utuh untuk masalah nyata',
    color: '#D9A206', deep: '#9E7500', badge: { glyph: 'Rp', name: 'Programmer Muda' }, boss: true,
    goals: ['Merancang program dengan pola Masukan → Proses → Keluaran', 'Menggabungkan variabel, input, if, dan for', 'Menguji program dengan beberapa data'],
    lessons: [
      {
        title: 'Misi 1: Rapor Digital',
        materi: [
          { say: 'Bu Guru minta program untuk menghitung rata-rata 3 nilai siswa, lalu menentukan lulus atau remedial (batas 75).', steps: ['Masukan: nama dan 3 nilai', 'Proses: jumlahkan dengan loop, lalu bagi 3', 'Keluaran: lulus atau remedial beserta rata-ratanya'] },
          { say: 'Ini programnya. Perhatikan bagaimana semua materi bekerja sama.', code: 'nama = input("Nama: ")\ntotal = 0\nfor i in range(3):\n    nilai = int(input("Nilai: "))\n    total = total + nilai\nrata = total / 3\nif rata >= 75:\n    print(f"{nama} lulus, rata-rata {rata}")\nelse:\n    print(f"{nama} remedial, rata-rata {rata}")' },
        ],
        soal: [
          F('Ulangi permintaan nilai sebanyak 3 kali.', 'for i in range(___):\n    nilai = int(input("Nilai: "))', ['3', '2', '4', 'nilai'], '3', 'range(3) memberi tiga putaran.'),
          F('Hitung rata-rata dari total 3 nilai.', 'rata = total ___ 3', ['/', '*', '%', '+'], '/', 'Rata-rata = total dibagi banyak data.'),
          M('Sari memasukkan nilai 80, 90, dan 70. Apa yang tampil?', ['Sari lulus, rata-rata 80.0', 'Sari remedial, rata-rata 80.0', 'Sari lulus, rata-rata 240', 'Sari lulus, rata-rata 80'], 0, 'Total 240, dibagi 3 menjadi 80.0. 80.0 >= 75.', { tag: 'Tebak keluaran', mono: true }),
          M('Tono memasukkan nilai 60, 70, dan 80. Apa yang tampil?', ['Tono lulus, rata-rata 70.0', 'Tono remedial, rata-rata 70.0', 'Tono remedial, rata-rata 210', 'Tono lulus, rata-rata 75'], 1, 'Rata-rata 70.0 kurang dari 75.', { tag: 'Tebak keluaran', mono: true }),
          M('Kenapa memakai loop untuk meminta nilai?', ['Supaya tidak menulis input yang sama berulang-ulang', 'Supaya nilainya lebih besar', 'Karena input tidak bisa dipakai tanpa loop', 'Supaya program error'], 0, 'Loop menghemat penulisan perintah yang berulang.'),
          O('Susun bagian proses dan keluaran program rapor.', ['rata = total / 3', 'if rata >= 75:', '    print("Lulus")', 'else:', '    print("Remedial")'], 'Rata-rata dihitung dulu, baru dibandingkan.'),
        ],
      },
      {
        title: 'Misi 2: Kasir Warung',
        materi: [
          { say: 'Warung Bu Tini butuh program kasir! Program menanyakan jumlah barang, meminta harga setiap barang, lalu menjumlahkannya. Kalau total lebih dari Rp50.000, pembeli dapat potongan Rp5.000.', note: '<b>Senjatamu:</b> variabel, input dan int, for, dan if.' },
          { say: 'Begini rancangan programnya. Ayo bangun dan uji bersama!', code: 'jumlah = int(input("Jumlah barang: "))\ntotal = 0\nfor i in range(jumlah):\n    harga = int(input("Harga: "))\n    total = total + harga\nif total > 50000:\n    total = total - 5000\nprint("Bayar:", total)' },
        ],
        soal: [
          M('Kenapa total = 0 ditulis sebelum perulangan?', ['Supaya ada nilai awal untuk ditambah harga', 'Supaya program lebih cepat', 'Karena Python wajib diawali 0', 'Supaya pembeli tidak membayar'], 0, 'total = total + harga butuh nilai awal.'),
          F('Ulangi permintaan harga sebanyak jumlah barang.', 'for i in range(___):\n    harga = int(input("Harga: "))', ['jumlah', 'total', 'harga', '50000'], 'jumlah', 'Banyaknya putaran sama dengan jumlah barang.'),
          F('Tambahkan harga ke total belanja.', 'total = total ___ harga', ['+', '-', '*', '='], '+', 'Setiap harga ditambahkan ke total.'),
          M('Pembeli membeli 2 barang seharga 15000 dan 20000. Apa yang tampil?', ['Bayar: 35000', 'Bayar: 30000', 'Bayar: 1500020000', 'Bayar: 40000'], 0, '35000 tidak lebih dari 50000, tidak ada potongan.', { mono: true, tag: 'Tebak keluaran' }),
          M('Pembeli membeli 3 barang seharga 20000, 25000, dan 10000. Apa yang tampil?', ['Bayar: 55000', 'Bayar: 50000', 'Bayar: 45000', 'Bayar: 60000'], 1, '55000 lebih dari 50000, dipotong 5000.', { mono: true, tag: 'Tebak keluaran' }),
          O('Susun program kasir Bu Tini secara lengkap.', ['jumlah = int(input("Jumlah barang: "))', 'total = 0', 'for i in range(jumlah):', '    harga = int(input("Harga: "))', '    total = total + harga', 'if total > 50000:', '    total = total - 5000', 'print("Bayar:", total)'], 'Ambil jumlah, siapkan total, ulangi tiap harga, cek potongan setelah loop, lalu tampilkan.'),
        ],
      },
      {
        title: 'Misi 3: Pemburu Genap',
        materi: [
          { say: 'Misi terakhir! Buat program yang menghitung ada berapa bilangan genap dari 1 sampai angka pilihan pengguna.', steps: ['Masukan: angka batas n', 'Proses: periksa 1 sampai n, hitung yang genap', 'Keluaran: banyaknya bilangan genap'] },
          { say: 'Perhatikan <code>range(1, n + 1)</code>. Kenapa ditambah 1? Karena batas akhir range tidak ikut dihitung.', code: 'n = int(input("Sampai angka: "))\njumlah_genap = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        jumlah_genap = jumlah_genap + 1\nprint(f"Ada {jumlah_genap} bilangan genap")' },
        ],
        soal: [
          M('Kenapa memakai range(1, n + 1)?', ['Supaya n ikut diperiksa', 'Supaya mulai dari 0', 'Supaya loop lebih cepat', 'Tanpa alasan'], 0, 'Batas akhir range tidak ikut, jadi ditambah 1.'),
          F('Periksa apakah i bilangan genap.', 'if i ___ 2 == 0:', ['%', '//', '/', '*'], '%', 'Genap dicek dengan sisa bagi 2.'),
          M('Pengguna mengetik 10. Apa yang tampil?', ['Ada 5 bilangan genap', 'Ada 10 bilangan genap', 'Ada 4 bilangan genap', 'Ada 6 bilangan genap'], 0, '2, 4, 6, 8, dan 10.', { mono: true, tag: 'Tebak keluaran' }),
          TYPE('Pengguna mengetik 7. Berapa bilangan genap yang dihitung? Ketik angkanya.', 'n = int(input("Sampai angka: "))\njumlah_genap = 0\nfor i in range(1, n + 1):\n    if i % 2 == 0:\n        jumlah_genap = jumlah_genap + 1\nprint(jumlah_genap)', '3', '2, 4, dan 6.'),
          F('Tambah penghitung setiap menemukan bilangan genap.', 'jumlah_genap = jumlah_genap ___ 1', ['+', '-', '*', '%'], '+', 'Penghitung bertambah 1 setiap kali cocok.'),
          O('Susun program Pemburu Genap secara lengkap.', ['n = int(input("Sampai angka: "))', 'jumlah_genap = 0', 'for i in range(1, n + 1):', '    if i % 2 == 0:', '        jumlah_genap = jumlah_genap + 1', 'print(f"Ada {jumlah_genap} bilangan genap")'], 'Masukan, penghitung, loop berisi if, lalu keluaran.'),
        ],
      },
    ],
  },
];

export const FLAT = [];
UNITS.forEach((u, ui) => u.lessons.forEach((l, li) => FLAT.push({ u, ui, l, li, key: `${u.id}-${li}` })));
