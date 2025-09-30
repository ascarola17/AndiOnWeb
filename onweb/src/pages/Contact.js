import React, { useEffect, useState } from 'react';
import BubbleTransition from '../components/BubbleTransition';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs-config';
import '../styles/Contact.css';

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
        process.env.REACT_APP_EMAILJS_SERVICE_ID || emailjsConfig.serviceId, 
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || emailjsConfig.templateId, 
        templateParams, 
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || emailjsConfig.publicKey
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
      setError('Failed to send message. Please try again or contact me directly.');
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <BubbleTransition textId="contactText" delay={3000} />
      
      {/* Contact Background Image */}
      <div className="contact-background"></div>
      
      {/* Main Content */}
      <div className="main-content reveal hidden-text" id="contactText">
        <div className="contact-form-container">
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Drop me a line!</p>
          </div>
          
          {isSubmitted ? (
            <div className="success-message">
              <h3>Message Sent! 🎉</h3>
              <p>Thanks for reaching out!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="name-fields">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="First Name"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email Address"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
              
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="contact-info reveal">
        <h3>Other Ways to Reach Me</h3>
        <div className="contact-methods">
          <a 
            href="https://www.linkedin.com/in/andi-scarola/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-method"
          >
            <span className="method-icon">💼</span>
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/ascarola17" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-method"
          >
            <span className="method-icon">🐙</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
