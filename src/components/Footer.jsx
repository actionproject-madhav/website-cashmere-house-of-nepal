// components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Quality & Size', path: '/quality-size' },
    { name: 'Colors', path: '/colors' },
    { name: 'Contact', path: '/contact' }
  ];

  const products = [
    'Cashmere Shawls',
    'Cashmere Scarves',
    'Cashmere Stoles',
    'Cashmere Blankets',
    'Cashmere Sweaters',
    'Custom Products'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      const response = await fetch('https://website-cashmere-house-of-nepal.onrender.com/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubscribeMessage('Successfully subscribed to our newsletter!');
        setEmail('');
      } else {
        setSubscribeMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeMessage('Unable to connect to server. Please try again later.');
    } finally {
      setIsSubscribing(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubscribeMessage(''), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <motion.div
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="nav-logo">
              <div className="logo-placeholder">
                <img 
                  src="/logo.png" 
                  alt="Cashmere House of Nepal" 
                  className="logo-image"
                />
                <div className="logo-text">
                  <span className="logo-main">Cashmere House</span>
                  <span className="logo-sub">of Nepal</span>
                </div>
              </div>
            </Link>
            <p className="footer-description">
              Leading manufacturer and exporter of premium cashmere products from Nepal. 
              Since 1995, we've been crafting the world's finest cashmere with traditional 
              techniques and modern quality standards.
            </p>
            <div className="footer-motto">
              <h4>Our Motto: 100% Customer Satisfaction</h4>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Our Products</h3>
            <ul className="footer-links">
              {products.map((product, index) => (
                <li key={index}>
                  <Link to="/catalogue" className="footer-link">
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <p>Cashmere House of Nepal</p>
                  <p>Bhagwati Marg</p>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <p>Phone: +977 9851030301</p>
                  <p></p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <p>chofnepal@gmail.com</p>
                  <p>nepalsachin1@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon"></span>
                <div>
                  <p>www.cashmerehouseofnepal.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="newsletter-section"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="newsletter-content">
            <h3>Stay Connected</h3>
            <p>Subscribe to our newsletter for updates on new products and special offers</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button 
                type="submit"
                className="btn btn-primary newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
            {subscribeMessage && (
              <motion.p 
                className={`subscribe-message ${subscribeMessage.includes('Successfully') ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {subscribeMessage}
              </motion.p>
            )}
          </div>
          
          {/* Social Links */}
         
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          viewport={{ once: true }}
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;