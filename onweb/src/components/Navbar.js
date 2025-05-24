import React from 'react';
import { Link } from 'react-router-dom'; // To handle routing in the app
import '../styles/Navbar.css'; // Import the CSS file for navbar styling

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>Andi on the Web</h2>
      </div>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/about">About</Link>
        <Link className="navbar-link" to="/projects">Projects</Link>
        <Link className="navbar-link" to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
