import React, { useEffect, useRef, useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import LazyImage from '../components/LazyImage';
import '../styles/About.css';
import aboutBackgroundPng from '../images/about.png';
import keckImage from '../images/keck.JPG';
import keckPeopleImage from '../images/keck-people.jpg';
import gymImage from '../images/Gym.png';

import fiveKImage from '../images/5k.JPG';
import funnyGymImage from '../images/FunnyGym.JPG';
import mePortraitImage from '../images/Me.png';
import pinballImage from '../images/Pinball.JPG';
import climbImage from '../images/Climb.jpg';
import dogImage from '../images/Dog.png';
import andiCatImage from '../images/Andi&Cat.PNG';

import afterLadyGagaConcert from '../images/afterladygagaconcert.jpeg';
import bigFam from '../images/bigfam.jpeg';
import daisyTheDog from '../images/daisythedog.jpeg';
import delicious from '../images/delicious.jpeg';
import family from '../images/family.jpeg';
import golfWithFriends from '../images/golfwithfriends.jpeg';
import gradSoon from '../images/gradsoon.jpeg';
import halloween from '../images/halloween.jpeg';
import jonAndDrone from '../images/jonanddrone.jpeg';
import legos from '../images/legos.jpeg';
import lockedIn from '../images/lockedin.jpeg';
import meAndCousin from '../images/meandcousin.jpeg';
import meAndFriend from '../images/meandfriend.jpeg';
import meAndJonPitch from '../images/meandjonpitch.jpeg';
import puttPutt from '../images/puttputt.jpeg';
import redBull from '../images/redbull.jpeg';
import rockClimb from '../images/rockclimb.jpeg';
import shopping from '../images/shopping.jpeg';
import sillyEyeDoctor from '../images/sillyeyedoctor.jpeg';
import snowboarding from '../images/snowboarding.jpeg';
import swag from '../images/swag.jpeg';
import vipLadyGaga from '../images/vipladygaga.jpeg';
import workingOnDrone from '../images/workingondrone.jpeg';

const publicUrl = process.env.PUBLIC_URL || '';
const resumePdfUrl = `${publicUrl}/AndiScarola_Resume.pdf`;
const aboutWebp = (stem) => `${publicUrl}/images/${stem}.webp`;

/** Desktop-only subtle 3D tilt (CSS vars --tilt-x / --tilt-y); touch devices skip in handler. */
function AboutCardTilt({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 6).toFixed(4)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 6).toFixed(4)}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={ref}
      className={['about-tilt-host', className].filter(Boolean).join(' ')}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

const RESEARCH_PAPERS = [
  {
    title:
      'Learning designs that empower: navigating sandbox data science at the intersection of computing, big data and social media',
    meta: 'Information and Learning Sciences • 2024 • Cited by 5',
  },
  {
    title:
      'Data and social worlds: How data science education supports civic participation and social discourse',
    meta: 'Proceedings of the International Society for the Learning Sciences • 2024 • Cited by 6',
  },
  {
    title: 'Cultural Relevance for Epistemic Practice in High School Computational Data Mining',
    meta: 'IEEE Frontiers in Education • 2024 • Cited by 1',
  },
];

const WHY_CARDS = [
  {
    title: 'Ship It Sandy-Style 💪',
    body: "I like turning ideas into real systems. Whether it's a computer vision pipeline or a full-stack app, I care about shipping things that actually do something.",
  },
  {
    title: 'All-In on the AI Deep End 🤖',
    body: "Recently switched my master's focus to AI. Machine learning, automation, and intelligent systems are where I spend most of my energy right now.",
  },
  {
    title: 'Keck Lab, Real Hardware Energy 🔧',
    body: "I've done research through UTEP and the Keck Center on real engineering problems — the kind where the code has to actually work, not just run.",
  },
  {
    title: 'SpongeBob Vibes on Purpose 🧽',
    body: "I take my work seriously but I'm not trying to sound like a robot. The SpongeBob portfolio is intentional. Ambition with personality.",
  },
];

