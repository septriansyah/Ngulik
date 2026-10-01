import { useState } from 'react';
import { TUTORIAL } from '../data/tutorial.js';

// Screenshot diambil dari public/tutorial/. Selama file belum ada, tampil kotak penanda.
function Shot({ step }) {
  const [missing, setMissing] = useState(false);
  const src = `${import.meta.env.BASE_URL}tutorial/${step.img}`;
  return (
    <figure className="tut-shot">
      {missing
        ? <div className="tut-ph" role="img" aria-label={step.caption}>Screenshot: {step.img}</div>
        : <img src={src} alt={step.caption} loading="lazy" onError={() => setMissing(true)} />}
      <figcaption>{step.caption}</figcaption>
    </figure>
  );
}

export default function Tutorial() {
  return (
    <ol className="tut">
      {TUTORIAL.map((s) => (
        <li key={s.id}>
          <div className="tut-copy">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
          <Shot step={s} />
        </li>
      ))}
    </ol>
  );
}
