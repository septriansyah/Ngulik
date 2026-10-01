const S = ({ children, vb = '0 0 24 24', ...p }) => <svg viewBox={vb} aria-hidden="true" {...p}>{children}</svg>;

export const Fire = (p) => <S fill="#F27A1A" {...p}><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3 1-6 1-8.5z" /></S>;
export const Bolt = (p) => <S fill="#F2B705" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></S>;
export const Heart = (p) => <S fill="currentColor" {...p}><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" /></S>;
export const Medal = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" {...p}><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" /><path d="M12 8.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" fill="currentColor" stroke="none" /></S>;
export const Close = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18" /></S>;
export const Lock = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></S>;
export const Check = (p) => <S fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-10" /></S>;
export const Star = (p) => <S fill="currentColor" {...p}><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z" /></S>;
export const Book = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 21V5M8 7h7" /></S>;
export const Home = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" {...p}><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></S>;
export const Trophy = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M10 17h4v4h-4z" /></S>;
export const User = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></S>;
export const Cart = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 4h2l2.5 11h10L20 8H7" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></S>;
export const SoundOn = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" /></S>;
export const SoundOff = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l5 6M22 9l-5 6" /></S>;
export const Clock = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>;
export const Target = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.3" {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></S>;
export const Arrow = (p) => <S fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>;
export const Google = (p) => (
  <S vb="0 0 48 48" {...p}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </S>
);
export const FlameBig = (p) => (
  <S vb="0 0 100 120" {...p}>
    <path d="M50 4s38 30 38 68a38 38 0 0 1-76 0c0-16 8-28 16-36 0 14 6 22 14 22 0-22 8-40 8-54z" fill="#F27A1A" />
    <path d="M50 58s18 12 18 30a18 18 0 0 1-36 0c0-10 6-16 10-20 0 6 3 10 8 10 0-8 0-14 0-20z" fill="#FFC53D" />
  </S>
);
