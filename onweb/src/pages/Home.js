import React from 'react';
import { useNavigate } from 'react-router-dom';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/Home.css';
import background from '../images/bm.png';
import andiCharacter from '../images/AndiBob.png';
import karenCharacter from '../images/Karen.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <img src={background} alt="Bikini Bottom Background" className="bg-img" />
      <BubbleTransition textId="homeText" delay={3000} />

      <main>
        <div className="home-text hidden-text" id="homeText">
          <h1 className="home-title">
            Hi, I'm <span className="name-highlight">Andi!</span>
          </h1>
          <p className="home-subtitle">Somewhere between a Git commit and Goo Lagoon...</p>
          <button className="home-button" onClick={() => navigate('/about')}>
            Dive In!
          </button>
        </div>

      <img className="home-character" src={andiCharacter} alt="Andi - character" />
      <img className="karen-img" src={karenCharacter} alt="Karen from SpongeBob" />

      </main>
    </div>
  );
};

export default Home;
