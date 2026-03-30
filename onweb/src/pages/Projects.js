import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import labBackground from '../images/Bp.jpeg';

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [lockedToast, setLockedToast] = useState(false);
  const lockedToastTimer = useRef(null);
  const carouselViewportRef = useRef(null);
  const activeIndexRef = useRef(0);
  const pendingEnterRef = useRef(null);
  const [carouselViewportWidth, setCarouselViewportWidth] = useState(0);
  const [cardMotionClass, setCardMotionClass] = useState('');

  const projects = [
    {
      title: 'Snap Market',
      description: 'SnapMarket is a cutting-edge web application designed to streamline product identification and comparison using advanced AI and web technologies.',
      videoUrl: 'https://www.youtube.com/embed/cj87lIUYVZQ?autoplay=1&loop=1&playlist=cj87lIUYVZQ&controls=0&showinfo=0&rel=0',
      githubLink: 'https://github.com/ascarola17/TikTokJam',
      isComingSoon: false,
    },
    {
      title: 'DUI Risk Radar',
      description: 'DUI Risk Heatmap is a web application designed to visualize DUI risk areas using a heatmap overlay on a Google Map. ',
      videoUrl: 'https://www.youtube.com/embed/j8vquDaPgc8?autoplay=1&loop=1&playlist=j8vquDaPgc8&controls=0&showinfo=0&rel=0',
      githubLink: 'https://github.com/ascarola17/DUI',
      isComingSoon: false,
    },
    {
      title: 'Fight Coach',
      description: 'Developed a real-time pose analysis tool for combat sports using MediaPipe to extract 2D skeletal keypoints from recorded fight videos.',
      videoUrl: 'https://www.youtube.com/embed/_qpvr-0M2Ec?autoplay=1&loop=1&playlist=_qpvr-0M2Ec&controls=0&showinfo=0&rel=0',
      githubLink: 'https://github.com/ascarola17/Fight-coach',
      isComingSoon: false,
    },
    {
      title: 'ASL Interpreter',
      description: 'Developed a real-time interpreter using pose estimation and MediaPipe for live ASL classification.',
      videoUrl: 'https://www.youtube.com/embed/yWli0SsIAIU?autoplay=1&loop=1&playlist=yWli0SsIAIU&controls=0&showinfo=0&rel=0',
      githubLink: 'https://github.com/ascarola17/Fight-coach',
      isComingSoon: false,
    },
    {
      title: 'AI Secretary — Sophia',
      description: 'An autonomous AI assistant handling scheduling, communication, and task routing for small businesses. Powered by multi-agent orchestration.',
      videoUrl: null,
      githubLink: null,
      isComingSoon: true,
      classifiedId: 'FILE-0047-AS',
      clearanceLevel: 'RESTRICTED',
      eta: 'PENDING DEPLOYMENT',
    },
    {
      title: 'Marketing Agents',
      description: 'Multi-agent pipeline for automated content generation, audience targeting, and campaign analytics. Built for El Paso market validation.',
      videoUrl: null,
      githubLink: null,
      isComingSoon: true,
      classifiedId: 'FILE-0089-MA',
      clearanceLevel: 'RESTRICTED',
      eta: 'PENDING DEPLOYMENT',
    },
    {
      title: 'Drone Recon Feed',
      description: 'Live aerial intelligence system using autonomous drone navigation and real-time computer vision for first-response situational awareness.',
      videoUrl: null,
      githubLink: null,
      isComingSoon: true,
      classifiedId: 'FILE-0112-DR',
      clearanceLevel: 'TOP SECRET',
      eta: 'FOOTAGE INCOMING',
    },
  ];

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
    document.title = currentProject.isComingSoon
      ? `🪣 ${currentProject.title} — Coming Soon`
      : `📺 ${currentProject.title} — Andi on the Web`;
    return () => { document.title = 'Andi on the Web'; };
  }, [currentProjectIndex, currentProject.isComingSoon, currentProject.title]);

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mqReduce.matches || !mqFine.matches) return;

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      setParallax({ x: nx * 10, y: ny * 8 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => () => {
    if (lockedToastTimer.current) clearTimeout(lockedToastTimer.current);
  }, []);

  const flashLockedToast = () => {
    if (lockedToastTimer.current) clearTimeout(lockedToastTimer.current);
    setLockedToast(true);
    lockedToastTimer.current = setTimeout(() => {
      setLockedToast(false);
      lockedToastTimer.current = null;
    }, 2600);
  };

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

  const onDotClick = (index) => {
    if (projects[index].isComingSoon) flashLockedToast();
    const cur = currentProjectIndex;
    if (index !== cur) {
      pendingEnterRef.current = {
        targetIndex: index,
        dir: index > cur ? 'next' : 'prev',
      };
    }
    scrollToIndex(index);
  };

  const shouldLoadVideo = (index) => {
    const d = Math.abs(index - currentProjectIndex);
    return d <= 1;
  };

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
            {!project.isComingSoon && shouldLoadVideo(index) ? (
              <iframe
                className="portal-iframe"
                src={project.videoUrl}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : !project.isComingSoon ? (
              <div className="portal-iframe-placeholder" aria-hidden="true" />
            ) : (
              <div className="portal-classified">
                <div className="static-noise" />
                <div className="static-scanlines" />
                <div className="portal-classified-text">
                  <div className="classified-stamp">CLASSIFIED</div>
                  <p className="portal-classified-desc">{project.description}</p>
                  <div className="classified-eta">
                    <span className="status-blink">◉</span> {project.eta}
                  </div>
                </div>
              </div>
            )}
          </div>
          <span className="portal-watermark" aria-hidden="true">
            PROPERTY OF PLANKTON LABS
          </span>
        </div>

        <div className="portal-hud" data-project-slot={String(index)}>
          <div className="hud-title">{project.title}</div>
          <div className="portal-hud-row">
            <div className="hud-desc-note">
              <span className="hud-desc-tape" aria-hidden="true" />
              <p className="hud-desc">{project.description}</p>
            </div>
            {project.githubLink && !project.isComingSoon && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="hud-github hud-github-pill"
              >
                source → github
              </a>
            )}
          </div>
        </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="projects-wrapper">
      <BubbleTransition />

      <div className="lab-stage">
        <div
          className="lab-stage-parallax"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.02)`,
          }}
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

          <div
            className="projects-carousel-dots"
            role="tablist"
            aria-label={`Choose project, ${currentProjectIndex + 1} of ${n}`}
          >
            {projects.map((project, index) => (
              <button
                key={`dot-${project.title}`}
                type="button"
                role="tab"
                aria-selected={index === currentProjectIndex}
                aria-label={`${project.title}, project ${index + 1} of ${n}`}
                className={[
                  'projects-carousel-dot',
                  index === currentProjectIndex ? 'is-active' : '',
                  project.isComingSoon ? 'is-locked' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => onDotClick(index)}
              />
            ))}
          </div>

          <p className="swipe-hint">Scroll or swipe sideways to browse projects</p>

          <div
            className={`plankton-toast${lockedToast ? ' plankton-toast--visible' : ''}`}
            role="status"
            aria-live="polite"
            aria-hidden={!lockedToast}
          >
            PLANKTON&apos;S STILL WORKING ON IT...
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
