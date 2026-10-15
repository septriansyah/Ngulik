import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Google, Fire, Bolt, Medal, Check } from '../components/Icons.jsx';
import { SoundToggle } from '../components/Shell.jsx';
import { FLAT } from '../data/curriculum.js';
import { BADGES } from '../data/badges.js';

export default function Profile() {
  const { user, progress, streak, signOut, signInGoogle, resetProgress, firebaseReady, error } = useApp();
  const [confirm, setConfirm] = useState(false);
  const done = Object.keys(progress.done || {}).length;
  return (
    <div className="profile">
      <div className="pcard">
        {user.photo ? <img className="avatar big" src={user.photo} alt="" referrerPolicy="no-referrer" /> : <span className="avatar big">{user.name.slice(0, 1).toUpperCase()}</span>}
        <div>
          <h1 className="ptitle">{user.name}</h1>
          <p className="sub">{user.guest ? 'Mode tamu · progres tersimpan di browser ini' : `${user.email} · progres tersimpan di akun Google`}</p>
        </div>
      </div>

      <div className="pstats">
        <div><Fire /><b>{streak}</b><small>Streak sekarang</small></div>
        <div><Fire /><b>{progress.longest || 0}</b><small>Streak terpanjang</small></div>
        <div><Bolt /><b>{progress.xp}</b><small>Total XP</small></div>
        <div><Check /><b>{done}/{FLAT.length}</b><small>Pelajaran</small></div>
        <div><Medal style={{ color: 'var(--u6)' }} /><b>{Object.keys(progress.badges || {}).length}/{BADGES.length}</b><small>Lencana</small></div>
      </div>

      {user.guest && firebaseReady && (
        <div className="note">
          <b>Simpan progresmu ke akun.</b> Masuk dengan Google supaya streak dan XP aman dan bisa dibuka di perangkat lain. Progres tamu ikut dipindahkan.
          <button className="btn small google" style={{ marginTop: 10 }} onClick={signInGoogle}><Google /> Masuk dengan Google</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      <div className="settings">
        <div className="srow"><span>Efek suara</span><SoundToggle /></div>
        <Link className="srow linkish" to="/tentang">Tentang Ngulik!<span aria-hidden="true">→</span></Link>
        <button className="srow linkish" onClick={signOut}>Keluar</button>
        {!confirm
          ? <button className="srow linkish danger" onClick={() => setConfirm(true)}>Ulang progres dari awal</button>
          : (
            <div className="srow confirm">
              <span>XP, streak, dan lencana akan dihapus. Lanjutkan?</span>
              <div className="row">
                <button className="btn small ghost" onClick={() => setConfirm(false)}>Batal</button>
                <button className="btn small danger-btn" onClick={() => { resetProgress(); setConfirm(false); }}>Hapus progres</button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
