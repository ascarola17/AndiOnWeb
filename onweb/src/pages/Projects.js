import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import labBackground from '../images/Bp.jpeg';
import { PUBLIC_PROJECTS } from '../data/publicPortfolio.mjs';

function WebsiteScreen({ project, active }) {
  const screenRef = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const resize = () => screen.style.setProperty('--site-scale', screen.clientWidth / 1280);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);
  return <a ref={screenRef} className="project-site-screen" href={project.projectLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website (new tab)`}>
    <img src={project.poster} alt={`${project.title} public website preview`} className="project-site-poster" />
    {project.livePreview && active && <iframe className={`project-live-site${ready ? ' is-ready' : ''}`} src={project.projectLink} title={`${project.title} live website preview`} tabIndex={-1} aria-hidden="true" sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" onLoad={() => setReady(true)} />}
    <span className="project-site-open">{project.livePreview && ready && active ? 'Live website' : 'Website preview'} <span>Open {project.title} ↗</span></span>
  </a>;
}

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const carouselViewportRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pendingEnterRef = useRef(null);
  const [carouselViewportWidth, setCarouselViewportWidth] = useState(0);
  const [cardMotionClass, setCardMotionClass] = useState('');

  const projects = PUBLIC_PROJECTS.map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    status: project.status,
    description: project.description,
    videoUrl: project.video ? project.video.replace('watch?v=', 'embed/') + '?rel=0&playsinline=1' : null,
    watchUrl: project.video || null,
    githubLink: project.github || null,
    projectLink: project.link || null,
    poster: project.poster || null,
    posterAlt: project.posterAlt || null,
    livePreview: Boolean(project.livePreview),
    underWraps: Boolean(project.underWraps),
  }));

  const currentProject = projects[currentProjectIndex];
  const n = projects.length;

  const scrollToIndex = useCallback((index) => {
    const i = Math.max(0, Math.min(n - 1, index));
    const root = carouselViewportRef.current;
    if (!root) return;
    const w = root.clientWidth;
    if (w < 1) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.scrollTo({ left: i * w, behavior: reduce ? 'auto' : 'smooth' });
  }, [n]);

  const updateActiveFromScroll = useCallback(() => {
    const root = carouselViewportRef.current;
    if (!root) return;
    const w = root.clientWidth;
    if (w < 1) return;
    const idx = Math.round(root.scrollLeft / w);
    setCurrentProjectIndex(Math.max(0, Math.min(n - 1, idx)));
  }, [n]);

  useLayoutEffect(() => {
    const root = carouselViewportRef.current;
    if (!root) return;
    const measure = () => {
      const w = Math.round(root.clientWidth);
      if (w > 0) setCarouselViewportWidth(w);
    };
    measure();
    const id = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const root = carouselViewportRef.current;
    if (!root || carouselViewportWidth < 1) return;
    root.scrollLeft = activeIndexRef.current * carouselViewportWidth;
  }, [carouselViewportWidth]);

  useEffect(() => {
    const root = carouselViewportRef.current;
    if (!root) return;
    const onScroll = () => {
      window.requestAnimationFrame(updateActiveFromScroll);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    updateActiveFromScroll();
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateActiveFromScroll]);

  useEffect(() => {
    activeIndexRef.current = currentProjectIndex;
  }, [currentProjectIndex]);

  useEffect(() => {
    const p = pendingEnterRef.current;
    if (!p) return;
    if (currentProjectIndex !== p.targetIndex) return;
    pendingEnterRef.current = null;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setCardMotionClass(p.dir === 'next' ? 'portal-card--enter-next' : 'portal-card--enter-prev');
    const id = window.setTimeout(() => setCardMotionClass(''), 300);
    return () => clearTimeout(id);
  }, [currentProjectIndex]);

  useEffect(() => {
    const el = carouselViewportRef.current;
    if (!el) return;
    const onKeyDown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const i = activeIndexRef.current;
      if (e.key === 'ArrowLeft') {
        if (i <= 0) return;
        pendingEnterRef.current = { targetIndex: i - 1, dir: 'prev' };
        scrollToIndex(i - 1);
      } else {
        if (i >= n - 1) return;
        pendingEnterRef.current = { targetIndex: i + 1, dir: 'next' };
        scrollToIndex(i + 1);
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [scrollToIndex, n]);

  useEffect(() => {
    document.title = `${currentProject.title} | Projects | Andi Scarola`;
  }, [currentProject.title]);



  const goCarouselPrev = () => {
    if (currentProjectIndex <= 0) return;
    const t = currentProjectIndex - 1;
    pendingEnterRef.current = { targetIndex: t, dir: 'prev' };
    scrollToIndex(t);
  };

  const goCarouselNext = () => {
    if (currentProjectIndex >= n - 1) return;
    const t = currentProjectIndex + 1;
    pendingEnterRef.current = { targetIndex: t, dir: 'next' };
    scrollToIndex(t);
  };

  const onProjectSelect = (index) => {
    const cur = currentProjectIndex;
    if (index !== cur) {
      pendingEnterRef.current = {
        targetIndex: index,
        dir: index > cur ? 'next' : 'prev',
      };
    }
    const root = carouselViewportRef.current;
    if (root) root.scrollTo({ left: index * root.clientWidth, behavior: 'instant' });
    setCurrentProjectIndex(index);
  };

  const shouldLoadVideo = (index) => index === currentProjectIndex;

  const slideInlineStyle =
    carouselViewportWidth > 0
      ? {
          flex: `0 0 ${carouselViewportWidth}px`,
          width: carouselViewportWidth,
          minWidth: carouselViewportWidth,
        }
      : undefined;

  const renderProjectSlide = (project, index) => (
    <article
      key={`project-slide-${project.title}`}
      className="projects-carousel-slide"
      style={slideInlineStyle}
      data-carousel-index={index}
      aria-label={`${project.title}, project ${index + 1} of ${n}`}
      inert={index !== currentProjectIndex}
    >
      <div className="portal-card-sway">
        <div
          className={[
            'portal-card',
            index === currentProjectIndex ? cardMotionClass : '',
          ].filter(Boolean).join(' ')}
        >
        <div
          className="portal-window"
          aria-label={`${project.title} monitor`}
        >
          <div className="portal-window-screen">
            {project.videoUrl && shouldLoadVideo(index) ? (
              <iframe
                className="portal-iframe"
                src={project.videoUrl}
                title={`${project.title} video demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : project.videoUrl ? (
              <div className="portal-iframe-placeholder" aria-hidden="true" />
            ) : project.projectLink && project.poster ? (
              <WebsiteScreen project={project} active={index === currentProjectIndex} />
            ) : project.poster ? (
              <figure className={`project-picture-screen${project.underWraps ? ' is-illustration' : ''}`}>
                <img src={project.poster} alt={project.posterAlt} loading="lazy" />
                <figcaption>{project.posterAlt}</figcaption>
              </figure>
            ) : (
              <div className="project-overview-screen">
                <span className="overview-category">{project.category}</span>
                <strong>{project.title}</strong>
                <span className="overview-rule" aria-hidden="true" />
                <span className="overview-status">{project.underWraps ? 'Under wraps · In development' : project.status}</span>
              </div>
            )}
          </div>
          <span className="portal-watermark" aria-hidden="true">
            PROPERTY OF PLANKTON LABS
          </span>
        </div>

        <div className="portal-hud" data-project-slot={String(index)}>
          <h2 className="hud-title">{project.title}</h2>
          <p className="project-card-meta">{project.category} <span aria-hidden="true">/</span> {project.status}</p>
          <div className="portal-hud-row">
            <div className="hud-desc-note">
              <span className="hud-desc-tape" aria-hidden="true" />
              <p className="hud-desc">{project.description}</p>
            </div>

          </div>
          {(project.projectLink || project.githubLink || project.watchUrl) && <footer className="project-bottom-links" aria-label={`${project.title} links`}>
            {project.projectLink && <a href={project.projectLink} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer">View code <span aria-hidden="true">↗</span></a>}
            {project.watchUrl && <a href={project.watchUrl} target="_blank" rel="noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a>}
          </footer>}
        </div>
        </div>
      </div>
    </article>
  );

  return (
    <main className="projects-wrapper projects-media-refresh" id="main-content">
      <BubbleTransition />

      <div className="lab-stage">
        <div
          className="lab-stage-parallax"
        >
        <div
          className="background-container"
          style={{ backgroundImage: `url(${labBackground})` }}
        >
          <div className="ambient-bubbles" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={`ambient-bubble b${i % 6}`} />
            ))}
          </div>

          <p className="lab-stamp" aria-hidden="true">PROPERTY OF PLANKTON LABS</p>
          <header className="project-page-intro"><h1>From the lab.</h1><p>A few things I’ve built, and a few still in the works.</p></header>

          <div className="projects-carousel-shell">
            <button
              type="button"
              className={[
                'projects-carousel-arrow',
                'projects-carousel-arrow--prev',
                currentProjectIndex <= 0 ? 'is-dimmed' : '',
              ].filter(Boolean).join(' ')}
              onClick={goCarouselPrev}
              disabled={currentProjectIndex <= 0}
              aria-label="Previous project"
              aria-disabled={currentProjectIndex <= 0}
            >
              <span className="projects-carousel-arrow-inner" aria-hidden="true">
                <svg
                  className="projects-carousel-arrow-svg"
                  viewBox="0 0 56 72"
                  width="30"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 9C16 34 16 38 40 63"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.45"
                  />
                  <path
                    d="M44 14L18 36L44 58"
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className="projects-carousel-viewport"
              ref={carouselViewportRef}
              tabIndex={0}
              role="region"
              aria-label="Project carousel"
            >
              <div className="projects-carousel-track">
                {projects.map((p, i) => renderProjectSlide(p, i))}
              </div>
            </div>

            <button
              type="button"
              className={[
                'projects-carousel-arrow',
                'projects-carousel-arrow--next',
                currentProjectIndex >= n - 1 ? 'is-dimmed' : '',
              ].filter(Boolean).join(' ')}
              onClick={goCarouselNext}
              disabled={currentProjectIndex >= n - 1}
              aria-label="Next project"
              aria-disabled={currentProjectIndex >= n - 1}
            >
              <span className="projects-carousel-arrow-inner" aria-hidden="true">
                <svg
                  className="projects-carousel-arrow-svg"
                  viewBox="0 0 56 72"
                  width="30"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 9C40 34 40 38 16 63"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.45"
                  />
                  <path
                    d="M12 14L38 36L12 58"
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="project-picker">
            <label htmlFor="project-choice">Choose a project <span>{currentProjectIndex + 1} / {n}</span></label>
            <select id="project-choice" value={currentProjectIndex} onChange={event => onProjectSelect(Number(event.target.value))}>
              <optgroup label="Current work">
                {projects.map((project,index) => project.category !== 'Past work' ? <option key={project.id} value={index}>{project.title}{project.videoUrl ? ' · Video demo' : project.projectLink ? ' · Project link' : ''}</option> : null)}
              </optgroup>
              <optgroup label="Past work & demos">
                {projects.map((project,index) => project.category === 'Past work' ? <option key={project.id} value={index}>{project.title}{project.videoUrl ? ' · Video demo' : ''}</option> : null)}
              </optgroup>
            </select>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