/** Original carousel order, then newer life photos (WebP stem = public/images/{stem}.webp). */
const CAROUSEL_SLIDES = [
  {
    stem: '5k',
    src: fiveKImage,
    caption: 'Goo Lagoon 5K',
    photoClass: 'fivek-photo carousel-life-photo',
  },
  {
    stem: 'funnygym',
    src: funnyGymImage,
    caption: 'Gym Shenanigans',
    photoClass: 'funny-gym-photo',
  },
  {
    stem: 'pinball',
    src: pinballImage,
    caption: 'Goo Lagoon Arcade',
    photoClass: 'pinball-photo',
  },
  {
    stem: 'climb',
    src: climbImage,
    caption: "Sandy's Rock Wall",
    photoClass: 'climbing-photo',
  },
  {
    stem: 'dog',
    src: dogImage,
    caption: 'Gary-approved land pup 🐕',
    photoClass: 'dog-photo',
  },
  {
    stem: 'andicat',
    src: andiCatImage,
    caption: 'Gary-level co-star energy 🐌',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'afterladygagaconcert',
    src: afterLadyGagaConcert,
    caption: 'Back from a Bubble Bowl-tier encore 🎤',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'bigfam',
    src: bigFam,
    caption: 'The whole Krusty Krew (family edition) 👨‍👩‍👧‍👦',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'daisythedog',
    src: daisyTheDog,
    caption: "Daisy's giving pure Snail Park vibes 🐶",
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'delicious',
    src: delicious,
    caption: 'Almost as good as a Krabby Patty 🍽️',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'family',
    src: family,
    caption: 'Found my Bikini Bottom crew 🌊',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'golfwithfriends',
    src: golfWithFriends,
    caption: 'Fairway practice for the anchor toss ⛳',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'gradsoon',
    src: gradSoon,
    caption: 'Krabby Patty degree loading… 🎓',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'halloween',
    src: halloween,
    caption: 'Spookier than the Hash-Slinging Slasher 🎃',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'jonanddrone',
    src: jonAndDrone,
    caption: 'Drone patrol over Jellyfish Fields 🛸',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'legos',
    src: legos,
    caption: "Brick-by-brick like Patrick's house 🧱",
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'lockedin',
    src: lockedIn,
    caption: 'Locked in like Sandy before a science fair 🔒',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'meandcousin',
    src: meAndCousin,
    caption: 'Bonus neighbors from beyond Conch Street 👯',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'meandfriend',
    src: meAndFriend,
    caption: 'Bubble buddies for life 🫧',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'meandjonpitch',
    src: meAndJonPitch,
    caption: 'Pitching hotter than a fresh Krabby Patty 📣',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'puttputt',
    src: puttPutt,
    caption: 'Mini-golf at Jellyfish Fields (basically) ⛳',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'redbull',
    src: redBull,
    caption: 'Fueled up for another double shift 🥤',
    photoClass: 'carousel-life-photo',
    className: 'redbull-slide',
  },
  {
    stem: 'rockclimb',
    src: rockClimb,
    caption: 'Scaling walls like the Alaskan Bull Worm 🧗',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'shopping',
    src: shopping,
    caption: "Barg'N-Mart sweep 🛍️",
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'sillyeyedoctor',
    src: sillyEyeDoctor,
    caption: 'Eye exam? Still jellyfishing in spirit 👀',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'snowboarding',
    src: snowboarding,
    caption: 'Goo Lagoon could never 🏂',
    photoClass: 'carousel-life-photo',
  },
  { stem: 'swag', src: swag, caption: 'Squilliam who? 😎', photoClass: 'carousel-life-photo' },
  {
    stem: 'vipladygaga',
    src: vipLadyGaga,
    caption: 'VIP at the Bubble Bowl 🌟',
    photoClass: 'carousel-life-photo',
  },
  {
    stem: 'workingondrone',
    src: workingOnDrone,
    caption: 'Plankton wishes he had this rig 🛠️',
    photoClass: 'carousel-life-photo',
  },
].map((s) => ({ ...s, alt: s.caption }));

