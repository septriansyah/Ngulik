import { UNITS, FLAT } from './curriculum.js';

const unitDone = (p, u) => u.lessons.every((_, li) => p.done[`${u.id}-${li}`]);
const doneCount = (p) => Object.keys(p.done || {}).length;

export const BADGES = [
  { id: 'first', name: 'Langkah Pertama', desc: 'Menyelesaikan pelajaran pertama', glyph: '1', color: '#22955F', deep: '#16683F', test: (p) => doneCount(p) >= 1 },
  ...UNITS.map((u, i) => ({
    id: `unit-${u.id}`, name: u.badge.name, desc: u.boss ? 'Menuntaskan semua Misi Akhir' : `Menuntaskan Unit ${i + 1}: ${u.title}`,
    glyph: u.badge.glyph, color: u.color, deep: u.deep, unit: u.id, test: (p) => unitDone(p, u),
  })),
  { id: 'perfect', name: 'Tanpa Cela', desc: 'Menyelesaikan satu pelajaran tanpa salah', glyph: '100', color: '#D2442F', deep: '#8E2A1C', test: (p, r) => r?.perfect },
  { id: 'combo5', name: 'Lima Beruntun', desc: 'Menjawab 5 soal benar berturut-turut', glyph: '5x', color: '#E2702A', deep: '#A9501A', test: (p, r) => r?.best >= 5 },
  { id: 'streak3', name: 'Api Tiga Hari', desc: 'Belajar 3 hari berturut-turut', glyph: '3', color: '#F27A1A', deep: '#A9501A', test: (p) => p.streak >= 3 },
  { id: 'streak7', name: 'Api Seminggu', desc: 'Belajar 7 hari berturut-turut', glyph: '7', color: '#F27A1A', deep: '#A9501A', test: (p) => p.streak >= 7 },
  { id: 'half', name: 'Setengah Jalan', desc: `Menyelesaikan ${Math.ceil(FLAT.length / 2)} pelajaran`, glyph: '½', color: '#12968A', deep: '#0B6B62', test: (p) => doneCount(p) >= Math.ceil(FLAT.length / 2) },
  { id: 'xp500', name: 'Pemburu XP', desc: 'Mengumpulkan 500 XP', glyph: 'XP', color: '#2C7FD0', deep: '#1C5A99', test: (p) => p.xp >= 500 },
  { id: 'xp1500', name: 'Raja XP', desc: 'Mengumpulkan 1.500 XP', glyph: 'XP+', color: '#8656D3', deep: '#5F3AA0', test: (p) => p.xp >= 1500 },
];
