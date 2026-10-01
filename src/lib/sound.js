// Efek suara disintesis langsung dengan Web Audio API, tanpa file audio.
let ctx = null;
let muted = false;
try { muted = localStorage.getItem('ngulik-mute') === '1'; } catch { /* abaikan */ }

function audio() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, { type = 'sine', vol = 0.16, slideTo } = {}) {
  if (muted) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

const C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, E6 = 1318.5, G6 = 1568;

export const sfx = {
  tap: () => tone(480, 0, 0.05, { type: 'triangle', vol: 0.07 }),
  select: () => tone(700, 0, 0.07, { type: 'triangle', vol: 0.09 }),
  page: () => { tone(600, 0, 0.06, { type: 'sine', vol: 0.07 }); tone(900, 0.05, 0.08, { type: 'sine', vol: 0.06 }); },
  place: () => tone(380, 0, 0.06, { type: 'square', vol: 0.04 }),
  correct: () => { tone(G5, 0, 0.12, { type: 'triangle' }); tone(C6, 0.09, 0.25, { type: 'triangle' }); },
  wrong: () => { tone(240, 0, 0.16, { type: 'sawtooth', vol: 0.06, slideTo: 170 }); tone(170, 0.14, 0.24, { type: 'sawtooth', vol: 0.05, slideTo: 110 }); },
  pair: () => { tone(E5, 0, 0.08, { type: 'triangle', vol: 0.1 }); tone(G5, 0.06, 0.12, { type: 'triangle', vol: 0.1 }); },
  combo: () => [C5, E5, G5, C6].forEach((f, i) => tone(f, i * 0.06, 0.14, { type: 'triangle', vol: 0.11 })),
  complete: () => {
    [C5, E5, G5, C6].forEach((f, i) => tone(f, i * 0.11, 0.2, { type: 'triangle', vol: 0.14 }));
    [C5, E5, G5].forEach((f) => tone(f * 2, 0.5, 0.7, { type: 'sine', vol: 0.08 }));
  },
  streak: () => { tone(220, 0, 0.45, { type: 'sine', vol: 0.09, slideTo: 880 }); [E5, G5, C6].forEach((f) => tone(f, 0.4, 0.6, { type: 'triangle', vol: 0.08 })); },
  badge: () => [E6, G6, C6 * 2, G6, C6 * 2].forEach((f, i) => tone(f, i * 0.08, 0.18, { type: 'sine', vol: 0.08 })),
  fail: () => [G5, E5, C5, 392].forEach((f, i) => tone(f, i * 0.16, 0.24, { type: 'triangle', vol: 0.1 })),
};

export const isMuted = () => muted;
export function setMuted(v) {
  muted = v;
  try { localStorage.setItem('ngulik-mute', v ? '1' : '0'); } catch { /* abaikan */ }
}