const About = () => {
  const [aboutBgLoaded, setAboutBgLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselContainerRef = useRef(null);
  const carouselCount = CAROUSEL_SLIDES.length;

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
        const logical = Number(el.dataset.carouselTrackIndex) % carouselCount;
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
  }, [carouselCount]);

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
          <div className="about-intro-columns">
            <div className="about-intro-left">
              <div className="about-card">
                <div className="card-header">
                  <h1>About Me</h1>
                  <div className="card-subtitle">CS Student @ UTEP 🎓</div>
                </div>
                <div className="card-content">
                  <p>
                    CS student at UTEP, recently went all-in on AI for my master&apos;s.
                  </p>
                  <div className="card-subtitle">Research Meets Real Code 💻</div>
                  <p>
                    I build things that sit at the edge of research and real software —
                    computer vision, intelligent systems, and tools that actually work.
                  </p>
                </div>
              </div>
              <div className="me-polaroid-outside">
                <div className="me-polaroid">
                  <div className="me-photo-placeholder">
                    <LazyImage
                      webpSrc={aboutWebp('me')}
                      src={mePortraitImage}
                      alt="Andi Danielle Scarola"
                      className="me-image"
                    />
                  </div>
                  <p className="me-caption">Andi Danielle Scarola</p>
                </div>
              </div>
            </div>
            <div className="about-intro-right">
              <div className="my-why-section">
                <h3>Why?</h3>
                <div className="why-story-cards">
                  {WHY_CARDS.map((card, idx) => (
                    <div key={`why-card-${idx}`} className="why-story-card">
                      <h4 className="why-story-card-title">{card.title}</h4>
                      <p className="why-story-card-body">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Carousel — between intro/Why and Education/Keck */}
      <div className="fade-in-section">
        <div className="photo-carousel reveal">
          <div className="carousel-title-row">
            <div className="carousel-title-container">
              <h3 className="carousel-title">What’s Been Brewing</h3>
            </div>
            <div
              className="carousel-scroll-cue"
              role="note"
              aria-label="More below — keep scrolling the page"
            >
              <span className="carousel-scroll-cue-arrow" aria-hidden="true">
                ↓
              </span>
              <span className="carousel-scroll-cue-label">Keep scrolling</span>
            </div>
          </div>
          <div className="carousel-container" ref={carouselContainerRef}>
            <div className="carousel-track">
              {[0, 1].flatMap((setIdx) =>
                CAROUSEL_SLIDES.map((slide, i) => {
                  const index = setIdx * CAROUSEL_SLIDES.length + i;
                  return (
                    <div
                      key={`carousel-${setIdx}-${slide.stem}`}
                      className={['carousel-slide', slide.className].filter(Boolean).join(' ')}
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

      {/* Left: Education + Research Papers stacked; right: Keck polaroid spans full left height */}
      <div className="fade-in-section">
        <div className="education-research-keck-row">
          <div className="education-research-keck-columns reveal">
            <div className="education-research-keck-left">
              <div className="education-standalone">
                <div className="education-section">
                  <h3>Education</h3>
                  <div className="education-content">
                    <p>• B.S. in Computer Science — UTEP</p>
                    <p>• Minor in Mathematics</p>
                    <p>• Fast Track M.S. in Artificial Intelligence</p>
                    <p>• GPA: 3.39</p>
                  </div>
                </div>
              </div>
              <div className="research-papers-section">
                <div className="research-papers-inner">
                  <h3>Research Papers</h3>
                  <div className="papers-list">
                    {RESEARCH_PAPERS.map((paper) => (
                      <AboutCardTilt key={paper.title} className="about-tilt-host--paper">
                        <div className="paper-item">
                          <h4>{paper.title}</h4>
                          <p>{paper.meta}</p>
                        </div>
                      </AboutCardTilt>
                    ))}
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
            <div className="education-research-keck-right">
              <div className="photo-item polaroid education-research-keck-polaroid">
                <div className="photo-placeholder keck-photo">
                  <img
                    src={keckImage}
                    alt="Keck Center Building"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="photo-caption">The Keck</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 2×2 grid: Real | AI / Build | Photo */}
      <div className="fade-in-section">
        <div className="content-row content-row--research-experience">
          <div className="research-grid-outer">
            <div className="research-grid">
              <div className="research-grid-cell">
                <AboutCardTilt>
                  <div className="research-section research-section--real-systems">
                  <h3>Real Systems</h3>
                  <p className="research-pillar-tagline">Systems that run in the real world</p>
                  <div className="research-content">
                    <div className="research-item">
                      <h4 className="research-subtitle">W.M Keck Center for 3D Innovation</h4>
                      <p>Developed calibration workflows and control logic for hot-wire and pitot probe data acquisition</p>
                      <p>Built real-time Flask dashboards for live sensor streaming and motor control</p>
                      <p>Integrated databases, CSV pipelines, and multi-probe configurations across multiple web platforms</p>
                      <p>
                        Currently working on a computer vision pipeline for fiber segmentation: tiling large SEM images,
                        stitching outputs, and extracting orientation + angle metrics
                      </p>
                    </div>
                  </div>
                  </div>
                </AboutCardTilt>
              </div>

              <div className="research-grid-cell">
                <AboutCardTilt>
                  <div className="research-section research-section--ai-cv">
                  <h3>AI / Computer Vision</h3>
                  <p className="research-pillar-tagline">AI that actually works live</p>
                  <div className="research-content">
                    <div className="research-item">
                      <h4>AI-EDGE (NSF / OSU)</h4>
                      <p>Built a real-time ASL interpreter using MediaPipe + LSTM designed for edge deployment</p>
                      <p>Created custom datasets and evaluation tools to test live sign classification performance</p>
                      <p>Designed visualizations and Colab demos to make edge ML systems easier to understand and showcase</p>
                    </div>
                  </div>
                  </div>
                </AboutCardTilt>
              </div>

              <div className="research-grid-cell">
                <AboutCardTilt>
                  <div className="research-section research-section--build-ship">
                  <h3>Build / Ship</h3>
                  <p className="research-pillar-tagline">Ideas shipped fast</p>
                  <div className="research-content">
                    <div className="research-item">
                      <p>
                        I love the push to ship — hackathon sprints, fast prototypes, and that startup-y energy when a small
                        team actually moves.
                      </p>
                      <h4>Hackathons</h4>
                      <p>
                        Fight Coach — Biggest AI Hackathon @ UTEP (2025)
                        <br />
                        Built a real-time system focused on feedback and interaction
                      </p>
                      <p>
                        DUI Risk Radar — 2nd Place @ BorderHacks (2024)
                        <br />
                        Developed a system to assess and visualize driving risk in real time
                      </p>
                      <p>
                        SnapMarket — TikTok Hackathon (2024)
                        <br />
                        Built a rapid prototype around social-driven marketplace concepts
                      </p>
                    </div>
                  </div>
                  </div>
                </AboutCardTilt>
              </div>

              <div className="research-grid-cell research-grid-cell--photo">
                <div className="photo-item polaroid">
                  <div className="photo-placeholder keck-people-photo">
                    <img
                      src={keckPeopleImage}
                      alt="Keck People"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="photo-caption">Keck's Finest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Goals & Fun Stuff with Photo */}
      <div className="fade-in-section">
        <div className="content-row reverse">
          <div className="content-left">
            <div className="goals-fun-stack">
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
          <div className="content-right">
            <div className="photo-item polaroid">
              <div className="photo-placeholder gym-photo">
                <img
                  src={gymImage}
                  alt="My Happy Place"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="photo-caption">My Happy Place</p>
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
