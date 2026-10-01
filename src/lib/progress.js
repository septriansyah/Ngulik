import { BADGES } from '../data/badges.js';

export const emptyProgress = () => ({
  xp: 0, done: {}, streak: 0, longest: 0, last: null, days: [], badges: {}, perfectCount: 0,
});

export const dayStr = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};
const yesterday = () => dayStr(new Date(Date.now() - 864e5));

/** Streak yang masih hidup: dihitung putus kalau hari terakhir belajar sebelum kemarin. */
export const liveStreak = (p) => (p?.last && (p.last === dayStr() || p.last === yesterday()) ? p.streak || 0 : 0);
export const studiedToday = (p) => p?.last === dayStr();

/** Menerapkan hasil satu pelajaran ke progres. Fungsi murni, tidak menyimpan apa pun. */
export function applyLessonResult(p, { key, xp, perfect, best }) {
  const first = !p.done[key];
  const gain = xp + (first ? 10 : 0) + (perfect ? 5 : 0);
  const t = dayStr();
  const next = {
    ...p,
    xp: p.xp + gain,
    done: { ...p.done, [key]: true },
    badges: { ...p.badges },
    days: [...(p.days || [])],
    perfectCount: (p.perfectCount || 0) + (perfect ? 1 : 0),
  };
  let streakUp = false;
  if (p.last !== t) {
    next.streak = p.last === yesterday() ? (p.streak || 0) + 1 : 1;
    next.last = t;
    next.days = [...next.days, t].slice(-60);
    streakUp = true;
  }
  next.longest = Math.max(p.longest || 0, next.streak);
  const earned = [];
  for (const b of BADGES) {
    if (!next.badges[b.id] && b.test(next, { perfect, best })) {
      next.badges[b.id] = t;
      earned.push(b);
    }
  }
  return { next, gain, streakUp, earned, first };
}
