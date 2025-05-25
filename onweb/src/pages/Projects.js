import React from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Projects.css';
import ProjectBg from '../images/bm.png';

const Projects = () => {
  return (
    <div className="projects-wrapper">
      <img src={ProjectBg} className="bg-img" alt="Projects Background" />
      <BubbleTransition />
      <main id="pageText" className="hidden-text">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">Tech from Bikini Bottom</p>
        {/* Project cards or links here */}
      </main>
    </div>
  );
};

export default Projects;
