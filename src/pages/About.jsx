import { Link } from 'react-router-dom';
import Bito from '../components/Bito.jsx';
import PublicNav from '../components/PublicNav.jsx';
import { Book, Target, Fire, Bolt, User, Check, Clock } from '../components/Icons.jsx';
import { UNITS, FLAT } from '../data/curriculum.js';
import { sfx } from '../lib/sound.js';

const TOTAL_SOAL = FLAT.reduce((n, f) => n + f.l.soal.length, 0);

const TUJUAN = [
  { k: 'Variabel', t: <>Menjelaskan fungsi variabel dan membuat variabel bertipe angka, teks, dan boolean dengan nama yang tepat.</> },
  { k: 'Input-output', t: <>Menulis program yang menerima masukan pengguna dengan <code>input()</code> dan menampilkan keluaran dengan <code>print()</code>.</> },
  { k: 'Percabangan', t: <>Menyusun percabangan <code>if</code>, <code>elif</code>, dan <code>else</code> untuk mengambil keputusan berdasarkan kondisi.</> },
  { k: 'Perulangan', t: <>Menggunakan perulangan <code>for</code> dengan <code>range()</code> untuk mengulang perintah sebanyak jumlah tertentu.</> },
  { k: 'Gabungan', t: <>Menggabungkan keempat konsep tersebut untuk memecahkan masalah sederhana sehari-hari, misalnya menghitung total belanja atau menentukan kelulusan nilai.</> },
];

export default function About() {
  return (
    <div className="landing">
      <PublicNav>
        <Link to="/" className="btn small green" onClick={() => sfx.tap()}>Mulai</Link>
      </PublicNav>

      <section className="lsec about-head">
        <div>
          <span className="eyebrow">Tentang karya</span>
          <h1>Ngulik!: Mengulik Algoritma Dasar Setiap Hari</h1>
          <p className="lede">
            Ngulik! merupakan media pembelajaran berbasis aplikasi web yang mengadaptasi pola belajar Duolingo.
            Peserta didik menyelesaikan pelajaran pendek berdurasi 5 sampai 7 menit, mengumpulkan poin XP, dan
            menjaga streak harian. Materinya mencakup variabel, input-output, percabangan <code>if</code>, dan
            perulangan <code>for</code> dalam bahasa Python.
          </p>
          <ul className="hero-facts">
            <li><b>{UNITS.length}</b> unit</li>
            <li><b>{FLAT.length}</b> pelajaran</li>
            <li><b>{TOTAL_SOAL}</b> soal latihan</li>
          </ul>
        </div>
        <Bito mood="wave" />
      </section>

      <section className="lsec">
        <div className="about-grid">
          <article className="feat">
            <span className="ficon" style={{ '--c': 'var(--u4)' }}><User /></span>
            <h3>Sasaran & jenjang</h3>
            <p>Peserta didik SMP/MTs kelas VII pada Fase D Kurikulum Merdeka. Peserta didik belum perlu pengalaman menulis kode.</p>
            <p>Guru juga dapat memakainya di kelas VIII sebagai remedial atau penguatan konsep dasar pemrograman.</p>
          </article>
          <article className="feat">
            <span className="ficon" style={{ '--c': 'var(--u1)' }}><Book /></span>
            <h3>Mata pelajaran</h3>
            <p>Informatika, elemen <b>Algoritma dan Pemrograman</b> serta <b>Berpikir Komputasional</b>.</p>
          </article>
          <article className="feat">
            <span className="ficon" style={{ '--c': '#F27A1A' }}><Clock /></span>
            <h3>Pola belajar</h3>
            <p className="about-pills">
              <span><Clock /> 5–7 menit</span>
              <span><Bolt /> Poin XP</span>
              <span><Fire /> Streak harian</span>
            </p>
          </article>
        </div>
      </section>

      <section className="lsec">
        <h2>Tujuan pembelajaran</h2>
        <p className="sub">Setelah menyelesaikan seluruh unit Ngulik!, peserta didik mampu:</p>
        <ol className="about-goals">
          {TUJUAN.map((g) => (
            <li key={g.k}>
              <span className="ficon" style={{ '--c': 'var(--brand)' }}><Check /></span>
              <div><b>{g.k}</b><p>{g.t}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="final">
        <Bito mood="happy" />
        <div>
          <h2>Siap mulai ngulik?</h2>
          <p>Pelajaran pertama cuma butuh lima menit.</p>
          <div className="cta-row">
            <Link to="/" className="btn green" onClick={() => sfx.tap()}><Target /> Mulai belajar</Link>
            <Link to="/cara-pakai" className="btn ghost" onClick={() => sfx.tap()}>Cara memakai</Link>
          </div>
        </div>
      </section>

      <footer className="lfoot">Ngulik! · Media pembelajaran algoritma dasar untuk Informatika SMP/MTs</footer>
    </div>
  );
}
