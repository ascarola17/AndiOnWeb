import React, { useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import ProjectBg from '../images/Bp.png';

const Projects = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="projects-wrapper">
      <BubbleTransition />

      <div className="background-container">
        {/* Background image */}
        {/* <img src={ProjectBg} className="bg-img" alt="Projects Background" /> */}

        {/* Video with overlayed project info */}
        <div
          className="tv-screen"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Project info at top */}
          {hovered && (
            <div className="project-info top-info">
              <h2>AI Punch Tracker</h2>
              <p>Uses pose estimation to detect real-time punches and training metrics.</p>
              <a
                href="https://github.com/andiscarola/punch-tracker"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          )}

          {/* YouTube video */}
          <div className="video-border">
            <div className="video-wrapper">
              <iframe
                className="demo-video"
                src="https://www.youtube.com/embed/cj87lIUYVZQ?autoplay=1&mute=1&loop=1&playlist=cj87lIUYVZQ"
                title="AI Punch Tracker"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
