import React, { useEffect } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import '../styles/About.css'; 

const About = () => {
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
  return (
    <div className="about-container">
      <BubbleTransition textId="aboutText" delay={3000} />
      
      {/* About Background Image */}
      <div className="about-background"></div>
      
      {/* Clean & Sleek About Me Section */}
      
      {/* About Me and My Why Side by Side */}
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
              <img 
                src={require('../images/Me.png')} 
                alt="Andi Danielle Scarola"
              />
            </div>
            <p className="me-caption">Andi Danielle Scarola</p>
          </div>
        </div>
      </div>

      {/* Education Section - Standalone */}
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

      {/* Research Papers with Keck Photo */}
      <div className="content-row reveal">
        <div className="photo-item polaroid">
          <div className="photo-placeholder keck-photo">
            <img src={require('../images/keck.JPG')} alt="Keck Center Building" />
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


      {/* Alternating Layout - Photo Left, Text Right */}
      <div className="content-row reveal">
        <div className="photo-item polaroid">
          <div className="photo-placeholder keck-people-photo">
            <img src={require('../images/keck-people.jpg')} alt="Keck People" />
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

      {/* Combined Goals & Fun Stuff with Photo */}
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
            <img src={require('../images/Gym.png')} alt="Gym Workout" />
          </div>
          <p className="photo-caption">My Happy Place</p>
        </div>
      </div>

      {/* Photo Carousel */}
      <div className="photo-carousel reveal">
        <div className="carousel-title-container">
          <h3 className="carousel-title">What’s Been Brewing</h3>
        </div>
        <div className="carousel-container">
          <div className="carousel-track">
            {/* First set of photos */}
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder climbing-photo">
                  <img src={require('../images/Climb.jpg')} alt="Rock Climbing" />
                </div>
                <p className="photo-caption">Sandy's Rock Wall</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder funny-gym-photo">
                  <img src={require('../images/FunnyGym.JPG')} alt="Funny Gym" />
                </div>
                <p className="photo-caption">Gym Shenanigans</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder friends-photo">
                  <img src={require('../images/Friends.JPG')} alt="Friends" />
                </div>
                <p className="photo-caption">Bikini Bottom Friends</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder laser-tag-photo">
                  <img src={require('../images/LaserTag.JPG')} alt="Laser Tag" />
                </div>
                <p className="photo-caption">Jellyfish Fields</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder pinball-photo">
                  <img src={require('../images/Pinball.JPG')} alt="Pinball" />
                </div>
                <p className="photo-caption">Goo Lagoon Arcade</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder fivek-photo">
                  <img src={require('../images/5k.JPG')} alt="5K Run" />
                </div>
                <p className="photo-caption">Goo Lagoon 5K</p>
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder climbing-photo">
                  <img src={require('../images/Climb.jpg')} alt="Rock Climbing" />
                </div>
                <p className="photo-caption">Sandy's Rock Wall</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder funny-gym-photo">
                  <img src={require('../images/FunnyGym.JPG')} alt="Funny Gym" />
                </div>
                <p className="photo-caption">Gym Shenanigans</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder friends-photo">
                  <img src={require('../images/Friends.JPG')} alt="Friends" />
                </div>
                <p className="photo-caption">Bikini Bottom Friends</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder laser-tag-photo">
                  <img src={require('../images/LaserTag.JPG')} alt="Laser Tag" />
                </div>
                <p className="photo-caption">Jellyfish Fields</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder pinball-photo">
                  <img src={require('../images/Pinball.JPG')} alt="Pinball" />
                </div>
                <p className="photo-caption">Goo Lagoon Arcade</p>
              </div>
            </div>
            
            <div className="carousel-slide">
              <div className="photo-item polaroid">
                <div className="photo-placeholder fivek-photo">
                  <img src={require('../images/5k.JPG')} alt="5K Run" />
                </div>
                <p className="photo-caption">Goo Lagoon 5K</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Resume Section */}
      <div className="resume-section reveal">
        <div className="resume-container">
          <h3 className="resume-title">My Resume</h3>
          <div className="resume-preview">
            <iframe 
              src="/AndiScarola_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="resume-iframe"
              title="Resume Preview"
            />
          </div>
          <div className="resume-actions">
            <a 
              href="/AndiScarola_Resume.pdf" 
              download="AndiScarola_Resume.pdf"
              className="download-button"
            >
              Download Resume
            </a>
            <a 
              href="/AndiScarola_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-button"
            >
              View Full Size
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
