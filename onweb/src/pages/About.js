import React, { useEffect, useRef, useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import LazyImage from '../components/LazyImage';
import '../styles/About.css';
import '../styles/Scrapbook.css';
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
    meta: 'Information and Learning Sciences • 2024',
  },
  {
    title:
      'Data and social worlds: How data science education supports civic participation and social discourse',
    meta: 'Proceedings of the International Society for the Learning Sciences • 2024',
  },
  {
    title: 'Cultural Relevance for Epistemic Practice in High School Computational Data Mining',
    meta: 'IEEE Frontiers in Education • 2024',
  },
];

const WHY_CARDS = [
  {
    title: 'The Sandy Cheeks department',
    body: 'Research at the Keck Center keeps me close to real engineering problems. There’s a lot to learn when your software has to help someone do their actual work.',
  },
  {
    title: 'In the AI deep end',
    body: 'My graduate studies focus on AI. I get to spend my time asking “Could this work?” and finding out. Sometimes the answer requires another attempt.',
  },
  {
    title: 'A little closer to home',
    body: 'BorderETA comes from a place I know: El Paso and Juárez. I’m working on making crossing information more useful for the people who depend on it.',
  },
  {
    title: 'The jellyfish were my idea',
    body: 'The work gets plenty of serious hours. This corner of the internet gets SpongeBob, questionable puns, and a little room to play.',
  },
];

/** Original carousel order, then newer life photos (WebP stem = public/images/{stem}.webp). */
const PHOTO_DIMENSIONS = {
  '5k': [4536, 8064],
  'funnygym': [1536, 2048],
  'pinball': [1536, 2048],
  'climb': [940, 1312],
  'dog': [3024, 4032],
  'andicat': [1179, 1575],
  'afterladygagaconcert': [1536, 2048],
  'bigfam': [2048, 1786],
  'daisythedog': [1536, 2048],
  'delicious': [1536, 2730],
  'family': [2048, 1536],
  'golfwithfriends': [2048, 1536],
  'gradsoon': [1536, 2048],
  'halloween': [1536, 2048],
  'jonanddrone': [1536, 2048],
  'legos': [1536, 2048],
  'lockedin': [1536, 2048],
  'meandcousin': [2048, 1536],
  'meandfriend': [2048, 1536],
  'meandjonpitch': [2048, 1536],
  'puttputt': [1536, 2048],
  'redbull': [1206, 2144],
  'rockclimb': [1536, 2730],
  'shopping': [1536, 2048],
  'sillyeyedoctor': [1536, 2048],
  'snowboarding': [2048, 1536],
  'swag': [2048, 1536],
  'vipladygaga': [1536, 2048],
  'workingondrone': [1536, 2048],
};

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
].map((s) => ({ ...s, alt: s.caption, width: PHOTO_DIMENSIONS[s.stem][0], height: PHOTO_DIMENSIONS[s.stem][1] }));

