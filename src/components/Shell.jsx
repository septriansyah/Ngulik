import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Fire, Bolt, Medal, Home, Trophy, User, SoundOn, SoundOff } from './Icons.jsx';
import { isMuted, setMuted, sfx } from '../lib/sound.js';
import { BADGES } from '../data/badges.js';
import { studiedToday } from '../lib/progress.js';

export function SoundToggle() {
  const [m, setM] = useState(isMuted());
  return (
    <button className="icon-btn" onClick={() => { setMuted(!m); setM(!m); if (m) sfx.select(); }} aria-label={m ? 'Nyalakan suara' : 'Matikan suara'} title={m ? 'Nyalakan suara' : 'Matikan suara'}>
      {m ? <SoundOff /> : <SoundOn />}
    </button>
  );
}

export default function Shell({ children }) {
  const { progress, streak } = useApp();
  const badgeCount = Object.keys(progress.badges || {}).length;
  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/belajar" className="logo">Ngulik<span>!</span></Link>
        <div className="stats">
          <span className={`chip ${studiedToday(progress) ? '' : 'dim'}`} title="Streak harian"><Fire />{streak}</span>
          <span className="chip" title="Total XP"><Bolt />{progress.xp}</span>
          <Link className="chip" to="/lencana" title="Lencana"><Medal style={{ color: 'var(--u6)' }} />{badgeCount}/{BADGES.length}</Link>
          <SoundToggle />
        </div>
      </header>
      <main className="shell-main">{children}</main>
      <nav className="bottomnav" aria-label="Navigasi utama">
        <NavLink to="/belajar"><Home /><span>Belajar</span></NavLink>
        <NavLink to="/peringkat"><Trophy /><span>Peringkat</span></NavLink>
        <NavLink to="/lencana"><Medal /><span>Lencana</span></NavLink>
        <NavLink to="/profil"><User /><span>Profil</span></NavLink>
      </nav>
    </div>
  );
}
