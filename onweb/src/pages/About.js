import React, { useEffect, useRef, useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import LazyImage from '../components/LazyImage';
import '../styles/About.css';
import aboutBackgroundPng from '../images/about.png';
import meImage from '../images/Me.png';
import keckImage from '../images/keck.JPG';
import keckPeopleImage from '../images/keck-people.jpg';
import gymImage from '../images/Gym.png';
import climbImage from '../images/Climb.jpg';
import funnyGymImage from '../images/FunnyGym.JPG';
import friendsImage from '../images/Friends.JPG';
import laserTagImage from '../images/LaserTag.JPG';
import pinballImage from '../images/Pinball.JPG';
import fiveKImage from '../images/5k.JPG';

const publicUrl = process.env.PUBLIC_URL || '';
const resumePdfUrl = `${publicUrl}/AndiScarola_Resume.pdf`;
const aboutWebp = (stem) => `${publicUrl}/images/${stem}.webp`;

const CAROUSEL_SLIDES = [
  {
    stem: 'climb',
    src: climbImage,
    alt: 'Rock Climbing',
    caption: "Sandy's Rock Wall",
    photoClass: 'climbing-photo',
  },
  {
    stem: 'funnygym',
    src: funnyGymImage,
    alt: 'Funny Gym',
    caption: 'Gym Shenanigans',
    photoClass: 'funny-gym-photo',
  },
  {
    stem: 'friends',
    src: friendsImage,
    alt: 'Friends',
    caption: 'Bikini Bottom Friends',
    photoClass: 'friends-photo',
  },
  {
    stem: 'lasertag',
    src: laserTagImage,
    alt: 'Laser Tag',
    caption: 'Jellyfish Fields',
    photoClass: 'laser-tag-photo',
  },
  {
    stem: 'pinball',
    src: pinballImage,
    alt: 'Pinball',
    caption: 'Goo Lagoon Arcade',
    photoClass: 'pinball-photo',
  },
  {
    stem: '5k',
    src: fiveKImage,
    alt: '5K Run',
    caption: 'Goo Lagoon 5K',
    photoClass: 'fivek-photo',
  },
];

const About = () => {
  const [aboutBgLoaded, setAboutBgLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselContainerRef = useRef(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('[data-carousel-track-index]');
    if (!slides.length) return;

    const pickBest = () => {
      const cR = container.getBoundingClientRect();
      let bestLogical = 0;
      let bestOverlap = -1;
      slides.forEach((el) => {
        const logical = Number(el.dataset.carouselTrackIndex) % CAROUSEL_SLIDES.length;
        const r = el.getBoundingClientRect();
        const w = Math.max(0, Math.min(r.right, cR.right) - Math.max(r.left, cR.left));
        const h = Math.max(0, Math.min(r.bottom, cR.bottom) - Math.max(r.top, cR.top));
        const overlap = w * h;
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestLogical = logical;
        }
      });
      if (bestOverlap > 0) setCurrentSlide(bestLogical);
    };

    const observer = new IntersectionObserver(pickBest, {
      root: container,
      threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    });
    slides.forEach((el) => observer.observe(el));
    pickBest();
    const id = window.setInterval(pickBest, 250);
    return () => {
      window.clearInterval(id);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="about-container">
      <BubbleTransition textId="aboutText" delay={3000} />

      <img
        className="about-bg-img"
        src={`${publicUrl}/images/about.webp`}
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setAboutBgLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = aboutBackgroundPng;
          setAboutBgLoaded(true);
        }}
        style={{
          opacity: aboutBgLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      />
      
      {/* Clean & Sleek About Me Section */}
      
      {/* About Me and My Why Side by Side */}
      <div className="fade-in-section">
        <div className="about-why-row reveal hidden-text" id="aboutText">
          <div className="about-card">
            <div className="card-header">
              <h1>About Me</h1>
              <div className="card-subtitle">CS Student @ UTEP </div>
            </div>
            <div className="card-content">
              <p>Pursuing B.S. in Computer Science with a minor in Math, Fast-Track to M.S. in Software Engineering. Future PHD student.</p>
              <div className="card-subtitle">Researcher @ Keck Center</div>
              <p>Software dev working on everything, from flow rate sensors to fiber detection... I make machines smarter, one dataset at a time.</p>
              <div className="card-subtitle">Always Building + Always Moving</div>
              <p>Whether it's full-stack apps, AI pipelines, or taking on a new PR at the gym, I bring the same energy to every challenge.</p>
            </div>
          </div>
          
          <div className="my-why-section">
            <h3>Why?</h3>
            <div className="my-why-content">
              <p>I've always been that person who wants to know why something works — and then make it work better. I've Messed with tech since I was a kid, broke stuff just to fix it. Now I get to build things that actually help people, like systems that measure real-world flow, or tools that make sense of messy sensor data.</p>
            </div>
            
            {/* Sticky Polaroid with Me image */}
            <div className="me-polaroid">
              <div className="me-photo-placeholder">
                <LazyImage
                  webpSrc={aboutWebp('me')}
                  src={meImage}
                  alt="Andi Danielle Scarola"
                  className="me-image"
                />
              </div>
              <p className="me-caption">Andi Danielle Scarola</p>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section - Standalone */}
      <div className="fade-in-section">
        <div className="education-standalone reveal">
          <div className="education-section">
            <h3>Education</h3>
            <div className="education-content">
              <p>• B.S. in Computer Science — UTEP</p>
              <p>• Minor in Mathematics</p>
              <p>• Fast Track M.S. in Software Engineering</p>
              <p>• GPA: 3.39</p>
            </div>
          </div>
        </div>
      </div>

      {/* Research Papers with Keck Photo */}
      <div className="fade-in-section">
        <div className="content-row reveal">
          <div className="photo-item polaroid">
            <div className="photo-placeholder keck-photo">
              <LazyImage
                webpSrc={aboutWebp('keck')}
                src={keckImage}
                alt="Keck Center Building"
              />
            </div>
            <p className="photo-caption">The Keck</p>
          </div>
          
          <div className="text-content">
            <div className="research-papers-section">
              <h3>Research Papers</h3>
              <div className="papers-list">
                <div className="paper-item">
                  <h4>Learning designs that empower: navigating sandbox data science at the intersection of computing, big data and social media</h4>
                  <p>Information and Learning Sciences • 2024 • Cited by 5</p>
                </div>
                <div className="paper-item">
                  <h4>Data and social worlds: How data science education supports civic participation and social discourse</h4>
                  <p>Proceedings of the International Society of the Learning Sciences • 2024 • Cited by 6</p>
                </div>
                <div className="paper-item">
                  <h4>Cultural Relevance for Epistemic Practice in High School Computational Data Mining</h4>
                  <p>IEEE Frontiers in Education • 2024 • Cited by 1</p>
                </div>
              </div>
              <div className="scholar-link">
                <a 
                  href="https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q=Andi+Scarola&btnG=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="scholar-button"
                >
                  View All Papers on Google Scholar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Alternating Layout - Photo Left, Text Right */}
      <div className="fade-in-section">
        <div className="content-row reveal">
          <div className="photo-item polaroid">
            <div className="photo-placeholder keck-people-photo">
              <LazyImage
                webpSrc={aboutWebp('keck-people')}
                src={keckPeopleImage}
                alt="Keck People"
              />
            </div>
            <p className="photo-caption">Keck's Finest</p>
          </div>
          
          <div className="text-content">
            <div className="research-section">
              <h3>Research & Experience</h3>
              <h4 className="research-subtitle">W.M Keck Center for 3D Innovation</h4>
              <div className="research-content">
                <div className="research-item">
                 
                  <p>– Developed calibration pages and control logic for hot-wire and pitot probe data acquisition systems</p>
                  <p>– Built real-time Flask dashboards for streaming sensor data and motor control</p>
                  <p>– Managed database integration, CSV logging, and multi-probe configuration across 3 web platforms</p>
                  <p>– Currently working on fiber segmentation pipelines: tiling, stitching, and angle analysis from SEM images</p>
                </div>
                <div className="research-item">
                  <h4>AI-EDGE (NSF/OSU)</h4>
                  <p>– Built a real-time ASL interpreter using MediaPipe + LSTM for edge deployment</p>
                  <p>– Developed custom datasets and visual tools to evaluate live sign classification</p>
                  <p>– Led development of custom datasets, visualizations, and Colab demos for edge-device ML research</p>
                </div>
                <div className="research-item">
                  <h4>Hackathons</h4>
                  <p>– Fight Coach (The Biggest AI Hackathon @ UTEP - 2025)</p>
                  <p>– DUI Risk Radar (2nd @ BorderHacks - 2024)</p>
                  <p>– SnapMarket (Tik-Tok Hackathon - 2024)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Goals & Fun Stuff with Photo */}
      <div className="fade-in-section">
        <div className="content-row reverse reveal">
          <div className="text-content">
            <div className="goals-fun-side-by-side">
              <div className="goals-section">
                <h3>Goals</h3>
                <div className="goals-content">
                  <p>• Earn a PhD in Computer Science</p>
                  <p>• Become a Software Engineer</p>
                  <p>• Build tools that bridge research + real-world use</p>
                  <p>• Stay consistent in health, climbing, and learning</p>
                </div>
              </div>
              
              <div className="fun-section">
              <h3>Life outside the shell</h3>
              <div className="fun-content">
                <p>Rock walls, pickleball courts, and the gym that’s where I yearn to be. When I’m not building, I’m moving.</p>
                <p>Motto: Not everything has to be perfect to be real.</p>
              </div>
              </div>
            </div>
          </div>
          
          <div className="photo-item polaroid">
            <div className="photo-placeholder gym-photo">
              <LazyImage
                webpSrc={aboutWebp('gym')}
                src={gymImage}
                alt="Gym Workout"
              />
            </div>
            <p className="photo-caption">My Happy Place</p>
          </div>
        </div>
      </div>

      {/* Photo Carousel */}
      <div className="fade-in-section">
        <div className="photo-carousel reveal">
          <div className="carousel-title-container">
            <h3 className="carousel-title">What’s Been Brewing</h3>
          </div>
          <div className="carousel-container" ref={carouselContainerRef}>
            <div className="carousel-track">
              {[0, 1].flatMap((setIdx) =>
                CAROUSEL_SLIDES.map((slide, i) => {
                  const index = setIdx * CAROUSEL_SLIDES.length + i;
                  return (
                    <div
                      key={`carousel-${setIdx}-${slide.stem}`}
                      className="carousel-slide"
                      data-carousel-track-index={index}
                    >
                      <div className="photo-item polaroid">
                        <div className={`photo-placeholder ${slide.photoClass}`}>
                          <LazyImage
                            webpSrc={aboutWebp(slide.stem)}
                            src={slide.src}
                            alt={slide.alt}
                            loading={
                              index % CAROUSEL_SLIDES.length === currentSlide
                                ? 'eager'
                                : 'lazy'
                            }
                            fetchPriority={
                              index % CAROUSEL_SLIDES.length === currentSlide
                                ? 'high'
                                : 'auto'
                            }
                          />
                        </div>
                        <p className="photo-caption">{slide.caption}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Resume Section */}
      <div className="fade-in-section">
        <div className="resume-section reveal">
          <div className="resume-container">
            <h3 className="resume-title">My Resume</h3>
            <div className="resume-preview">
              <iframe 
                src={`${resumePdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="resume-iframe"
                title="Resume Preview"
              />
            </div>
            <div className="resume-actions">
              <a 
                href={resumePdfUrl} 
                download="AndiScarola_Resume.pdf"
                className="download-button"
              >
                Download Resume
              </a>
              <a 
                href={resumePdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-button"
              >
                View Full Size
              </a>
            </div>
            <p className="resume-contact-note" role="note">
              📧 Email &amp; phone available upon request
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
