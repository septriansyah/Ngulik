import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import BadgeIcon from '../components/BadgeIcon.jsx';
import Bito from '../components/Bito.jsx';
import { BADGES } from '../data/badges.js';
import { sfx } from '../lib/sound.js';

const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Badges() {
  const { progress } = useApp();
  const [open, setOpen] = useState(null);
  const got = Object.keys(progress.badges || {}).length;
  return (
    <div className="badges">
      <div className="board-head">
        <Bito mood="happy" />
        <div>
          <h1 className="ptitle">Lencana</h1>
          <p className="sub">Kamu sudah mengumpulkan <b>{got} dari {BADGES.length}</b> lencana.</p>
        </div>
      </div>
      <div className="bgrid">
        {BADGES.map((b) => {
          const when = progress.badges?.[b.id];
          return (
            <button key={b.id} className={`bcard ${when ? '' : 'locked'}`} onClick={() => { sfx.select(); setOpen(b); }}>
              <BadgeIcon badge={b} locked={!when} />
              <b>{b.name}</b>
              <small>{when ? `Didapat ${fmt(when)}` : b.desc}</small>
            </button>
          );
        })}
      </div>
      {open && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="sheet badge-sheet">
            <BadgeIcon badge={open} locked={!progress.badges?.[open.id]} className="sheet-badge" />
            <span className="eyebrow">{progress.badges?.[open.id] ? `Didapat ${fmt(progress.badges[open.id])}` : 'Belum didapat'}</span>
            <h2>{open.name}</h2>
            <p>{open.desc}.</p>
            <button className="btn ghost wide" onClick={() => setOpen(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
