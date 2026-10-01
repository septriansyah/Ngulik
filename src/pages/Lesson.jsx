import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext.jsx';
import { FLAT } from '../data/curriculum.js';
import Bito from '../components/Bito.jsx';
import BadgeIcon from '../components/BadgeIcon.jsx';
import { MateriCard } from './Guide.jsx';
import { QUESTION } from '../components/Questions.jsx';
import { Close, Heart, Book, FlameBig, Bolt, Target, Clock } from '../components/Icons.jsx';
import { sfx } from '../lib/sound.js';
import { dayStr } from '../lib/progress.js';

const PRAISE = ['Mantap!', 'Tepat sekali!', 'Keren!', 'Betul!', 'Jago banget!', 'Luar biasa!'];
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const burst = (colors) => confetti({ particleCount: 110, spread: 75, origin: { y: 0.35 }, colors, disableForReducedMotion: true });

export default function Lesson({ lessonKey, onRetry }) {
  const fi = FLAT.findIndex((f) => f.key === lessonKey);
  const { progress, completeLesson } = useApp();
  const nav = useNavigate();
  const [phase, setPhase] = useState('learn'); // learn | quiz | fail | cele
  const [k, setK] = useState(0);
  const [queue, setQueue] = useState(() => (fi >= 0 ? FLAT[fi].l.soal.map((_, i) => i) : []));
  const [solved, setSolved] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [wrong, setWrong] = useState(() => new Set());
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [xp, setXp] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [ans, setAns] = useState(null);
  const [fb, setFb] = useState(null);
  const [quit, setQuit] = useState(false);
  const [steps, setSteps] = useState([]);
  const [si, setSi] = useState(0);
  const [shake, setShake] = useState(0);
  const t0 = useRef(Date.now());

  const unlocked = fi === 0 || (fi > 0 && progress.done[FLAT[fi - 1].key]);
  const F0 = fi >= 0 ? FLAT[fi] : null;

  // Pintasan keyboard: Enter untuk Lanjut / Periksa.
  useEffect(() => {
    const h = (e) => {
      if (e.key !== 'Enter' || e.target.tagName === 'BUTTON' || quit) return;
      e.preventDefault();
      if (phase === 'learn') nextCard();
      else if (phase === 'quiz') { if (fb) cont(); else if (ans?.ready) check(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  if (!F0 || !unlocked) return <Navigate to="/belajar" replace />;
  const { u, l } = F0;
  const total = l.materi.length + l.soal.length;

  function nextCard() {
    if (k < l.materi.length - 1) { sfx.page(); setK(k + 1); window.scrollTo(0, 0); }
    else { sfx.page(); setPhase('quiz'); t0.current = Date.now(); window.scrollTo(0, 0); }
  }

  function check() {
    if (!ans?.ready || fb) return;
    const qi = queue[0];
    const q = l.soal[qi];
    if (ans.correct) {
      const slipped = q.t === 'match' && ans.mistakes > 0;
      const firstTry = !wrong.has(qi) && !slipped;
      if (slipped) setWrong(new Set(wrong).add(qi));
      const c = combo + 1;
      setSolved(solved + 1);
      setCombo(c);
      setBest(Math.max(best, c));
      if (firstTry) setXp(xp + 10);
      if (c >= 3) sfx.combo(); else sfx.correct();
      setFb({ ok: true, title: c >= 3 ? `${c} benar beruntun!` : pick(PRAISE), why: q.why });
    } else {
      sfx.wrong();
      setHearts(hearts - 1);
      setShake((s) => s + 1);
      setCombo(0);
      setWrong(new Set(wrong).add(qi));
      setFb({ ok: false, title: 'Belum tepat', answer: ans.answer, why: q.why });
    }
  }

  function cont() {
    const qi = queue[0];
    const nq = fb.ok ? queue.slice(1) : [...queue.slice(1), qi];
    if (hearts <= 0) { sfx.fail(); setPhase('fail'); return; }
    if (nq.length === 0) { finish(); return; }
    setQueue(nq);
    setAns(null);
    setFb(null);
    setAttempt(attempt + 1);
    window.scrollTo(0, 0);
  }

  function finish() {
    const perfect = wrong.size === 0;
    const res = completeLesson({ key: F0.key, xp, perfect, best });
    const secs = Math.round((Date.now() - t0.current) / 1000);
    const acc = Math.round(((l.soal.length - wrong.size) / l.soal.length) * 100);
    const s = [{ type: 'done', gain: res.gain, acc, secs, perfect }];
    if (res.streakUp) s.push({ type: 'streak', p: res.next });
    res.earned.forEach((b) => s.push({ type: 'badge', b }));
    const nextIdx = FLAT.findIndex((f, i) => (i === 0 || res.next.done[FLAT[i - 1].key]) && !res.next.done[f.key]);
    s.push({ type: 'next', nextIdx });
    setSteps(s);
    setSi(0);
    setPhase('cele');
  }

  /* ---------- Tampilan ---------- */
  if (phase === 'cele') {
    return <Celebration step={steps[si]} unit={u} lesson={l} from={F0}
      onNext={() => setSi(si + 1)} onMap={() => nav('/belajar')} onGo={(key) => nav(`/pelajaran/${key}`)} />;
  }

  if (phase === 'fail') {
    return (
      <section className="cele">
        <Bito mood="sad" />
        <h2>Nyawamu habis</h2>
        <p>Tidak apa-apa, programmer juga sering salah. Baca lagi penjelasan Bito, lalu coba sekali lagi.</p>
        <button className="btn green" onClick={() => { sfx.page(); onRetry(); }}>Coba lagi</button>
        <button className="btn ghost" onClick={() => nav('/belajar')}>Kembali ke peta</button>
      </section>
    );
  }

  const pct = phase === 'learn' ? ((k + 1) / total) * 100 : ((l.materi.length + solved) / total) * 100;
  const qi = queue[0];
  const q = l.soal[qi];
  const Q = phase === 'quiz' ? QUESTION[q.t] : null;

  return (
    <section className="lesson" style={{ '--uc': u.color, '--ud': u.deep }}>
      <div className="lbar">
        <button className="x" onClick={() => { sfx.tap(); setQuit(true); }} aria-label="Keluar pelajaran"><Close /></button>
        <div className="prog"><i style={{ width: `${pct}%` }} /></div>
        {phase === 'learn'
          ? <span className="chip"><Book />{k + 1}/{l.materi.length}</span>
          : <span key={shake} className={`hearts ${shake ? 'hit' : ''}`}><Heart />{hearts}</span>}
      </div>

      {phase === 'learn' ? (
        <>
          <div className="body" key={`m${k}`}>
            <span className="tag">Penjelasan Bito · {l.title}</span>
            <MateriCard m={l.materi[k]} />
          </div>
          <div className="foot">
            <div className="navrow">
              {k > 0 && <button className="btn ghost" onClick={() => { sfx.tap(); setK(k - 1); }}>Sebelumnya</button>}
              <button className="btn unit-btn" onClick={nextCard}>{k < l.materi.length - 1 ? 'Lanjut' : 'Siap, ayo latihan!'}</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="body" key={`q${attempt}`}>
            {combo >= 3 && !fb && <span className="combo">{combo} benar beruntun!</span>}
            {wrong.has(qi) && !fb && <span className="retry">Soal ulangan · kamu pasti bisa</span>}
            <span className="tag">{q.tag}</span>
            <h1 className="q">{q.q}</h1>
            <Q q={q} locked={!!fb} onAnswer={setAns} />
          </div>
          <div className={`foot ${fb ? (fb.ok ? 'ok' : 'bad') : ''}`}>
            {fb ? (
              <>
                <div className="fb">
                  <Bito mood={fb.ok ? 'happy' : 'sad'} />
                  <div>
                    <h3>{fb.title}</h3>
                    {!fb.ok && <><p><b>Jawaban yang benar:</b></p><pre>{fb.answer}</pre></>}
                    <p>{fb.why}</p>
                    {!fb.ok && hearts > 0 && <p className="soft">Soal ini akan muncul lagi nanti.</p>}
                  </div>
                </div>
                <button className="btn wide" onClick={cont} autoFocus>Lanjut</button>
              </>
            ) : (
              <button className="btn wide unit-btn" disabled={!ans?.ready} onClick={check}>Periksa</button>
            )}
          </div>
        </>
      )}

      {quit && (
        <div className="scrim" onClick={(e) => e.target === e.currentTarget && setQuit(false)}>
          <div className="sheet">
            <div className="talk"><Bito mood="sad" /><div className="bubble">Yakin mau berhenti? Progres pelajaran ini akan hilang.</div></div>
            <div className="row">
              <button className="btn green" onClick={() => setQuit(false)}>Lanjut belajar</button>
              <button className="btn ghost" onClick={() => nav('/belajar')}>Keluar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Rangkaian layar apresiasi ---------- */
function Celebration({ step, unit, lesson, from, onNext, onMap, onGo }) {
  useEffect(() => {
    if (!step) return;
    if (step.type === 'done') { sfx.complete(); burst([unit.color, '#F2B705', '#45BE85', '#2C7FD0']); }
    if (step.type === 'streak') sfx.streak();
    if (step.type === 'badge') { sfx.badge(); burst([step.b.color, '#F2B705', '#ffffff']); }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!step) return null;

  if (step.type === 'done') {
    const mm = Math.floor(step.secs / 60);
    const ss = String(step.secs % 60).padStart(2, '0');
    return (
      <section className="cele">
        <Bito mood="happy" className="hop" />
        <h2 className="gold">{step.perfect ? 'Sempurna!' : 'Pelajaran selesai!'}</h2>
        <p>{step.perfect ? 'Tidak ada satu jawaban pun yang salah. Bito bangga sekali!' : `Kerja bagus! Kamu menuntaskan "${lesson.title}".`}</p>
        <div className="tiles">
          <div className="tile" style={{ '--tc': '#D9A206' }}><small><Bolt />Total XP</small><b>+{step.gain}</b></div>
          <div className="tile" style={{ '--tc': '#1F9D55' }}><small><Target />Akurasi</small><b>{step.acc}%</b></div>
          <div className="tile" style={{ '--tc': '#2C7FD0' }}><small><Clock />Waktu</small><b>{mm}:{ss}</b></div>
        </div>
        <button className="btn green" onClick={onNext} autoFocus>Lanjut</button>
      </section>
    );
  }

  if (step.type === 'streak') {
    const p = step.p;
    const set = new Set(p.days || []);
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const names = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    return (
      <section className="cele">
        <FlameBig className="bigflame" />
        <div className="streaknum">{p.streak}</div>
        <h2>hari beruntun!</h2>
        <p>{p.streak === 1 ? 'Streak pertamamu menyala. Belajar lagi besok supaya apinya tetap hidup.' : 'Apimu makin besar. Jangan sampai putus, ya!'}</p>
        <div className="week">
          {names.map((d, i) => {
            const dt = new Date(monday);
            dt.setDate(monday.getDate() + i);
            const on = set.has(dayStr(dt));
            return <span key={d} className={`day ${on ? 'on' : ''} ${dayStr(dt) === dayStr() ? 'today' : ''}`}><i />{d}</span>;
          })}
        </div>
        <button className="btn green" onClick={onNext} autoFocus>Lanjut</button>
      </section>
    );
  }

  if (step.type === 'badge') {
    return (
      <section className="cele">
        <span className="eyebrow">Lencana baru!</span>
        <div className="rays"><BadgeIcon badge={step.b} className="bigbadge" /></div>
        <h2>{step.b.name}</h2>
        <p>{step.b.desc}.</p>
        <button className="btn green" onClick={onNext} autoFocus>Ambil lencana</button>
      </section>
    );
  }

  // type === 'next'
  if (step.nextIdx === -1) {
    return (
      <section className="cele">
        <Bito mood="happy" className="hop" />
        <h2 className="gold">Kamu tamat!</h2>
        <p>Algoritma, variabel, operator, input-output, percabangan, dan perulangan sudah kamu kuasai. Sekarang kamu siap membuat program sendiri.</p>
        <button className="btn green" onClick={onMap} autoFocus>Lihat peta</button>
      </section>
    );
  }
  const N = FLAT[step.nextIdx];
  const newUnit = N.ui !== from.ui;
  return (
    <section className="cele" style={{ '--uc': N.u.color, '--ud': N.u.deep }}>
      <Bito mood="wave" className="hop" />
      <h2>{newUnit ? 'Unit baru terbuka!' : 'Siap lanjut?'}</h2>
      <p>{newUnit ? <>Selamat datang di <b>{N.u.title}</b>: {N.u.desc.toLowerCase()}. </> : 'Pelajaran berikutnya sudah menunggu. '}Berikutnya: <b>{N.l.title}</b>.</p>
      <button className="btn unit-btn" onClick={() => { sfx.page(); onGo(N.key); }} autoFocus>Lanjut ke {N.l.title}</button>
      <button className="btn ghost" onClick={onMap}>Kembali ke peta</button>
    </section>
  );
}
