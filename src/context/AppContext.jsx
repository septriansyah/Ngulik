import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth, db, firebaseReady, googleProvider } from '../firebase.js';
import { emptyProgress, applyLessonResult, liveStreak } from '../lib/progress.js';

const GUEST_KEY = 'ngulik-guest';
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const readGuest = () => {
  try { return JSON.parse(localStorage.getItem(GUEST_KEY)) || null; } catch { return null; }
};
// Progres tamu disimpan di localStorage; status "sedang masuk" hanya berlaku di tab ini,
// jadi membuka ulang browser tidak langsung masuk ke halaman belajar.
const writeGuest = (g) => {
  try {
    if (g) localStorage.setItem(GUEST_KEY, JSON.stringify({ progress: g.progress }));
    else localStorage.removeItem(GUEST_KEY);
    if (g?.user) sessionStorage.setItem(GUEST_KEY, '1'); else sessionStorage.removeItem(GUEST_KEY);
  } catch { /* abaikan */ }
};
const guestActive = () => { try { return sessionStorage.getItem(GUEST_KEY) === '1'; } catch { return false; } };
const guestUser = (name) => ({ uid: 'guest', name: (name || '').trim() || 'Pengulik', photo: '', email: '', guest: true });

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);          // { uid, name, photo, email, guest }
  const [progress, setProgress] = useState(emptyProgress());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Pulihkan sesi tamu, lalu dengarkan status login Google.
  useEffect(() => {
    const g = readGuest();
    if (g && guestActive()) {
      try { setUser(guestUser(sessionStorage.getItem(GUEST_KEY + '-name'))); } catch { setUser(guestUser()); }
      setProgress({ ...emptyProgress(), ...g.progress });
    }
    if (!firebaseReady) { setLoading(false); return undefined; }
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        if (!guestActive()) { setUser(null); setProgress(emptyProgress()); }
        setLoading(false);
        return;
      }
      // Akun admin dikelola halaman /office, bukan bagian dari pelajar.
      if (fbUser.email === 'admin@ngulik.app') { setUser(null); setLoading(false); return; }
      try {
        const u = { uid: fbUser.uid, name: fbUser.displayName || 'Pengulik', photo: fbUser.photoURL || '', email: fbUser.email || '', guest: false };
        const ref = doc(db, 'users', fbUser.uid);
        const snap = await getDoc(ref);
        let p;
        if (snap.exists()) {
          p = { ...emptyProgress(), ...snap.data().progress };
        } else {
          // Akun baru: bawa progres mode tamu kalau ada.
          p = { ...emptyProgress(), ...(readGuest()?.progress || {}) };
          await setDoc(ref, { name: u.name, email: u.email, photo: u.photo, progress: p, createdAt: serverTimestamp() });
        }
        writeGuest(null);
        setUser(u);
        setProgress(p);
        syncLeaderboard(u, p).catch(() => {});
      } catch (e) {
        console.error('Gagal memuat akun', e);
        setError('Gagal memuat progres dari akun. Periksa koneksi internet dan aturan Firestore, lalu coba masuk lagi.');
        setUser(null);
        fbSignOut(auth).catch(() => {});
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const persist = useCallback(async (u, p) => {
    if (!u) return;
    if (u.guest) { writeGuest({ user: u, progress: p }); return; }
    try {
      await setDoc(doc(db, 'users', u.uid), { progress: p, updatedAt: serverTimestamp() }, { merge: true });
      syncLeaderboard(u, p).catch(() => {});
    } catch {
      setError('Progres belum tersimpan ke akun. Periksa koneksi internet.');
    }
  }, []);

  const signInGoogle = useCallback(async () => {
    setError('');
    if (!firebaseReady) { setError('Login Google belum diaktifkan. Isi konfigurasi Firebase di file .env.'); return; }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(auth, googleProvider);
      } else if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
        console.error('Login Google gagal', e);
        setError(e?.code === 'auth/unauthorized-domain'
          ? 'Domain ini belum diizinkan di Firebase (Authentication > Settings > Authorized domains).'
          : 'Login Google gagal. Coba lagi beberapa saat lagi.');
      }
    }
  }, []);

  const signInGuest = useCallback((name) => {
    const u = guestUser(name);
    try { sessionStorage.setItem(GUEST_KEY + '-name', u.name); } catch { /* abaikan */ }
    const p = readGuest()?.progress || emptyProgress();
    setUser(u);
    setProgress({ ...emptyProgress(), ...p });
    writeGuest({ user: u, progress: p });
  }, []);

  const signOut = useCallback(async () => {
    if (user?.guest) { setUser(null); writeGuest({ progress: progressRef.current }); sessionStorage.removeItem(GUEST_KEY); return; }
    if (auth) await fbSignOut(auth);
    setUser(null);
    setProgress(emptyProgress());
  }, [user]);

  const completeLesson = useCallback((result) => {
    const out = applyLessonResult(progressRef.current, result);
    setProgress(out.next);
    persist(user, out.next);
    return out;
  }, [user, persist]);

  const resetProgress = useCallback(() => {
    const p = emptyProgress();
    setProgress(p);
    persist(user, p);
  }, [user, persist]);

  const fetchLeaderboard = useCallback(async (field) => {
    if (!firebaseReady || !user || user.guest) return null;
    const q = query(collection(db, 'leaderboard'), orderBy(field, 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }, [user]);

  const value = useMemo(() => ({
    user, progress, loading, error, setError, firebaseReady,
    streak: liveStreak(progress),
    signInGoogle, signInGuest, signOut, completeLesson, resetProgress, fetchLeaderboard,
  }), [user, progress, loading, error, signInGoogle, signInGuest, signOut, completeLesson, resetProgress, fetchLeaderboard]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

async function syncLeaderboard(u, p) {
  await setDoc(doc(db, 'leaderboard', u.uid), {
    name: u.name.slice(0, 60), photo: u.photo || '', xp: p.xp, streak: p.streak || 0, last: p.last || '',
    lessons: Object.keys(p.done || {}).length, updatedAt: serverTimestamp(),
  });
}
