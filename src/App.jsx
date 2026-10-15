import { useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Shell from './components/Shell.jsx';
import Bito from './components/Bito.jsx';
import Landing from './pages/Landing.jsx';
import Learn from './pages/Learn.jsx';
import Lesson from './pages/Lesson.jsx';
import Guide from './pages/Guide.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Badges from './pages/Badges.jsx';
import Profile from './pages/Profile.jsx';
import Office from './pages/Office.jsx';
import HowTo from './pages/HowTo.jsx';
import About from './pages/About.jsx';

function Protected({ children, bare }) {
  const { user, loading } = useApp();
  if (loading) return <div className="loading"><Bito mood="think" /><p>Menyiapkan pelajaranmu...</p></div>;
  if (!user) return <Navigate to="/" replace />;
  return bare ? children : <Shell>{children}</Shell>;
}

function LessonRoute() {
  const { key } = useParams();
  const [retry, setRetry] = useState(0);
  return <Lesson key={`${key}-${retry}`} lessonKey={key} onRetry={() => setRetry((r) => r + 1)} />;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cara-pakai" element={<HowTo />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/belajar" element={<Protected><Learn /></Protected>} />
          <Route path="/pelajaran/:key" element={<Protected bare><LessonRoute /></Protected>} />
          <Route path="/panduan/:unitId" element={<Protected bare><Guide /></Protected>} />
          <Route path="/peringkat" element={<Protected><Leaderboard /></Protected>} />
          <Route path="/lencana" element={<Protected><Badges /></Protected>} />
          <Route path="/profil" element={<Protected><Profile /></Protected>} />
          <Route path="/office" element={<Office />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
