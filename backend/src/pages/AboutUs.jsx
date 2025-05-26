// pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

const About = () => {
  return (
    <motion.div
      className="about-us"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About Us</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="content-section">
        <div className="container">
          <motion.div
            className="content-text"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>
              Founded in 1995, Cashmere House of Nepal was established with the mission to revive and celebrate the rich heritage of cashmere craftsmanship. With a deep respect for ancient artisanal techniques, we bring a fresh perspective to timeless designs, offering high-quality handmade cashmere products to the global market.
            </p>
            
            <p>
              We specialize in exclusive, handcrafted cashmere items, including blankets, shawls, stoles, scarves, and sweaters. Every piece is carefully dyed using premium cashmere and silk yarns before weaving, ensuring vibrant colors and long-lasting quality.
            </p>
            
            <p>
              At Cashmere House of Nepal, we are committed to delivering 100% customer satisfaction and setting the standard in luxurious, sustainable fashion.
            </p>

            <h2>What Makes Our Cashmere Special</h2>
            
            <p>
              Pure cashmere is one of the rarest and most precious natural fibers in the world. It is often called the "diamond fiber" and is carefully combed from the undercoat of the Hircus Capra mountain goat, locally known as Chyangra, found in the high Himalayas.
            </p>
            
            <p>
              At Cashmere House of Nepal, what makes our cashmere truly special goes beyond its softness and warmth. Each piece is handmade with love, care, and purpose. Our products are crafted in a small-scale workshop that supports underprivileged artisans, especially women, by offering meaningful work, fair pay, and a safe, respectful environment.
            </p>
            
            <p>
              We are committed to ethical sourcing and responsible labor. Our focus is not only on delivering high-quality products, but also on uplifting communities and caring for the environment.
            </p>
            
            <p>
              When you choose Cashmere House of Nepal, you support craftsmanship, dignity, and sustainability.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;