export default function BadgeIcon({ badge, locked = false, className = '' }) {
  const fs = badge.glyph.length > 3 ? 18 : badge.glyph.length > 2 ? 22 : 30;
  return (
    <svg className={`badge-icon ${locked ? 'is-locked' : ''} ${className}`} viewBox="0 0 100 112" role="img" aria-label={`Lencana ${badge.name}${locked ? ' (belum didapat)' : ''}`}>
      <path d="M30 86 L22 110 L36 102 L44 112 L50 90z M70 86 L78 110 L64 102 L56 112 L50 90z" fill={badge.deep} />
      <path d="M50 4 L90 26 V70 L50 94 L10 70 V26Z" fill={badge.deep} />
      <path d="M50 12 L82 30 V66 L50 85 L18 66 V30Z" fill={badge.color} />
      <path d="M50 12 L82 30 V40 L18 40 V30Z" fill="#fff" opacity=".2" />
      <circle cx="50" cy="50" r="22" fill="#fff" opacity=".16" />
      <text x="50" y={50 + fs * 0.36} textAnchor="middle" fontFamily="'Baloo 2', 'Trebuchet MS', sans-serif" fontWeight="800" fontSize={fs} fill="#fff">{badge.glyph}</text>
    </svg>
  );
}
