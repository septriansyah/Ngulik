import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, firebaseReady } from '../firebase.js';
import { liveStreak, dayStr } from '../lib/progress.js';
import { FLAT } from '../data/curriculum.js';
import { BADGES } from '../data/badges.js';

export const ADMIN_EMAIL = 'admin@ngulik.app';

const SORTS = {
  name: (r) => (r.name || '').toLowerCase(),
  xp: (r) => r.xp, streak: (r) => r.streak, lessons: (r) => r.lessons, badges: (r) => r.badges, last: (r) => r.last || '',
};

function csv(rows) {
  const head = ['Nama', 'Email', 'XP', 'Streak', 'Pelajaran selesai', 'Lencana', 'Terakhir belajar'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [head, ...rows.map((r) => [r.name, r.email, r.xp, r.streak, r.lessons, r.badges, r.last || ''])].map((l) => l.map(esc).join(',')).join('\n');
}

export default function Office() {
  const [admin, setAdmin] = useState(undefined); // undefined = memeriksa
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState(null);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ key: 'xp', dir: -1 });

  useEffect(() => {
    if (!firebaseReady) { setAdmin(false); return undefined; }
    return onAuthStateChanged(auth, (u) => setAdmin(Boolean(u && u.email === ADMIN_EMAIL)));
  }, []);

  const load = () => {
    setRows(null);
    setErr('');
    getDocs(collection(db, 'users'))
      .then((snap) => setRows(snap.docs.map((d) => {
        const x = d.data();
        const p = x.progress || {};
        return {
          id: d.id, name: x.name || 'Tanpa nama', email: x.email || '', photo: x.photo || '',
          xp: p.xp || 0, streak: liveStreak(p), longest: p.longest || 0, last: p.last || '',
          lessons: Object.keys(p.done || {}).length, badges: Object.keys(p.badges || {}).length,
        };
      })))
      .catch(() => setErr('Data belum bisa dimuat. Pastikan aturan Firestore terbaru sudah di-deploy.'));
  };
  useEffect(() => { if (admin) load(); }, [admin]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try { await signInWithEmailAndPassword(auth, email.trim(), pw); }
    catch { setErr('Email atau kata sandi salah.'); }
    setBusy(false);
  };

  const stats = useMemo(() => {
    if (!rows) return null;
    const today = dayStr();
    return {
      total: rows.length,
      today: rows.filter((r) => r.last === today).length,
      xp: rows.reduce((n, r) => n + r.xp, 0),
      lessons: rows.reduce((n, r) => n + r.lessons, 0),
    };
  }, [rows]);

  const shown = useMemo(() => {
    if (!rows) return [];
    const s = q.trim().toLowerCase();
    const f = s ? rows.filter((r) => `${r.name} ${r.email}`.toLowerCase().includes(s)) : rows;
    const get = SORTS[sort.key];
    return [...f].sort((a, b) => (get(a) > get(b) ? 1 : get(a) < get(b) ? -1 : 0) * sort.dir);
  }, [rows, q, sort]);

  const th = (key, label) => (
    <th onClick={() => setSort((s) => ({ key, dir: s.key === key ? -s.dir : -1 }))} className={sort.key === key ? 'on' : ''}>
      {label}{sort.key === key ? (sort.dir < 0 ? ' ↓' : ' ↑') : ''}
    </th>
  );

  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv(shown)], { type: 'text/csv' }));
    a.download = `ngulik-siswa-${dayStr()}.csv`;
    a.click();
  };

  if (admin === undefined) return <div className="office"><p className="sub">Memeriksa sesi...</p></div>;

  if (!admin) {
    return (
      <div className="office">
        <form className="office-login" onSubmit={login}>
          <span className="logo">Ngulik<span>!</span> <small>Office</small></span>
          <p className="sub">Khusus admin.</p>
          <label className="field-label" htmlFor="o-email">Email</label>
          <input id="o-email" className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          <label className="field-label" htmlFor="o-pw">Kata sandi</label>
          <input id="o-pw" className="field" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" required autoFocus />
          {err && <p className="error">{err}</p>}
          <button className="btn green wide" style={{ marginTop: 14 }} disabled={busy || !firebaseReady}>{busy ? 'Masuk...' : 'Masuk'}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="office">
      <header className="office-head">
        <span className="logo">Ngulik<span>!</span> <small>Office</small></span>
        <div>
          <button className="btn small ghost" onClick={load}>Muat ulang</button>{' '}
          <button className="btn small ghost" onClick={() => signOut(auth)}>Keluar</button>
        </div>
      </header>

      {stats && (
        <div className="office-stats">
          <div><b>{stats.total}</b><span>Siswa terdaftar</span></div>
          <div><b>{stats.today}</b><span>Belajar hari ini</span></div>
          <div><b>{stats.xp}</b><span>Total XP</span></div>
          <div><b>{stats.lessons}</b><span>Pelajaran tuntas (dari {FLAT.length} × siswa)</span></div>
        </div>
      )}

      <div className="office-tools">
        <input className="field" placeholder="Cari nama atau email..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn small green" onClick={download} disabled={!shown.length}>Unduh CSV</button>
      </div>

      {err && <p className="error">{err}</p>}
      {!rows && !err && <p className="sub">Memuat data siswa...</p>}
      {rows && (
        <div className="office-table">
          <table>
            <thead><tr>{th('name', 'Nama')}<th>Email</th>{th('xp', 'XP')}{th('streak', 'Streak')}{th('lessons', `Pelajaran/${FLAT.length}`)}{th('badges', `Lencana/${BADGES.length}`)}{th('last', 'Terakhir')}</tr></thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td><td>{r.email}</td><td>{r.xp}</td><td>{r.streak}</td><td>{r.lessons}</td><td>{r.badges}</td><td>{r.last || '-'}</td>
                </tr>
              ))}
              {!shown.length && <tr><td colSpan={7} className="empty">Belum ada siswa.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
