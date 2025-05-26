// pages/QualitySize.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './QualitySize.css';

const QualitySize = () => {
  const compositions = [
    '100% Cashmere Products',
    'Silk Based Cashmere any combination',
    '80% Cashmere and 20% Silk Products',
    '70% Cashmere and 30% Silk Products',
    '50% Cashmere and 50% Silk Products'
  ];

  const sizeChart = [
    { size: '30 x 150', item: 'Scarf' },
    { size: '45 x 180', item: 'Scarf' },
    { size: '55 x 180', item: 'Stole' },
    { size: '70 x 180', item: 'Stole' },
    { size: '90 x 200', item: 'Shawl' },
    { size: '130 x 270', item: 'Blanket' }
  ];

  return (
    <motion.div
      className="quality-size"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="quality-hero">
        <div className="container">
          <motion.div
            className="quality-hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Quality & Size</h1>
            <p>Premium Cashmere Compositions and Available Sizes</p>
          </motion.div>
        </div>
      </section>

      {/* Compositions Section */}
      <section className="compositions-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Quality Compositions</h2>
          </motion.div>

          <div className="compositions-list">
            {compositions.map((composition, index) => (
              <motion.div
                key={index}
                className="composition-item"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="bullet">•</span>
                <span>{composition}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="color-info"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>
              <strong>Color:</strong> We can customize the colours as desired by the customers or 
              You can choose the colors from our list of colors. Please <Link to="/colors" className="color-link">click on Color</Link> to 
              go to color chart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Size Chart Section */}
      <section className="size-chart-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Available Sizes</h2>
            <p>
              Sizes: We offer the following sizes for our valued customers. 
              If you have any special sizes of your requirement we take order of your special sizes as well.
            </p>
          </motion.div>

          <motion.div
            className="size-table"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <table>
              <thead>
                <tr>
                  <th>Size in cm</th>
                  <th>Item Name</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="size-cell">{item.size}</td>
                    <td className="item-cell">{item.item}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            className="custom-size-note"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            We also manufacture the custom sizes as per your requirement.
          </motion.p>
        </div>
      </section>

      {/* Note Section */}
      <section className="note-section">
        <div className="container">
          <motion.div
            className="note-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Note:</h3>
            <p>
              All of our shawls and stoles items have 4 inch long hand twisted fringes. 
              We can customize the knotted fringe size according to your requirement. 
              We export our Cashmere product directly at a very reasonable price.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cashmere Info Section */}
      <section className="cashmere-info-section">
        <div className="container">
          <motion.div
            className="cashmere-info-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Cashmere Info</h2>
            <p>
              Fine quality pure cashmere is a rare and most precious natural fiber. 
              Is the diamond fiber extricated from the body of a herricos capra mountain Goat 
              (Chyangra) of peak of Himalaya. Its lightness, warmth and gentle caressing touch 
              makes cashmere one of life's ultimate pleasures. Fabulous quality of cashmere 
              products offer unparalleled elegance and comfort being luxurious, sensuous and 
              fashionable as well as making a durable and practical investment. Cashmere products 
              are very popular human being.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default QualitySize;