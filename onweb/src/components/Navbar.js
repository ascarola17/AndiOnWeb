import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">Andi on the Web</span>
        </div>
        
        <div className="navbar-links">
          <Link 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`} 
            to="/"
            onClick={closeMobileMenu}
          >
            <span className="link-text">Home</span>
            <span className="link-underline"></span>
          </Link>
          <Link 
            className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`} 
            to="/about"
            onClick={closeMobileMenu}
          >
            <span className="link-text">About</span>
            <span className="link-underline"></span>
          </Link>
          <Link 
            className={`navbar-link ${location.pathname === '/projects' ? 'active' : ''}`} 
            to="/projects"
            onClick={closeMobileMenu}
          >
            <span className="link-text">Projects</span>
            <span className="link-underline"></span>
          </Link>
          <Link 
            className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`} 
            to="/contact"
            onClick={closeMobileMenu}
          >
            <span className="link-text">Contact</span>
            <span className="link-underline"></span>
          </Link>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link 
          className={`mobile-link ${location.pathname === '/' ? 'active' : ''}`} 
          to="/"
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <Link 
          className={`mobile-link ${location.pathname === '/about' ? 'active' : ''}`} 
          to="/about"
          onClick={closeMobileMenu}
        >
          About
        </Link>
        <Link 
          className={`mobile-link ${location.pathname === '/projects' ? 'active' : ''}`} 
          to="/projects"
          onClick={closeMobileMenu}
        >
          Projects
        </Link>
        <Link 
          className={`mobile-link ${location.pathname === '/contact' ? 'active' : ''}`} 
          to="/contact"
          onClick={closeMobileMenu}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
