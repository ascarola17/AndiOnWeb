import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Home.css';
import backgroundPng from '../images/bm.png';
import andiPng from '../images/AndiBob.png';
import karenPng from '../images/Karen.png';

const publicUrl = process.env.PUBLIC_URL || '';

const Home = () => {
  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const [motionPaused, setMotionPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [andiLoaded, setAndiLoaded] = useState(false);
  const [karenLoaded, setKarenLoaded] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onPreference = () => setMotionPaused(media.matches);
    media.addEventListener('change', onPreference);
    let frame, targetX = 0, targetY = 0, currentX = 0, currentY = 0, tracking = false;
    const reset = () => { tracking = false; };
    const move = (event) => {
      if (motionPaused || !finePointer.matches) return;
      const bounds = scene.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
      tracking = true;
    };
    const tick = (time) => {
      if (!motionPaused && !document.hidden) {
        const x = tracking ? targetX : Math.sin(time * .00027) * .27;
        const y = tracking ? targetY : Math.cos(time * .00021) * .16;
        currentX += (x - currentX) * .07;
        currentY += (y - currentY) * .07;
        scene.style.setProperty('--look-x', currentX.toFixed(4));
        scene.style.setProperty('--look-y', currentY.toFixed(4));
      }
      frame = requestAnimationFrame(tick);
    };
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    scene.style.setProperty('--look-x', '0');
    scene.style.setProperty('--look-y', '0');
    if (!motionPaused) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      media.removeEventListener('change', onPreference);
    };
  }, [motionPaused]);

  return (
    <div className={`home-wrapper home-depth-scene${motionPaused ? ' is-motion-paused' : ''}`} ref={sceneRef}>
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

      <div className="ocean-light-shafts" aria-hidden="true" />
      <div className="scene-water-sheen" aria-hidden="true" />
      <div className="scene-sand-shadow" aria-hidden="true" />
      <div className="aquarium-rim" aria-hidden="true"><span className="rim-screw screw-tl"/><span className="rim-screw screw-tr"/><span className="rim-screw screw-bl"/><span className="rim-screw screw-br"/></div>
      <div className="foreground-bubbles" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <main id="main-content">
        <span className="jellyfish-1" style={{position:'absolute', left:'8%', bottom:'30%', fontSize:'clamp(1.5rem,4vw,3rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>
        <span className="jellyfish-2" style={{position:'absolute', left:'18%', bottom:'45%', fontSize:'clamp(1rem,2.5vw,2rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>
        <span className="jellyfish-3" style={{position:'absolute', left:'12%', bottom:'60%', fontSize:'clamp(0.8rem,2vw,1.5rem)', zIndex:2, pointerEvents:'none'}}>🪼</span>

        <div className="home-text" id="homeText">
          <p className="home-name-label">ANDI SCAROLA · RESEARCHER &amp; BUILDER</p>
          <h1 className="home-title" aria-label="Hi, I’m Andi Scarola!">
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
          <div className="home-depth-layer home-depth-layer--andi">
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
          </div>
          <div className="home-depth-layer home-depth-layer--jellyfish">
          <img
            className="karen-img"
            src={`${publicUrl}/images/Karen.webp`}
            alt="Custom pink jellyfish illustration"
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
        </div>
      </main>
      <div className="scene-depth-controls"><button className="scene-motion-toggle" type="button" onClick={() => setMotionPaused(value => !value)} aria-pressed={motionPaused} aria-label={motionPaused ? 'Play scene motion' : 'Pause scene motion'} title={motionPaused ? 'Play scene motion' : 'Pause scene motion'}><span aria-hidden="true">{motionPaused ? '▷' : 'Ⅱ'}</span></button></div>
    </div>
  );
};

export default Home;
