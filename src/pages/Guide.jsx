import { Link, Navigate, useParams } from 'react-router-dom';
import { UNITS } from '../data/curriculum.js';
import Bito from '../components/Bito.jsx';
import CodeBlock, { Output } from '../components/CodeBlock.jsx';
import { Close, Check } from '../components/Icons.jsx';

export function MateriCard({ m }) {
  return (
    <>
      <div className="talk"><Bito mood="talk" /><div className="bubble" dangerouslySetInnerHTML={{ __html: m.say }} /></div>
      {m.steps && <ol className="steps">{m.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>}
      {m.code && <CodeBlock code={m.code} />}
      {m.out && <Output text={m.out} />}
      {m.note && <div className="note" dangerouslySetInnerHTML={{ __html: m.note }} />}
    </>
  );
}

export default function Guide() {
  const { unitId } = useParams();
  const ui = UNITS.findIndex((u) => u.id === unitId);
  if (ui < 0) return <Navigate to="/belajar" replace />;
  const u = UNITS[ui];
  return (
    <div className="guide" style={{ '--uc': u.color, '--ud': u.deep }}>
      <div className="lbar"><Link to="/belajar" className="x" aria-label="Kembali ke peta"><Close /></Link><span className="eyebrow" style={{ color: u.color }}>Panduan {u.boss ? 'Misi Akhir' : `Unit ${ui + 1}`}</span></div>
      <h1 className="ptitle">{u.title}</h1>
      <p className="sub">{u.desc}. Baca panduan ini kapan saja untuk mengulang materi tanpa mengerjakan soal.</p>
      <div className="goals">
        <h2>Setelah unit ini, kamu bisa:</h2>
        <ul>{u.goals.map((g) => <li key={g}><Check />{g}</li>)}</ul>
      </div>
      {u.lessons.map((l, li) => (
        <section key={li} className="gsec">
          <h2><span>{li + 1}</span>{l.title}</h2>
          <div className="gcards">{l.materi.map((m, k) => <div className="gcard" key={k}><MateriCard m={m} /></div>)}</div>
        </section>
      ))}
    </div>
  );
}
