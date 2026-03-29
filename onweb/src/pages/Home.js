import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BubbleTransition from '../components/BubbleTransition';
import LazyImage from '../components/LazyImage';
import '../styles/Home.css';
import background from '../images/bm.png';
import andiCharacter from '../images/AndiBob.png';
import karenCharacter from '../images/Karen.png';

const Home = () => {
  const navigate = useNavigate();

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
      <LazyImage src={background} alt="Bikini Bottom Background" className="bg-img" />
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

        {/* Wrapped characters inside a responsive container */}
        <div className="character-wrapper">
          <LazyImage
            className="home-character"
            src={andiCharacter}
            alt="Andi - character"
          />
          <LazyImage
            className="karen-img"
            src={karenCharacter}
            alt="Karen from SpongeBob"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;