const About = () => {
  const [aboutBgLoaded, setAboutBgLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photoDialogRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const carouselCount = CAROUSEL_SLIDES.length;
  const chapterNavRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState('aboutText');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = document.querySelectorAll('.scrapbook-about .carousel-slide, .scrapbook-about .why-story-card, .scrapbook-about .research-grid-cell');
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) entry.target.classList.add('scroll-arrived');
        reveal.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(target => reveal.observe(target));

    let frame = 0;
    const update = () => {
      frame = 0;
      const ids = ['aboutText', 'camera-roll', 'research-notes', 'life-notes'];
      const current = ids.filter(id => document.getElementById(id)?.getBoundingClientRect().top <= 180).pop() || 'aboutText';
      setActiveChapter(current);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      chapterNavRef.current?.style.setProperty('--reading-progress', `${range > 0 ? Math.min(100, window.scrollY / range * 100) : 0}%`);
      if (showAllPhotos && current === 'camera-roll') {
        const photos = [...carouselContainerRef.current.querySelectorAll('.carousel-slide')];
        let nearest = 0;
        let distance = Infinity;
        photos.forEach((photo, index) => {
          const rect = photo.getBoundingClientRect();
          const nextDistance = Math.abs(rect.top + Math.min(rect.height / 2, 200) - window.innerHeight * 0.45);
          if (nextDistance < distance) { distance = nextDistance; nearest = index; }
        });
        setCurrentSlide(nearest);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      reveal.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [showAllPhotos]);

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
    if (!container || showAllPhotos) return;
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
  }, [carouselCount, showAllPhotos]);

  useEffect(() => {
    if (selectedPhoto !== null && !photoDialogRef.current.open) photoDialogRef.current.showModal();
  }, [selectedPhoto]);

  const scrollPhotos = (direction) => {
    const container = carouselContainerRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container?.scrollBy({ left: direction * 300, behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <div className="about-container field-notebook-about scrapbook-about" id="main-content">
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
      
      <div className="field-book-cover">
        <p className="field-book-title">About me.</p>
        <p className="field-book-subtitle">The lab, the border, and life outside the screen.</p>
        <img className="scrapbook-jelly-sticker" src={`${publicUrl}/images/Karen.webp`} alt="" aria-hidden="true" />
      </div>
      <nav className="field-book-tabs reading-chapters" ref={chapterNavRef} aria-label="About page chapters">
        <div className="reading-chapters-inner">
          {[['aboutText', 'Hello'], ['camera-roll', 'Camera roll'], ['research-notes', 'Research'], ['life-notes', 'Life outside the shell']].map(([id, label]) =>
            <a key={id} href={`#${id}`} aria-current={activeChapter === id ? 'location' : undefined}>{label}{id === 'camera-roll' && <span>{carouselCount}</span>}</a>
          )}
        </div>
      </nav>
      <div className="field-book-pages">
      <div className="field-book-binding" aria-hidden="true" />
      <p className="field-page-label">A LITTLE INTRODUCTION</p>
      {/* Original content and every custom photo retained inside the notebook. */}
      
      {/* About Me and My Why Side by Side */}
      <div className="fade-in-section">
        <div className="about-why-row reveal" id="aboutText">
          <div className="about-intro-columns scrapbook-intro">
            <div className="about-intro-left">
              <div className="about-card">
                <div className="card-header">
                  <h1>Hi, I’m Andi.</h1>
                  <div className="card-subtitle">El Paso human. AI graduate student at UTEP.</div>
                </div>
                <div className="card-content">
                  <p>
                    I’m a graduate student studying artificial intelligence at UTEP, doing research at the Keck Center, and building a few things of my own. Somewhere in there, I decided this website needed jellyfish.
                  </p>
                  <div className="card-subtitle">Sandy’s lab energy. My own experiments.</div>
                  <p>
                    I like finding out whether an idea can survive outside my head.
                    Usually that means building it, breaking it, and trying again.
                  </p>
                </div>
              </div>
              <div className="me-polaroid-outside">
                <div className="me-polaroid">
                  <div className="me-photo-placeholder">
                    <LazyImage
                      webpSrc={aboutWebp('me')}
                      src={mePortraitImage}
                      width={1200}
                      height={1600}
                      alt="Andi Danielle Scarola"
                      className="me-image"
                    />
                  </div>
                  <p className="me-caption">Andi Danielle Scarola</p>
                </div>
              </div>
            </div>
            <a className="about-next-chapter" href="#camera-roll">A little more life below <span aria-hidden="true">↓</span></a>
            <div className="about-intro-right">
              <div className="my-why-section">
                <h3>Where my days go</h3>
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
        <div className={`photo-carousel reveal${showAllPhotos ? ' is-gallery-grid' : ''}`} id="camera-roll">
          <p className="field-page-label">THE CAMERA ROLL</p>
          <p className="scrapbook-gallery-note">The people, places, and occasional side quests.</p>
          <div className="carousel-title-row">
            <div className="carousel-title-container">
              <h3 className="carousel-title">What’s Been Brewing</h3>
            </div>
            <div className="field-gallery-controls">
              {showAllPhotos && <span className="gallery-reading-count">{String(currentSlide + 1).padStart(2, '0')} / {carouselCount} photos</span>}
              {!showAllPhotos && <><button type="button" onClick={() => scrollPhotos(-1)} aria-label="Previous photos">←</button><span aria-live="polite">{String(currentSlide + 1).padStart(2, '0')} / {carouselCount}</span><button type="button" onClick={() => scrollPhotos(1)} aria-label="Next photos">→</button></>}
              <button type="button" className="field-gallery-view" aria-expanded={showAllPhotos} aria-controls="field-photo-gallery" onClick={() => setShowAllPhotos(value => !value)}>{showAllPhotos ? 'Switch to photo strip' : `See all ${carouselCount} photos`}</button>
            </div>
          </div>
          <div className="carousel-container" id="field-photo-gallery" ref={carouselContainerRef} tabIndex={showAllPhotos ? -1 : 0} aria-label="Andi’s personal photo gallery">
            <div className="carousel-track">
              {[0].flatMap((setIdx) =>
                CAROUSEL_SLIDES.map((slide, i) => {
                  const index = setIdx * CAROUSEL_SLIDES.length + i;
                  return (
                    <div
                      key={`carousel-${setIdx}-${slide.stem}`}
                      className={['carousel-slide', slide.className].filter(Boolean).join(' ')}
                      data-carousel-track-index={index}
                    >
                      <button type="button" className="photo-item polaroid field-photo-button" onClick={() => setSelectedPhoto(i)} aria-label={`Open photo: ${slide.caption}`}>
                        <div className={`photo-placeholder ${slide.photoClass}`}>
                          <LazyImage
                            webpSrc={aboutWebp(slide.stem)}
                            src={slide.src}
                            alt={slide.alt}
                            width={slide.width}
                            height={slide.height}
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
                        <span className="scrapbook-photo-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <span className="field-photo-expand" aria-hidden="true">↗</span>
                      </button>
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
        <div className="education-research-keck-row" id="research-notes">
          <p className="field-page-label">RESEARCH &amp; EDUCATION</p>
          <div className="education-research-keck-columns reveal">
            <div className="education-research-keck-left">
              <div className="education-standalone">
                <div className="education-section">
                  <h3>Education</h3>
                  <div className="education-content">
                    <p>• B.S. in Computer Science — UTEP</p>
                    <p>• Minor in Mathematics</p>
                    <p>• M.S. in Artificial Intelligence — in progress</p>
                    <p>• GPA: 3.39</p>
                  </div>
                </div>
              </div>
              <div className="research-papers-section">
                <div className="research-papers-inner">
                  <h3>A few things I’ve worked on</h3>
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
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '0', display: 'block' }}
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
                      <p>Developing research software for engineering and additive manufacturing workflows</p>
                      <p>Building tools that help researchers collect and understand experimental data</p>
                      <p>Connecting research questions with useful software</p>
                      <p>
                        Applying computer vision to materials imagery and composite microstructures
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
                      <p>Built an ASL letter-recognition research prototype</p>
                      <p>Evaluated how the prototype performed on live gestures</p>
                      <p>Created demonstrations to communicate the research</p>
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
                      style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '0', display: 'block' }}
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
        <div className="content-row reverse" id="life-notes">
          <div className="content-left">
            <div className="goals-fun-stack">
              <div className="goals-section">
                <h3>Still on the list</h3>
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
                  <p>Rock walls, pickleball courts, and the gym. Apparently sitting at a keyboard all day makes me want to climb something afterward.</p>
                  <p>Current reminder: not everything has to be perfect to be real.</p>
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
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '0', display: 'block' }}
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
      <p className="field-book-signoff">more lore as it develops. — Andi</p>
      </div>
      <dialog className="field-photo-lightbox" ref={photoDialogRef} onClose={() => setSelectedPhoto(null)} onClick={event => { if (event.target === event.currentTarget) photoDialogRef.current.close(); }} onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          setSelectedPhoto(index => (index + (event.key === 'ArrowRight' ? 1 : -1) + carouselCount) % carouselCount);
        }
      }} aria-label="Photo viewer">
        <button className="field-lightbox-close" type="button" onClick={() => photoDialogRef.current.close()} aria-label="Close photo">×</button>
        {selectedPhoto !== null && <><figure><img src={CAROUSEL_SLIDES[selectedPhoto].src} alt={CAROUSEL_SLIDES[selectedPhoto].alt}/><figcaption>{CAROUSEL_SLIDES[selectedPhoto].caption}</figcaption></figure><div className="field-lightbox-controls"><button type="button" onClick={() => setSelectedPhoto(index => (index - 1 + carouselCount) % carouselCount)} aria-label="Previous photo">←</button><span>{selectedPhoto + 1} / {carouselCount}</span><button type="button" onClick={() => setSelectedPhoto(index => (index + 1) % carouselCount)} aria-label="Next photo">→</button></div></>}
      </dialog>
    </div>
  );
};

export default About;
