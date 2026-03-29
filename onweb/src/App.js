import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar'; // Import the Navbar component
import AskAndi from './components/AskAndi';
import FirstVisitSplash from './components/FirstVisitSplash';
import GlobalStyle from './styles/GlobalStyles'; // Global styles

function App() {
  useEffect(() => {
    const isDesktopFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isDesktopFinePointer) return;

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const move = (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; };
    const hover = () => cursor.classList.add('hovering');
    const unhover = () => cursor.classList.remove('hovering');

    document.addEventListener('mousemove', move);

    const hoverTargets = Array.from(document.querySelectorAll('a, button'));
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', hover);
        el.removeEventListener('mouseleave', unhover);
      });
      cursor.remove();
    };
  }, []);

  return (
    <>
      <FirstVisitSplash />
      <GlobalStyle />
      <Router>
        <Navbar /> {/* Display the navbar at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <AskAndi />
      </Router>
      <Analytics /> {/* Vercel Analytics */}
      <SpeedInsights /> {/* Vercel Speed Insights */}
    </>
  );
}

export default App;
