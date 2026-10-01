import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Bito from '../components/Bito.jsx';
import { Bolt, Fire, Google } from '../components/Icons.jsx';
import { liveStreak } from '../lib/progress.js';
import { sfx } from '../lib/sound.js';

// Data contoh untuk mode tamu, ditandai jelas sebagai contoh.
const SAMPLE = [
  { id: 's1', name: 'Rani', xp: 1240, streak: 14, last: '' },
  { id: 's2', name: 'Fajar', xp: 980, streak: 9, last: '' },
  { id: 's3', name: 'Nadia', xp: 870, streak: 21, last: '' },
  { id: 's4', name: 'Bagas', xp: 610, streak: 4, last: '' },
  { id: 's5', name: 'Citra', xp: 455, streak: 6, last: '' },
  { id: 's6', name: 'Yusuf', xp: 300, streak: 2, last: '' },
].map((r) => ({ ...r, sample: true }));

function Avatar({ name, photo }) {
  if (photo) return <img className="avatar" src={photo} alt="" referrerPolicy="no-referrer" />;
  return <span className="avatar">{(name || '?').slice(0, 1).toUpperCase()}</span>;
}

export default function Leaderboard() {
  const { user, progress, fetchLeaderboard, firebaseReady, signInGoogle } = useApp();
  const [tab, setTab] = useState('xp');
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState('');
  const online = firebaseReady && !user.guest;

  useEffect(() => {
    let alive = true;
    setRows(null);
    setErr('');
    if (online) {
      fetchLeaderboard(tab)
        .then((r) => { if (alive) setRows(r.map((x) => ({ ...x, streak: liveStreak(x) }))); })
        .catch(() => { if (alive) setErr('Papan peringkat belum bisa dimuat. Periksa koneksi internet.'); });
    } else {
      const me = { id: 'me', name: user.name, xp: progress.xp, streak: liveStreak(progress) };
      setRows([...SAMPLE, me]);
    }
    return () => { alive = false; };
  }, [tab, online]); // eslint-disable-line react-hooks/exhaustive-deps

  const meId = online ? user.uid : 'me';
  const sorted = rows ? [...rows].sort((a, b) => (b[tab] || 0) - (a[tab] || 0)) : [];
  const myRank = sorted.findIndex((r) => r.id === meId) + 1;

  return (
    <div className="board">
      <div className="board-head">
        <Bito mood="happy" />
        <div>
          <h1 className="ptitle">Papan Peringkat</h1>
          <p className="sub">{myRank ? `Kamu di peringkat ${myRank}. ${myRank === 1 ? 'Pertahankan!' : 'Ayo kejar yang di atasmu!'}` : 'Selesaikan pelajaran untuk masuk papan peringkat.'}</p>
        </div>
      </div>

      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'xp'} className={tab === 'xp' ? 'on' : ''} onClick={() => { sfx.tap(); setTab('xp'); }}><Bolt />Total XP</button>
        <button role="tab" aria-selected={tab === 'streak'} className={tab === 'streak' ? 'on' : ''} onClick={() => { sfx.tap(); setTab('streak'); }}><Fire />Streak</button>
      </div>

      {!online && (
        <div className="note">
          <b>Mode tamu:</b> nama selain kamu di bawah ini hanya contoh.{' '}
          {firebaseReady ? 'Masuk dengan Google untuk bersaing dengan teman sungguhan.' : 'Hubungkan Firebase supaya papan peringkat berisi teman sekelas sungguhan.'}
          {firebaseReady && <button className="btn small google" style={{ marginTop: 10 }} onClick={signInGoogle}><Google /> Masuk dengan Google</button>}
        </div>
      )}
      {err && <p className="error">{err}</p>}
      {!rows && !err && <p className="sub">Memuat peringkat...</p>}

      <ol className="rank">
        {sorted.map((r, i) => (
          <li key={r.id} className={`${r.id === meId ? 'me' : ''} ${i < 3 ? `top top${i + 1}` : ''}`}>
            <span className="rpos">{i + 1}</span>
            <Avatar name={r.name} photo={r.photo} />
            <span className="rname">{r.name}{r.id === meId && <em> (kamu)</em>}{r.sample && <small className="sample">contoh</small>}</span>
            <span className="rval">{tab === 'xp' ? <><Bolt />{r.xp} XP</> : <><Fire />{r.streak} hari</>}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
