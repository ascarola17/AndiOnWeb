import React, { useEffect, useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

// EmailJS Configuration - inline to avoid import issues
const emailjsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_5zg27zn',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_4el6x7q',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'mvEpq-J2jXkAoInYf'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Andi',
        reply_to: formData.email
      };

      // Send email using EmailJS
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      setIsSubmitted(true);
      setIsLoading(false);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        message: error.message
      });

      let errorMessage = 'Failed to send message. Please try again or contact me directly.';

      if (error.status === 400) {
        errorMessage = 'Invalid configuration. Please check your EmailJS setup.';
      } else if (error.status === 401) {
        errorMessage = 'Authentication failed. Please check your EmailJS keys.';
      } else if (error.status === 403) {
        errorMessage = 'Access denied. Please check your EmailJS permissions.';
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <BubbleTransition textId="contactText" delay={3000} />

      <div className="contact-background" />

      <div className="contact-main">
        <div className="contact-notebook-page reveal hidden-text" id="contactText">
          <span className="contact-washi contact-washi--left" aria-hidden="true" />
          <span className="contact-washi contact-washi--right" aria-hidden="true" />

          <div className="contact-postage-stamp" aria-hidden="true">
            <span className="contact-postage-inner">REPLY</span>
          </div>

          <div className="contact-doodle" aria-hidden="true">
            <svg viewBox="0 0 88 100" width="72" height="82" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="44" cy="28" rx="32" ry="22" fill="rgba(180, 220, 255, 0.55)" stroke="#1a1a1a" strokeWidth="2" />
              <ellipse cx="44" cy="30" rx="18" ry="12" fill="rgba(255, 255, 255, 0.5)" />
              <path d="M28 48 Q36 72 44 92 Q52 72 60 48" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
              <path d="M36 50 Q40 68 42 88" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d="M52 50 Q48 68 46 88" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <circle cx="38" cy="26" r="3" fill="#1a1a1a" />
              <circle cx="50" cy="26" r="3" fill="#1a1a1a" />
            </svg>
          </div>

          <div className="contact-form-container">
            <header className="form-header">
              <h2 className="form-header-title">Drop a note in a bottle</h2>
              <p className="form-header-sub">I&apos;ll fish it out and write back.</p>
            </header>

            {isSubmitted ? (
              <div className="success-message">
                <h3>Message sent! 🎉</h3>
                <p>Thanks for reaching out — talk soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="name-fields">
                  <div className="form-group">
                    <label htmlFor="contact-first" className="contact-sr-only">First name</label>
                    <input
                      id="contact-first"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name here…"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-last" className="contact-sr-only">Last name</label>
                    <input
                      id="contact-last"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="…and the rest?"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="contact-sr-only">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Where can I reach you?"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="contact-sr-only">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="What&apos;s on your mind?"
                  />
                </div>

                {error && (
                  <div className="error-message" role="alert">
                    <span className="error-icon" aria-hidden="true">⚠️</span>
                    {error}
                  </div>
                )}

                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send it!'}
                </button>
              </form>
            )}
          </div>

          <section className="contact-info contact-info--scrapbook" aria-label="Social and other contact options">
            <h3>I&apos;m also floating around on…</h3>
            <p className="contact-direct-hint">
              <span className="contact-direct-label">Email:</span> Available upon request
              <br />
              <span className="contact-direct-label">Phone:</span> Available upon request
            </p>
            <div className="contact-methods">
              <a
                href="https://www.linkedin.com/in/andi-scarola/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method contact-method--sticker contact-method--sticker-a"
              >
                <span className="method-icon" aria-hidden="true">💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/ascarola17"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method contact-method--sticker contact-method--sticker-b"
              >
                <span className="method-icon" aria-hidden="true">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
