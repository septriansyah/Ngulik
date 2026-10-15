import { Link } from 'react-router-dom';
import Tutorial from '../components/Tutorial.jsx';
import Bito from '../components/Bito.jsx';
import PublicNav from '../components/PublicNav.jsx';
import { TUTORIAL } from '../data/tutorial.js';
import { sfx } from '../lib/sound.js';

export default function HowTo() {
  return (
    <div className="landing">
      <PublicNav>
        <Link to="/" className="btn small green" onClick={() => sfx.tap()}>Mulai</Link>
      </PublicNav>

      <section className="lsec howto-head">
        <h1>Cara memakai Ngulik!</h1>
        <p className="sub">Ikuti {TUTORIAL.length} langkah ini dari masuk sampai mengumpulkan lencana.</p>
        <Tutorial />
      </section>

      <section className="final">
        <Bito mood="happy" />
        <div>
          <h2>Sudah paham?</h2>
          <p>Saatnya mulai pelajaran pertamamu.</p>
          <Link to="/" className="btn green" onClick={() => sfx.tap()}>Kembali dan mulai</Link>
        </div>
      </section>

      <footer className="lfoot">Ngulik! · Media pembelajaran algoritma dasar untuk Informatika SMP/MTs · <Link to="/tentang">Tentang Ngulik!</Link></footer>
    </div>
  );
}
