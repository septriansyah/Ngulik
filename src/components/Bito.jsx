/**
 * Bito — maskot orisinal Ngulik!: makhluk "bit" berwarna kunyit dengan tunas daun.
 * mood: 'talk' | 'happy' | 'sad' | 'think' | 'wave'
 */
export default function Bito({ mood = 'talk', className = '', size }) {
  const happy = mood === 'happy' || mood === 'wave';
  const sad = mood === 'sad';
  const think = mood === 'think';
  const style = size ? { width: size } : undefined;
  return (
    <svg className={`bito ${className}`} style={style} viewBox="0 0 120 124" role="img" aria-label="Bito">
      <path d="M60 22 C58 12 49 7 41 9 C45 16 52 21 60 22z" fill="#45BE85" />
      <path d="M60 22 C61 10 71 4 80 6 C76 14 69 20 60 22z" fill="#1E7A52" />
      <ellipse cx="44" cy="114" rx="11" ry="6" fill="#B98A00" />
      <ellipse cx="76" cy="114" rx="11" ry="6" fill="#B98A00" />
      {mood === 'wave' ? (
        <>
          <ellipse cx="18" cy="80" rx="7" ry="12" fill="#D99A00" transform="rotate(25 18 80)" />
          <g className="bito-wave"><ellipse cx="103" cy="50" rx="7" ry="13" fill="#D99A00" transform="rotate(30 103 50)" /></g>
        </>
      ) : happy ? (
        <>
          <ellipse cx="17" cy="56" rx="7" ry="13" fill="#D99A00" transform="rotate(-30 17 56)" />
          <ellipse cx="103" cy="56" rx="7" ry="13" fill="#D99A00" transform="rotate(30 103 56)" />
        </>
      ) : think ? (
        <>
          <ellipse cx="18" cy="80" rx="7" ry="12" fill="#D99A00" transform="rotate(25 18 80)" />
          <ellipse cx="92" cy="86" rx="7" ry="12" fill="#D99A00" transform="rotate(-60 92 86)" />
        </>
      ) : (
        <>
          <ellipse cx="18" cy="80" rx="7" ry="12" fill="#D99A00" transform="rotate(25 18 80)" />
          <ellipse cx="102" cy="80" rx="7" ry="12" fill="#D99A00" transform="rotate(-25 102 80)" />
        </>
      )}
      <ellipse cx="60" cy="68" rx="42" ry="45" fill="#F2B705" />
      <ellipse cx="60" cy="88" rx="25" ry="20" fill="#FFD95A" />
      <text x="60" y="104" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="#B98A00">{'{ }'}</text>
      <circle cx="45" cy="56" r="12" fill="#fff" />
      <circle cx="75" cy="56" r="12" fill="#fff" />
      <circle cx={think ? 49 : 47} cy={think ? 53 : 58} r="6" fill="#16251D" />
      <circle cx={think ? 79 : 77} cy={think ? 53 : 58} r="6" fill="#16251D" />
      <circle cx={think ? 51 : 49} cy={think ? 50 : 55} r="2" fill="#fff" />
      <circle cx={think ? 81 : 79} cy={think ? 50 : 55} r="2" fill="#fff" />
      {sad && <path d="M32 46 h26 v9 h-26z M62 46 h26 v9 h-26z" fill="#F2B705" />}
      {sad && <path d="M36 70 q-3 6 0 8 q3 -2 0 -8z" fill="#7CC4F5" />}
      <ellipse cx="32" cy="72" rx="6" ry="3.5" fill="#F28C6B" opacity=".75" />
      <ellipse cx="88" cy="72" rx="6" ry="3.5" fill="#F28C6B" opacity=".75" />
      {happy ? (
        <>
          <path d="M48 76 Q60 92 72 76 Z" fill="#7A2E1E" />
          <path d="M54 84 Q60 89 66 84 Q60 82 54 84z" fill="#F08A7A" />
        </>
      ) : sad ? (
        <path d="M50 84 Q60 75 70 84" stroke="#7A2E1E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : think ? (
        <path d="M52 80 L68 78" stroke="#7A2E1E" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <ellipse cx="60" cy="80" rx="7" ry="6" fill="#7A2E1E" />
      )}
    </svg>
  );
}
