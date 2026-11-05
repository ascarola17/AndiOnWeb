import React, { useEffect, useRef, useState } from 'react';
import '../styles/PhotoCurrents.css';

function PhotoCurrent({ photos, row, paused, load, onOpen }) {
  const [settled, setSettled] = useState(() => new Set());
  const ready = settled.size === photos.length;
  const settle = stem => setSettled(previous => {
    if (previous.has(stem)) return previous;
    return new Set(previous).add(stem);
  });
  return <div className={`photo-current${row ? ' photo-current--reverse' : ''}`}>
    <div className="photo-current-track" style={{ animationDuration: `${photos.length * 7}s`, animationPlayState: paused || !ready ? 'paused' : 'running' }}>
      {[0, 1].map(copy => <div className="photo-current-group" key={copy} aria-hidden={copy ? true : undefined}>
        {photos.map(photo => <button key={photo.stem} type="button" className="current-photo" tabIndex={copy ? -1 : 0} style={{ '--photo-ratio': photo.width / photo.height }} onClick={() => onOpen(photo.index)} aria-label={`Open photo: ${photo.caption}`}>
          <div className="current-photo-frame">{load && <img src={photo.thumbnail} srcSet={`${photo.thumbnail} ${Math.round(photo.width * Math.min(480 / photo.width, 480 / photo.height, 1))}w, ${photo.medium} ${Math.round(photo.width * Math.min(960 / photo.width, 960 / photo.height, 1))}w`} sizes={`(max-width: 768px) ${Math.ceil(190 * photo.width / photo.height)}px, ${Math.ceil(224 * photo.width / photo.height)}px`} width={photo.width} height={photo.height} alt={copy ? '' : photo.alt} decoding="async" onLoad={copy ? undefined : () => settle(photo.stem)} onError={copy ? undefined : () => settle(photo.stem)} />}</div>
          <span className="current-photo-caption">{photo.caption}</span>
        </button>)}
      </div>)}
    </div>
  </div>;
}

export default function PhotoCurrents({ photos, onOpen, viewerOpen }) {
  const sectionRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [paused, setPaused] = useState(false);
  const [grid, setGrid] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const near = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setLoad(true); near.disconnect(); } }, { rootMargin: '600px' });
    const inView = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    near.observe(sectionRef.current);
    inView.observe(sectionRef.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChange = () => setReduced(media.matches);
    const visibilityChange = () => setTabVisible(!document.hidden);
    media.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', visibilityChange);
    return () => { near.disconnect(); inView.disconnect(); media.removeEventListener('change', motionChange); document.removeEventListener('visibilitychange', visibilityChange); };
  }, []);
  const indexed = photos.map((photo, index) => ({ ...photo, index }));
  return <section className={`photo-currents${grid ? ' photo-currents--grid' : ''}`} id="camera-roll" ref={sectionRef} aria-label="Andi’s personal photo gallery">
    <div className="photo-currents-heading">
      <div><p className="field-page-label">THE CAMERA ROLL · {photos.length} PHOTOS</p><h3>What’s Been Brewing</h3><p>The people, places, and occasional side quests.</p></div>
      <div className="current-controls">
        {!grid && !reduced && <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Let it drift →' : 'Pause the current'}</button>}
        <button type="button" aria-pressed={grid} onClick={() => setGrid(value => !value)}>{grid ? 'Back to the current' : 'See every photo'}</button>
      </div>
    </div>
    <div className="photo-current-rows">
      {[0, 1].map(row => <PhotoCurrent key={row} row={row} photos={indexed.filter((_, index) => index % 2 === row)} load={load} onOpen={onOpen} paused={paused || reduced || grid || !visible || !tabVisible || viewerOpen} />)}
    </div>
    <p className="current-hint">Two currents, plenty of side quests. Tap a photo for the full frame.</p>
  </section>;
}
