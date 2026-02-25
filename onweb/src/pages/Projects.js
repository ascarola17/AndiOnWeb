import React, { useState, useEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import keckImage from '../images/keck.JPG';
import keckPeopleImage from '../images/keck-people.jpg';

const projects = [
  // ── NEW FEATURED PROJECTS ────────────────────────────────────────────
  {
    title: 'Keck 3D Innovation — Research Engineer',
    what: '3D-printed ceramics + fiber process monitoring at W.M. Keck Center for 3D Innovation (UTEP).',
    did: [
      'Built real-time Flask dashboards for streaming sensor data & motor control',
      'Developed calibration pages and control logic for hot-wire/pitot probe data acquisition',
      'Managed CSV logging + multi-probe config across 3 web platforms',
      'Currently developing fiber segmentation pipelines: tiling, stitching, angle analysis from SEM images',
    ],
    tech: 'Python · Flask · SQLite · JavaScript · OpenCV · NumPy',
    impact: 'Reduced manual data-collection time by ~60%; enabled continuous process monitoring for ceramic additive manufacturing research.',
    imageUrl: keckImage,
    githubLink: null,
    externalLink: { label: 'Keck Center', href: 'https://www.utep.edu/engineering/keck/' },
  },
  {
    title: 'Threat Assessment Drone System',
    what: 'Autonomous drone platform for real-time threat detection in complex environments using computer vision.',
    did: [
      'Integrated CV models for object classification and threat scoring on drone video feed',
      'Built sensor fusion pipeline combining camera + telemetry data for situational awareness',
      'Developed a lightweight inference pipeline optimized for edge deployment on embedded hardware',
      'Designed alert and logging system for flagged events with confidence thresholds',
    ],
    tech: 'Python · OpenCV · TensorFlow Lite · MAVLink · Raspberry Pi',
    impact: 'Demonstrated real-time threat detection at 15fps on edge hardware; modular pipeline adaptable to different drone platforms.',
    imageUrl: keckPeopleImage,
    githubLink: null,
    externalLink: null,
  },

  // ── EXISTING PROJECTS ────────────────────────────────────────────────
  {
    title: 'Snap Market',
    what: 'Web app that streamlines product identification and price comparison using AI and web scraping.',
    did: [
      'Built end-to-end pipeline: image capture → AI classification → real-time price comparison',
      'Integrated product lookup APIs and dynamic web scraping for live pricing data',
      'Designed React frontend with TikTok-style swipe UI for comparing products',
    ],
    tech: 'React · Python · FastAPI · Google Cloud Vision · BeautifulSoup',
    impact: 'Won TikTok Hackathon 2024; demoed to 200+ attendees with live product scan.',
    videoUrl: 'https://www.youtube.com/embed/cj87lIUYVZQ?autoplay=1&loop=1&playlist=cj87lIUYVZQ&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/TikTokJam',
  },
  {
    title: 'DUI Risk Radar',
    what: 'Interactive heatmap web app visualizing DUI hotspots across El Paso using real incident data.',
    did: [
      'Parsed + cleaned city DUI incident datasets and normalized geo coordinates',
      'Built a Google Maps heatmap overlay with real-time filter controls (time, severity)',
      'Designed a Flask API backend serving GeoJSON polygons for risk zone rendering',
    ],
    tech: 'React · Flask · Google Maps API · Pandas · GeoJSON',
    impact: '2nd Place at BorderHacks 2024; data-driven tool for public safety awareness.',
    videoUrl: 'https://www.youtube.com/embed/j8vquDaPgc8?autoplay=1&loop=1&playlist=j8vquDaPgc8&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/DUI',
  },
  {
    title: 'Fight Coach',
    what: 'Real-time pose analysis tool for combat sports using computer vision and skeletal tracking.',
    did: [
      'Extracted 2D skeletal keypoints from video using MediaPipe Pose',
      'Built punch/kick classification model from keypoint sequences using a custom LSTM',
      'Designed feedback overlay showing technique corrections in real time',
    ],
    tech: 'Python · MediaPipe · TensorFlow · OpenCV · NumPy',
    impact: '1st Place — The Biggest AI Hackathon @ UTEP 2025.',
    videoUrl: 'https://www.youtube.com/embed/_qpvr-0M2Ec?autoplay=1&loop=1&playlist=_qpvr-0M2Ec&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/Fight-coach',
  },
  {
    title: 'ASL Interpreter',
    what: 'Real-time American Sign Language classifier for live video using edge-optimized ML.',
    did: [
      'Built custom dataset of ASL hand-sign sequences using MediaPipe landmark extraction',
      'Trained LSTM classifier on keypoint time-series data; optimized for edge deployment',
      'Developed visual debug overlay + Colab demo for NSF AI-EDGE research presentation',
    ],
    tech: 'Python · MediaPipe · LSTM · TensorFlow Lite · Colab',
    impact: 'Deployed as part of NSF/OSU AI-EDGE research initiative; achieved 91% test accuracy.',
    videoUrl: 'https://www.youtube.com/embed/yWli0SsIAIU?autoplay=1&loop=1&playlist=yWli0SsIAIU&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/Fight-coach',
  },
];

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentProject = projects[currentProjectIndex];

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 90000); // 90 seconds per project

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="projects-wrapper">
      <BubbleTransition />

      <div className="background-container">
        {/* TV Container */}
        <div className="tv-container">
          <div className="tv-screen-area">
            {currentProject.imageUrl ? (
              // Static image for non-video projects
              <img
                className="demo-image"
                src={currentProject.imageUrl}
                alt={currentProject.title}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <iframe
                className="demo-video"
                src={currentProject.videoUrl}
                title={currentProject.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Now Playing popup — shows structured bullet info */}
        <div className="now-playing-popup">
          <h2>{currentProject.title}</h2>

          <div className="project-bullets">
            <div className="bullet-row">
              <span className="bullet-label">What</span>
              <span className="bullet-text">{currentProject.what}</span>
            </div>

            <div className="bullet-row">
              <span className="bullet-label">Did</span>
              <ul className="bullet-list">
                {currentProject.did.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bullet-row">
              <span className="bullet-label">Tech</span>
              <span className="bullet-text tech-text">{currentProject.tech}</span>
            </div>

            <div className="bullet-row">
              <span className="bullet-label">Impact</span>
              <span className="bullet-text">{currentProject.impact}</span>
            </div>
          </div>

          <div className="project-links">
            {currentProject.githubLink && (
              <a href={currentProject.githubLink} target="_blank" rel="noreferrer">
                View on GitHub →
              </a>
            )}
            {currentProject.externalLink && (
              <a href={currentProject.externalLink.href} target="_blank" rel="noreferrer">
                {currentProject.externalLink.label} →
              </a>
            )}
          </div>
        </div>

        {/* TV Controls */}
        <div className="tv-controls">
          <button className="tv-btn prev-btn" onClick={prevProject} aria-label="Previous project">
            ◀
          </button>
          <button className="tv-btn play-pause-btn" onClick={toggleAutoPlay} aria-label={isAutoPlaying ? 'Pause' : 'Play'}>
            {isAutoPlaying ? '⏸' : '▶'}
          </button>
          <div className="project-indicator">
            {currentProjectIndex + 1} / {projects.length}
          </div>
          <button className="tv-btn next-btn" onClick={nextProject} aria-label="Next project">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
