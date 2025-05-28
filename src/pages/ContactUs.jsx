// pages/ContactUs.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    productInterest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form data being sent:', formData);
      
      // Updated to use your Render backend URL
      const response = await fetch('https://website-cashmere-house-of-nepal.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
  
      const result = await response.json();
      console.log('Response data:', result);
  
      if (response.ok && result.success) {
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          productInterest: ''
        });
      } else {
        setSubmitMessage(result.message || 'There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Error details:', error.message);
      setSubmitMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const contactInfo = [
    {
      icon: '',
      title: 'Visit Our Workshop',
      details: [
        'Cashmere House of Nepal',
        'Bhagwati Marg',
        'Kathmandu, Nepal'
      ]
    },
    {
      icon: '',
      title: 'Call Us',
      details: [
        'Phone: +977 9851030301'
      ]
    },
    {
      icon: '',
      title: 'Email Us',
      details: [
        'chofnepal@gmail.com',
        'nepalsachin1@gmail.com'
      ]
    },
    {
      icon: '',
      title: 'Website',
      details: [
        'www.cashmerehouseofnepal.com'
      ]
    }
  ];

  const productInterests = [
    'Shawls',
    'Scarves', 
    'Stoles',
    'Blankets',
    'Sweaters',
    'Custom Products',
    'Bulk Orders',
    'Other'
  ];

  const faqData = [
    {
      question: 'What is your minimum order quantity?',
      answer: 'We welcome both small and large orders. For individual pieces, there is no minimum. For wholesale orders, we typically require a minimum of 30 pieces per design. You can choose between any 5 colors. Please contact us to discuss your specific requirements.'
    },
    {
      question: 'Do you offer custom colors and sizes?',
      answer: 'Absolutely! We specialize in customization. We can create products in any color you desire and manufacture custom sizes according to your specifications. We also accept completely custom design requests.'
    },
    {
      question: 'What is your typical lead time for orders?',
      answer: 'Lead times vary depending on order size and customization level. Standard items: 1-2 weeks. Custom colors: 2-3 weeks. Custom designs: 3-4 weeks. Large wholesale orders: 4-6 weeks. We always provide accurate timelines when you place your order.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide! We have extensive experience with international shipping and handle all export documentation. Shipping costs and delivery times vary by destination. We can arrange door-to-door delivery to most countries.'
    },
    {
      question: 'Can I request product samples?',
      answer: 'Yes! We encourage customers to request samples to experience our quality firsthand. We can provide small fabric swatches for free, or sample products at cost. Contact us with your specific sample requirements.'
    },
    {
      question: 'What quality certifications do you have?',
      answer: 'We maintain strict quality standards and ethical sourcing practices. Our products are made from 100% authentic cashmere, and we can provide quality certifications and origin documentation upon request.'
    },
    {
      question: 'How do I care for cashmere products?',
      answer: 'Hand wash in cold water with mild detergent, lay flat to dry away from direct sunlight. Store folded in breathable cotton bags. Use a cashmere comb to remove any pilling. With proper care, our cashmere products will last for decades.'
    },
    {
      question: 'Do you offer wholesale pricing?',
      answer: 'Yes, we offer competitive wholesale pricing for bulk orders. Discounts increase with order quantity. We also offer special pricing for retailers, boutiques, and regular customers. Contact us for a customized quote.'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
    { name: 'WhatsApp', icon: 'whatsapp', url: '#' }
  ];

  const getSocialIcon = (platform) => {
    const icons = {
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      whatsapp: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
        </svg>
      )
    };
    return icons[platform] || null;
  };

  return (
    <motion.div
      className="contact-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: 'var(--accent-gold)' }}>Get In Touch</h1>
            <p>Ready to experience the finest cashmere? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-section-box">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productInterest">Product Interest</label>
                      <select
                        id="productInterest"
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a product</option>
                        {productInterests.map((product, index) => (
                          <option key={index} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  {submitMessage && (
                    <motion.div
                      className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="contact-info-container"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-section-box">
                <h2>Contact Information</h2>
                <div className="contact-cards">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="contact-card"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="contact-icon">{info.icon}</div>
                      <div className="contact-details">
                        <h3>{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media */}
                <motion.div
                  className="social-section"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="social-link"
                        title={social.name}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {getSocialIcon(social.icon)}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions about our products and services</p>
          </motion.div>

          <div className="faq-container">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <motion.span 
                    className="faq-toggle"
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </div>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="map-container"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Visit Our Workshop</h2>
            <div className="map-placeholder">
              <img src="/contact/location.png" alt="Map to Cashmere House of Nepal" />
              <div className="map-overlay">
                <div className="map-info">
                  <h3> Cashmere House of Nepal</h3>
                  <p>Bhagawati Marg, Kathmandu 44600</p>
                  <motion.button 
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = 'https://maps.app.goo.gl/EMsyGgdSC6h4o3ro6'}
                  >
                    Get Directions
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactUs;