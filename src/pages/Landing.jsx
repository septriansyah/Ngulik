import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Bito from '../components/Bito.jsx';
import PublicNav from '../components/PublicNav.jsx';
import BadgeIcon from '../components/BadgeIcon.jsx';
import { Google, Fire, Bolt, Heart, Trophy, Book, Target } from '../components/Icons.jsx';
import { UNITS, FLAT } from '../data/curriculum.js';
import { BADGES } from '../data/badges.js';
import { sfx } from '../lib/sound.js';

const TOTAL_SOAL = FLAT.reduce((n, f) => n + f.l.soal.length, 0);

export default function Landing() {
  const { user, loading, signInGoogle, signInGuest, firebaseReady, error } = useApp();
  const [guestOpen, setGuestOpen] = useState(false);
  const [name, setName] = useState('');
  if (!loading && user) return <Navigate to="/belajar" replace />;

  const google = () => { sfx.tap(); signInGoogle(); };
  const guest = (e) => { e.preventDefault(); sfx.correct(); signInGuest(name); };

  const Cta = ({ big }) => (
    <div className={`cta-row ${big ? 'big' : ''}`}>
      {firebaseReady && (
        <button className="btn google" onClick={google}><Google /> Masuk dengan Google</button>
      )}
      {!firebaseReady && (
        <button className="btn green" onClick={() => { sfx.tap(); setGuestOpen(true); }}>Mulai belajar</button>
      )}
    </div>
  );

  return (
    <div className="landing">
      <PublicNav>
        {firebaseReady
          ? <button className="btn small ghost" onClick={google}><Google /> Masuk</button>
          : <button className="btn small ghost" onClick={() => setGuestOpen(true)}>Mulai</button>}
      </PublicNav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Informatika SMP · Fase D</span>
          <h1>Belajar ngoding lima menit sehari, bareng <em>Bito</em>.</h1>
          <p className="lede">Kuasai algoritma dasar Python dari variabel sampai perulangan. Pelajarannya pendek, soalnya seperti permainan, dan setiap hari belajar menjaga api streak-mu tetap menyala.</p>
          <Cta />
          <Link className="tut-link" to="/cara-pakai" onClick={() => sfx.tap()}>Lihat cara memakainya →</Link>
          {error && <p className="error">{error}</p>}
          <ul className="hero-facts">
            <li><b>{UNITS.length}</b> unit</li>
            <li><b>{FLAT.length}</b> pelajaran</li>
            <li><b>{TOTAL_SOAL}</b> soal latihan</li>
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="phone">
            <div className="phone-bar"><span className="pbar"><i style={{ width: '62%' }} /></span><span className="hearts"><Heart />4</span></div>
            <span className="tag">Tebak keluaran</span>
            <p className="phone-q">Apa yang ditampilkan program ini?</p>
            <pre className="code small"><span className="b">print</span>(<span className="n">2</span> + <span className="n">3</span> * <span className="n">4</span>)</pre>
            <div className="phone-opt">20</div>
            <div className="phone-opt sel">14</div>
            <div className="phone-ok"><b>Mantap!</b> Kali dulu, baru tambah.</div>
          </div>
          <Bito mood="wave" className="hero-bito" />
          <span className="float f1"><Fire /> 12 hari</span>
          <span className="float f2"><Bolt /> +15 XP</span>
        </div>
      </section>

      <section className="lsec">
        <h2>Kenapa belajar di Ngulik!?</h2>
        <div className="feat-grid">
          <article className="feat"><span className="ficon" style={{ '--c': 'var(--u1)' }}><Book /></span><h3>Bito menjelaskan dulu</h3><p>Setiap pelajaran dibuka dengan penjelasan singkat, contoh kode, dan keluarannya. Baru setelah itu latihan.</p></article>
          <article className="feat"><span className="ficon" style={{ '--c': 'var(--u4)' }}><Target /></span><h3>Enam jenis soal</h3><p>Pilihan ganda, tebak keluaran, isi bagian kosong, susun blok kode, ketik jawaban, dan pasangkan.</p></article>
          <article className="feat"><span className="ficon" style={{ '--c': '#F27A1A' }}><Fire /></span><h3>Streak & lencana</h3><p>Belajar setiap hari menjaga api streak. Kumpulkan {BADGES.length} lencana dari tiap pencapaian.</p></article>
          <article className="feat"><span className="ficon" style={{ '--c': 'var(--u7)' }}><Trophy /></span><h3>Papan peringkat</h3><p>Bersaing XP dan streak dengan teman sekelas. Progres tersimpan di akun Google-mu.</p></article>
        </div>
      </section>

      <section className="lsec">
        <h2>Jalur belajarnya</h2>
        <p className="sub">Materi disusun bertahap. Unit berikutnya terbuka setelah unit sebelumnya tuntas.</p>
        <ol className="track">
          {UNITS.map((u, i) => (
            <li key={u.id} style={{ '--uc': u.color, '--ud': u.deep }}>
              <span className="tnum">{u.boss ? '★' : i + 1}</span>
              <div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
                <small>{u.lessons.length} pelajaran · {u.lessons.map((l) => l.title).join(' · ')}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="lsec how">
        <h2>Satu pelajaran, tiga langkah</h2>
        <ol className="how-steps">
          <li><b>Dengarkan Bito.</b> Dua sampai tiga kartu penjelasan berisi contoh kode yang bisa langsung dibaca.</li>
          <li><b>Jawab enam soal.</b> Kamu punya lima nyawa. Soal yang salah muncul lagi sampai kamu paham.</li>
          <li><b>Rayakan.</b> Dapatkan XP, jaga streak, dan buka lencana baru.</li>
        </ol>
        <div className="badge-strip" aria-hidden="true">
          {BADGES.slice(1, 8).map((b) => <BadgeIcon key={b.id} badge={b} />)}
        </div>
      </section>

      <section className="final">
        <Bito mood="happy" />
        <div>
          <h2>Siap mulai ngulik?</h2>
          <p>Pelajaran pertama cuma butuh lima menit.</p>
          <Cta big />
        </div>
      </section>

      <footer className="lfoot">Ngulik! · Media pembelajaran algoritma dasar untuk Informatika SMP/MTs · <Link to="/tentang">Tentang Ngulik!</Link></footer>

      {guestOpen && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setGuestOpen(false)}>
          <form className="sheet" onSubmit={guest}>
            <div className="talk"><Bito mood="wave" /><div className="bubble">Halo! Aku <b>Bito</b>. Siapa nama panggilanmu?</div></div>
            <label className="field-label" htmlFor="guest-name">Nama panggilan</label>
            <input id="guest-name" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Dimas" maxLength={30} autoFocus />
            <p className="hint">{firebaseReady ? 'Progres mode tamu tersimpan di browser ini. Masuk dengan Google kapan saja untuk menyimpannya ke akun.' : 'Progres tersimpan di browser ini.'}</p>
            <button className="btn green wide" type="submit">Ayo mulai</button>
          </form>
        </div>
      )}
    </div>
  );
}
