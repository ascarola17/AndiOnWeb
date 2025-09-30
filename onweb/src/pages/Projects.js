import React, { useState, useEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects = [
    {
      title: 'Snap Market',
      description: 'SnapMarket is a cutting-edge web application designed to streamline product identification and comparison using advanced AI and web technologies.',
      videoUrl: 'https://www.youtube.com/embed/cj87lIUYVZQ?autoplay=1&loop=1&playlist=cj87lIUYVZQ&controls=0&showinfo=0&rel=0',
      githubLink: 'https://github.com/ascarola17/TikTokJam',
    },
    {
      title: 'DUI Risk Radar',
      description: 'DUI Risk Heatmap is a web application designed to visualize DUI risk areas using a heatmap overlay on a Google Map. ',
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
    }
  ];

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

  // Auto-cycling effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 90000); // Change project every 90 seconds to let videos play completely

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  return (
    <div className="projects-wrapper">
      <BubbleTransition />

      <div className="background-container">
        {/* TV Container - relative positioned */}
        <div className="tv-container">
          {/* TV Screen Area - positioned relative to TV image */}
          <div 
            className="tv-screen-area"
          >
            {currentProject.isLocalVideo ? (
              <video
                className="demo-video"
                src={currentProject.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                className="demo-video"
                src={currentProject.videoUrl}
                title={currentProject.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* Always visible Now Playing popup */}
        <div className="now-playing-popup">
          <h2>{currentProject.title}</h2>
          <p>{currentProject.description}</p>
          <a
            href={currentProject.githubLink}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub →
          </a>
        </div>

        {/* TV Controls */}
        <div className="tv-controls">
          <button className="tv-btn prev-btn" onClick={prevProject}>
            ◀
          </button>
          <button className="tv-btn play-pause-btn" onClick={toggleAutoPlay}>
            {isAutoPlaying ? '⏸' : '▶'}
          </button>
          <div className="project-indicator">
            {currentProjectIndex + 1} / {projects.length}
          </div>
          <button className="tv-btn next-btn" onClick={nextProject}>
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
