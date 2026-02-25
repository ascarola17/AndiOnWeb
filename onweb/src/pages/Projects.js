import React, { useState, useEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import karenTVImage from '../images/ProjectsKaren.png';

const projects = [
  {
    title: 'Snap Market',
    description: 'SnapMarket is a cutting-edge web application designed to streamline product identification and comparison using advanced AI and web technologies.',
    videoUrl: 'https://www.youtube.com/embed/cj87lIUYVZQ?autoplay=1&loop=1&playlist=cj87lIUYVZQ&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/TikTokJam',
  },
  {
    title: 'DUI Risk Radar',
    description: 'DUI Risk Heatmap is a web application designed to visualize DUI risk areas using a heatmap overlay on a Google Map.',
    videoUrl: 'https://www.youtube.com/embed/j8vquDaPgc8?autoplay=1&loop=1&playlist=j8vquDaPgc8&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/DUI',
  },
  {
    title: 'Fight Coach',
    description: 'Developed a real-time pose analysis tool for combat sports using MediaPipe to extract 2D skeletal keypoints from recorded fight videos.',
    videoUrl: 'https://www.youtube.com/embed/_qpvr-0M2Ec?autoplay=1&loop=1&playlist=_qpvr-0M2Ec&controls=0&showinfo=0&rel=0',
    githubLink: 'https://github.com/ascarola17/Fight-coach',
  },
  {
    title: 'ASL Interpreter',
    description: 'Developed a real-time interpreter using pose estimation and MediaPipe for live ASL classification.',
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
    }, 90000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="projects-wrapper">
      <BubbleTransition />

      <div className="background-container">
        {/*
          TV Container — position: relative so the screen area can be
          absolutely positioned on top of the TV image (overlay approach).
          The <img> sets the container's natural dimensions, making
          percentage-based screen positioning reliable across all viewports.
        */}
        <div className="tv-container">
          <img
            className="tv-image"
            src={karenTVImage}
            alt=""
            aria-hidden="true"
          />
          {/* Screen overlay — sits inside the TV image like a real screen */}
          <div className="tv-screen-area">
            <iframe
              className="demo-video"
              src={currentProject.videoUrl}
              title={currentProject.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Now Playing popup */}
        <div className="now-playing-popup">
          <h2>{currentProject.title}</h2>
          <p>{currentProject.description}</p>
          <a href={currentProject.githubLink} target="_blank" rel="noreferrer">
            View on GitHub →
          </a>
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
