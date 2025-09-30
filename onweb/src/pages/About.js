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
            <p>Pursuing B.S. in Computer Science with a minor in Math, Fast-Track to M.S. in Software Engineering.</p>
            <p><strong>Researcher @ Keck Center</strong></p>
            <p>Sole software dev on multiple Raspberry Pi–based DAQ systems for fluid diagnostics research. I design full-stack web platforms, real-time data pipelines, and calibration tools.</p>
            <p><strong>Always Building + Always Moving</strong></p>
            <p>Whether it's full-stack apps, AI pipelines, or just climbing harder routes at the gym, I bring the same energy to every challenge.</p>
          </div>
        </div>
        
        <div className="my-why-section">
          <h3>💥 My Why</h3>
          <div className="my-why-content">
            <p>Growing up, I was always the one fixing things, debugging everything from old phones to relationships. Tech became a way for me to build something mine — to create order out of chaos. Research gave it purpose. And now? I'm all in on using engineering to push boundaries and help others do the same.</p>
          </div>
        </div>
      </div>

      {/* Combined Education & Skills with Photo */}
      <div className="content-row reveal">
        <div className="photo-item polaroid">
          <div className="photo-placeholder keck-photo">
            <img src={require('../images/keck.JPG')} alt="Keck Center Building" />
          </div>
          <p className="photo-caption">Chum Bucket Lab</p>
        </div>
        
        <div className="text-content">
          <div className="education-skills-container">
            <div className="education-section">
              <h3>Education</h3>
              <div className="education-content">
                <p>• B.S. in Computer Science — UTEP</p>
                <p>• Minor in Mathematics</p>
                <p>• Fast Track M.S. in Software Engineering</p>
                <p>• GPA: 3.39</p>
              </div>
            </div>
            
            <div className="skills-section">
              <h3>🧰 Skills</h3>
              <div className="skills-grid">
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">SQLite</span>
                <span className="skill-tag">System Design</span>
                <span className="skill-tag">Debugging</span>
              </div>
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
          <p className="photo-caption">Bikini Bottom Crew</p>
        </div>
        
        <div className="text-content">
          <div className="research-section">
            <h3>Research & Experience</h3>
            <h4 className="research-subtitle">W.M Keck Center for 3D Innovation</h4>
            <div className="research-content">
              <div className="research-item">
               
                <p>– Flask-powered sensor interfaces for hot-wire & pitot airflow tools</p>
                <p>– Fiber segmentation using DeepLabV3+ + SAM</p>
                <p>– Wrote Python data pipelines, web UIs, and Raspberry Pi control logic</p>
              </div>
              <div className="research-item">
                <h4>AI-EDGE (NSF/OSU)</h4>
                <p>– Built real-time ASL interpreter with MediaPipe + LSTM</p>
                <p>– GPT-2 Shakespeare model improved by 4%</p>
              </div>
              <div className="research-item">
                <h4>Hackathons</h4>
                <p>– DUI Risk Radar (2nd @ BorderHacks)</p>
                <p>– SnapMarket AI price matcher</p>
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
              <h3>🎯 Goals</h3>
              <div className="goals-content">
                <p>• Earn a PhD in CS or Engineering</p>
                <p>• Become a Full-Stack Lead or Embedded Systems Engineer</p>
                <p>• Build tools that bridge research + real-world use</p>
                <p>• Stay consistent in health, climbing, and learning</p>
              </div>
            </div>
            
            <div className="fun-section">
              <h3>💥 Fun Stuff</h3>
              <div className="fun-content">
                <p>Loves: Rock Climbing 🧗, Pickleball 🏓, Lifting 🏋️, Tinkering with Raspberry Pi</p>
                <p>Motto: "Somewhere between a Git commit and Goo Lagoon…"</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="photo-item polaroid">
          <div className="photo-placeholder gym-photo">
            <img src={require('../images/Gym.png')} alt="Gym Workout" />
          </div>
          <p className="photo-caption">Larry's Gym</p>
        </div>
      </div>

      {/* Photo Carousel */}
      <div className="photo-carousel reveal">
        <div className="carousel-title-container">
          <h3 className="carousel-title">More Adventures in Bikini Bottom</h3>
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
