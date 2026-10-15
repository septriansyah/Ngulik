import { Link, NavLink } from 'react-router-dom';
import { sfx } from '../lib/sound.js';

// Navbar halaman publik (beranda, cara penggunaan, about). `children` = tombol aksi di ujung kanan.
export default function PublicNav({ children }) {
  return (
    <header className="lnav">
      <Link to="/" className="logo" onClick={() => sfx.tap()}>Ngulik<span>!</span></Link>
      <nav className="lnav-links" aria-label="Navigasi situs">
        <NavLink to="/cara-pakai" onClick={() => sfx.tap()}>Cara Penggunaan</NavLink>
        <NavLink to="/tentang" onClick={() => sfx.tap()}>About</NavLink>
        {children}
      </nav>
    </header>
  );
}
