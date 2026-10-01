import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Bito from '../components/Bito.jsx';
import BadgeIcon from '../components/BadgeIcon.jsx';
import { Check, Lock, Star, Cart, Book } from '../components/Icons.jsx';
import { UNITS, FLAT } from '../data/curriculum.js';
import { BADGES } from '../data/badges.js';
import { sfx } from '../lib/sound.js';
import { studiedToday } from '../lib/progress.js';

const OFFS = [0, 52, 80, 52, 0, -52, -80, -52];

export default function Learn() {
  const { user, progress, streak } = useApp();
  const nav = useNavigate();
  const [sheet, setSheet] = useState(null);
  const curRef = useRef(null);
  const isOpen = (i) => i === 0 || !!progress.done[FLAT[i - 1].key];
  const cur = FLAT.findIndex((f, i) => isOpen(i) && !progress.done[f.key]);

  useEffect(() => {
    if (cur > 0 && curRef.current) curRef.current.scrollIntoView({ block: 'center' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const first = user.name.split(' ')[0];
  const greet = cur === -1
    ? <>Luar biasa, {first}! Semua materi sudah tamat. Ulangi pelajaran mana saja untuk menambah XP.</>
    : cur === 0
      ? <>Halo, {first}! Aku <b>Bito</b>. Ketuk lingkaran yang bergoyang untuk mulai pelajaran pertamamu.</>
      : !studiedToday(progress) && streak > 0
        ? <>Streak {streak} harimu menunggu! Selesaikan satu pelajaran hari ini supaya apinya tidak padam.</>
        : <>Lanjut, {first}! Berikutnya: <b>{FLAT[cur].l.title}</b>.</>;

  let n = 0;
  return (
    <div className="learn">
      <div className="greet"><Bito mood={cur === -1 ? 'happy' : 'talk'} /><div className="bubble">{greet}</div></div>

      {UNITS.map((u, ui) => {
        const doneN = u.lessons.filter((_, li) => progress.done[`${u.id}-${li}`]).length;
        const badge = BADGES.find((b) => b.id === `unit-${u.id}`);
        return (
          <section className="unit" key={u.id} style={{ '--uc': u.color, '--ud': u.deep }}>
            <div className="uhead">
              <div>
                <small>{u.boss ? 'Misi gabungan' : `Unit ${ui + 1}`}</small>
                <h2>{u.title}</h2>
                <p>{u.desc}</p>
              </div>
              <Link to={`/panduan/${u.id}`} className="guide-btn" onClick={() => sfx.tap()}><Book /> Panduan</Link>
            </div>
            <div className="uprog"><span><i style={{ width: `${(doneN / u.lessons.length) * 100}%` }} /></span>{doneN}/{u.lessons.length}</div>
            <div className="path">
              {u.lessons.map((l, li) => {
                const fi = FLAT.findIndex((f) => f.ui === ui && f.li === li);
                const st = progress.done[FLAT[fi].key] ? 'done' : isOpen(fi) ? 'current' : 'locked';
                const x = OFFS[n++ % OFFS.length];
                return (
                  <button key={li} ref={fi === cur ? curRef : null} className={`node ${st}`} style={{ '--x': `${x}px` }}
                    aria-label={`${l.title}${st === 'locked' ? ' (terkunci)' : ''}`}
                    onClick={() => { if (st === 'locked') { sfx.wrong(); return; } sfx.select(); setSheet(fi); }}>
                    {fi === cur && <span className="start">MULAI</span>}
                    <span className="ring">{st === 'done' ? <Check /> : st === 'locked' ? <Lock /> : u.boss ? <Cart /> : <Star />}</span>
                    <span className="nlabel">{l.title}</span>
                  </button>
                );
              })}
              <Link to="/lencana" className={`node bnode ${progress.badges[badge.id] ? 'done' : 'locked'}`} style={{ '--x': `${OFFS[n++ % OFFS.length]}px` }}>
                <span className="bwrap"><BadgeIcon badge={badge} locked={!progress.badges[badge.id]} /></span>
                <span className="nlabel">Lencana: {badge.name}</span>
              </Link>
            </div>
          </section>
        );
      })}

      {sheet !== null && (() => {
        const { u, ui, l, li, key } = FLAT[sheet];
        const done = !!progress.done[key];
        return (
          <div className="scrim" onClick={(e) => e.target === e.currentTarget && setSheet(null)}>
            <div className="sheet" role="dialog" aria-label={l.title} style={{ '--uc': u.color, '--ud': u.deep }}>
              <span className="eyebrow" style={{ color: u.color }}>{u.boss ? 'Misi Akhir' : `Unit ${ui + 1} · Pelajaran ${li + 1} dari ${u.lessons.length}`}</span>
              <h2>{l.title}</h2>
              <p>{done ? 'Sudah selesai. Ulangi untuk memperkuat ingatan dan menambah XP.' : `Bito menjelaskan ${l.materi.length} hal, lalu kamu menjawab ${l.soal.length} soal dengan 5 nyawa.`}</p>
              <button className="btn unit-btn wide" onClick={() => { sfx.page(); nav(`/pelajaran/${key}`); }}>
                {done ? 'Ulangi' : 'Mulai'} · +{l.soal.length * 10 + (done ? 0 : 10)} XP
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
