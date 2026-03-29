import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Home.css';
import backgroundPng from '../images/bm.png';
import andiPng from '../images/AndiBob.png';
import karenPng from '../images/Karen.png';

const publicUrl = process.env.PUBLIC_URL || '';

const Home = () => {
  const navigate = useNavigate();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [andiLoaded, setAndiLoaded] = useState(false);
  const [karenLoaded, setKarenLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const bg = document.querySelector('.bg-img');
      if (bg) bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-wrapper">
      <img
        className="bg-img"
        src={`${publicUrl}/images/bm.webp`}
        alt="Bikini Bottom Background"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setBgLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = backgroundPng;
          setBgLoaded(true);
        }}
        style={{ opacity: bgLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
      />
      <BubbleTransition textId="homeText" delay={3000} />

      <main>
        <span className="jellyfish-1" style={{position:'absolute', left:'8%', bottom:'30%', fontSize:'clamp(1.5rem,4vw,3rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>
        <span className="jellyfish-2" style={{position:'absolute', left:'18%', bottom:'45%', fontSize:'clamp(1rem,2.5vw,2rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>
        <span className="jellyfish-3" style={{position:'absolute', left:'12%', bottom:'60%', fontSize:'clamp(0.8rem,2vw,1.5rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>

        <div className="home-text hidden-text" id="homeText">
          <h1 className="home-title">
            Hi, I'm <span className="name-highlight">Andi!</span>
          </h1>
          <p className="home-subtitle">
            Somewhere between a Git commit and Goo Lagoon...
          </p>
          <button className="home-button" onClick={() => navigate('/about')}>
            Dive In!
          </button>
        </div>

        <div className="character-wrapper">
          <img
            className="home-character"
            src={`${publicUrl}/images/AndiBob.webp`}
            alt="Andi - character"
            loading="lazy"
            decoding="async"
            onLoad={() => setAndiLoaded(true)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = andiPng;
              setAndiLoaded(true);
            }}
            style={{ opacity: andiLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
          />
          <img
            className="karen-img"
            src={`${publicUrl}/images/Karen.webp`}
            alt="Karen from SpongeBob"
            loading="lazy"
            decoding="async"
            onLoad={() => setKarenLoaded(true)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = karenPng;
              setKarenLoaded(true);
            }}
            style={{ opacity: karenLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
