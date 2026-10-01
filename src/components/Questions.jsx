import { useEffect, useMemo, useState } from 'react';
import CodeBlock from './CodeBlock.jsx';
import { highlight } from '../lib/highlight.js';
import { sfx } from '../lib/sound.js';

export function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
const shuffledNotSorted = (n) => {
  const idx = [...Array(n).keys()];
  let o;
  do { o = shuffle(idx); } while (n > 1 && o.every((v, i) => v === i));
  return o;
};

/* Pilihan ganda & tebak keluaran */
export function MCQ({ q, locked, onAnswer }) {
  const [pick, setPick] = useState(null);
  const choose = (k) => { sfx.select(); setPick(k); onAnswer({ ready: true, correct: k === q.a, answer: q.opts[q.a] }); };
  useEffect(() => {
    if (locked) return undefined;
    const h = (e) => { const n = Number(e.key); if (n >= 1 && n <= q.opts.length) choose(n - 1); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
  return (
    <>
      {q.code && <CodeBlock code={q.code} />}
      <div className="opts">
        {q.opts.map((o, k) => {
          const cls = ['opt', q.mono && 'mono', pick === k && 'sel', locked && k === q.a && 'right', locked && pick === k && k !== q.a && 'miss'].filter(Boolean).join(' ');
          return (
            <button key={k} className={cls} disabled={locked}
              onClick={() => choose(k)}>
              <span className="okey">{k + 1}</span><span className="otext">{o}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* Isi bagian kosong */
export function FillQ({ q, locked, onAnswer }) {
  const opts = useMemo(() => shuffle(q.opts), [q]);
  const [v, setV] = useState(null);
  const [a, b = ''] = q.code.split('___');
  return (
    <>
      <pre className="code">
        <span dangerouslySetInnerHTML={{ __html: highlight(a) }} />
        <span className={`slot ${v ? 'filled' : ''}`}>{v ?? ' ? '}</span>
        <span dangerouslySetInnerHTML={{ __html: highlight(b) }} />
      </pre>
      <div className="chips">
        {opts.map((o) => (
          <button key={o} className={`opt chip-opt ${v === o ? 'sel' : ''} ${locked && o === q.a ? 'right' : ''}`} disabled={locked}
            onClick={() => { sfx.place(); setV(o); onAnswer({ ready: true, correct: o === q.a, answer: q.code.replace('___', q.a) }); }}>
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

/* Susun blok kode (Parsons problem) */
export function OrderQ({ q, locked, onAnswer }) {
  const order = useMemo(() => shuffledNotSorted(q.lines.length), [q]);
  const [built, setBuilt] = useState([]);
  const report = (next) => onAnswer({ ready: next.length === q.lines.length, correct: next.every((k, i) => k === i), answer: q.lines.join('\n') });
  const add = (k) => { if (locked || built.includes(k)) return; sfx.place(); const n = [...built, k]; setBuilt(n); report(n); };
  const remove = (pos) => { if (locked) return; sfx.tap(); const n = built.filter((_, i) => i !== pos); setBuilt(n); report(n); };
  return (
    <>
      <div className={`zone ${built.length ? '' : 'empty'}`}>
        {built.map((k, pos) => <button key={k} className="blk" onClick={() => remove(pos)} disabled={locked}>{q.lines[k]}</button>)}
      </div>
      <div className="bank">
        {order.map((k) => <button key={k} className={`blk ${built.includes(k) ? 'used' : ''}`} onClick={() => add(k)} disabled={locked} tabIndex={built.includes(k) ? -1 : 0}>{q.lines[k]}</button>)}
      </div>
    </>
  );
}

/* Ketik jawaban */
const norm = (s) => s.trim().replace(/^["']|["']$/g, '').replace(/\s+/g, ' ').toLowerCase();
export function TypeQ({ q, locked, onAnswer }) {
  const [v, setV] = useState('');
  return (
    <>
      {q.code && <CodeBlock code={q.code} />}
      <label className="field-label" htmlFor="type-answer">Jawabanmu</label>
      <input id="type-answer" className="field mono" value={v} disabled={locked} autoFocus autoComplete="off" autoCapitalize="off" spellCheck="false"
        placeholder="Ketik di sini, lalu tekan Periksa"
        onChange={(e) => { setV(e.target.value); onAnswer({ ready: e.target.value.trim() !== '', correct: q.a.some((x) => norm(x) === norm(e.target.value)), answer: q.a[0] }); }} />
    </>
  );
}

/* Pasangkan */
export function MatchQ({ q, locked, onAnswer }) {
  const left = useMemo(() => shuffle([...q.pairs.keys()]), [q]);
  const right = useMemo(() => shuffle([...q.pairs.keys()]), [q]);
  const [selL, setSelL] = useState(null);
  const [selR, setSelR] = useState(null);
  const [matched, setMatched] = useState([]);
  const [bad, setBad] = useState(null);
  const [miss, setMiss] = useState(0);

  const tryPair = (l, r) => {
    if (l === r) {
      sfx.pair();
      const m = [...matched, l];
      setMatched(m);
      setSelL(null); setSelR(null);
      if (m.length === q.pairs.length) onAnswer({ ready: true, correct: true, mistakes: miss, answer: q.pairs.map((p) => `${p[0]} → ${p[1]}`).join('\n') });
    } else {
      sfx.wrong();
      setBad([l, r]);
      setMiss((x) => x + 1);
      setTimeout(() => { setBad(null); setSelL(null); setSelR(null); }, 500);
    }
  };
  const clickL = (i) => { if (locked || bad || matched.includes(i)) return; sfx.select(); setSelL(i); if (selR !== null) tryPair(i, selR); };
  const clickR = (i) => { if (locked || bad || matched.includes(i)) return; sfx.select(); setSelR(i); if (selL !== null) tryPair(selL, i); };
  const cls = (i, side, sel) => ['mcell', side === 'l' && 'mono', matched.includes(i) && 'matched', sel === i && 'sel', bad && bad[side === 'l' ? 0 : 1] === i && 'bad'].filter(Boolean).join(' ');

  return (
    <div className="match">
      <div className="mcol">{left.map((i) => <button key={i} className={cls(i, 'l', selL)} onClick={() => clickL(i)} disabled={locked || matched.includes(i)}>{q.pairs[i][0]}</button>)}</div>
      <div className="mcol">{right.map((i) => <button key={i} className={cls(i, 'r', selR)} onClick={() => clickR(i)} disabled={locked || matched.includes(i)}>{q.pairs[i][1]}</button>)}</div>
    </div>
  );
}

export const QUESTION = { mc: MCQ, fill: FillQ, order: OrderQ, type: TypeQ, match: MatchQ };
