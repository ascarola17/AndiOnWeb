import React, { useState, useEffect, useRef, useCallback } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import labBackground from '../images/Bp.png';

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [lockedToast, setLockedToast] = useState(false);
  const touchStart = useRef(null);
  const lockedToastTimer = useRef(null);

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
    }
  ];

  const currentProject = projects[currentProjectIndex];

  const goNext = useCallback(() => {
    setCurrentProjectIndex((i) => (i + 1) % projects.length);
  }, [projects.length]);

  const goPrev = useCallback(() => {
    setCurrentProjectIndex((i) => (i - 1 + projects.length) % projects.length);
  }, [projects.length]);

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

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) goNext();
    else goPrev();
  };

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

          <div
            className="portal-window"
            aria-label="Project monitor — swipe left or right to change project"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {!currentProject.isComingSoon ? (
              <iframe
                src={currentProject.videoUrl}
                title={currentProject.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="portal-classified">
                <div className="static-noise" />
                <div className="static-scanlines" />
                <div className="portal-classified-text">
                  <div className="classified-stamp">CLASSIFIED</div>
                  <p className="portal-classified-desc">{currentProject.description}</p>
                  <div className="classified-eta">
                    <span className="status-blink">◉</span> {currentProject.eta}
                  </div>
                </div>
              </div>
            )}
            <span className="portal-watermark" aria-hidden="true">
              PROPERTY OF PLANKTON LABS
            </span>
          </div>

          <div className="portal-hud">
            <div className="hud-title">{currentProject.title}</div>
            <div className="hud-desc">{currentProject.description}</div>
            {currentProject.githubLink && !currentProject.isComingSoon && (
              <a
                href={currentProject.githubLink}
                target="_blank"
                rel="noreferrer"
                className="hud-github"
              >
                source → github
              </a>
            )}
          </div>

          <div className="formula-rail" role="tablist" aria-label="Formula trial slots">
            {projects.map((project, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentProjectIndex}
                className={[
                  'formula-slot',
                  index === currentProjectIndex ? 'active' : '',
                  project.isComingSoon ? 'locked' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => {
                  if (project.isComingSoon) flashLockedToast();
                  setCurrentProjectIndex(index);
                }}
                aria-label={project.title}
              >
                <span className="formula-tooltip" aria-hidden="true">{project.title}</span>
                <span className="formula-droplet" aria-hidden="true" />
                <span className="formula-slot-num">{index + 1}</span>
              </button>
            ))}
          </div>

          <p className="swipe-hint">Swipe the monitor to flip trials</p>

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
