import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
//import Contact from './pages/Contact';
import Navbar from './components/Navbar'; // Import the Navbar component
import GlobalStyle from './styles/GlobalStyles'; // Global styles

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar /> {/* Display the navbar at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
