import React from 'react';
import '../styles/Home.css'; // Import the Home.css file
import background from '../images/bikini-bottom.png';

const Home = () => {
  return (
<div
  className="home-wrapper"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#FFD700', // SpongeBob yellow
    textAlign: 'center',
    padding: '0 20px',
  }}
>
  <h1 style={{ fontSize: '3rem', margin: 0 }}>Hi, I'm Andi!</h1>
  <p style={{ fontSize: '1.2rem', color: 'blue', marginBottom: '20px' }}>
Somewhere between a Git commit and Goo Lagoon.  </p>
  <button
    onClick={() => alert('Dive into my projects!')}
    style={{
      backgroundColor: '#FFFF00',
      border: '2px solid black',
      padding: '10px 20px',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
    }}
  >
    Dive In!
  </button>
</div>

  );
};

export default Home;
