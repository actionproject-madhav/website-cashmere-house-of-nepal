// pages/Colors.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Colors.css';
import {useNavigate} from 'react-router-dom';
import ContactUs from './ContactUs';


const Colors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();


  // Color codes - Add more NPC codes here as needed
  const colorCodes = [
    'NPC-1-L', 'NPC-2', 'NPC-4', 'NPC-6', 'NPC-7', 'NPC-9', 'NPC-10', 'NPC-11',
    'NPC-11-D', 'NPC-12', 'NPC-13', 'NPC-14', 'NPC-15', 'NPC-16', 'NPC-17',
    'NPC-18-LL', 'NPC-18-L', 'NPC-18', 'NPC-19', 'NPC-20', 'NPC-21', 'NPC-24',
    'NPC-25', 'NPC-26', 'NPC-27', 'NPC-28-L', 'NPC-28', 'NPC-30', 'NPC-31',
    'NPC-31-D', 'NPC-32-LL', 'NPC-32-L', 'NPC-32', 'NPC-33-D', 'NPC-34', 'NPC-35',
    'NPC-36', 'NPC-37', 'NPC-38', 'NPC-39', 'NPC-40', 'NPC-41', 'NPC-42', 'NPC-42-D',
    'NPC-43-L', 'NPC-43', 'NPC-44', 'NPC-45', 'NPC-46', 'NPC-47', 'NPC-47-D',
    'NPC-48-LL', 'NPC-48-L', 'NPC-48', 'NPC-49', 'NPC-50', 'NPC-51', 'NPC-52',
    'NPC-53', 'NPC-54', 'NPC-54-D', 'NPC-54-DD', 'NPC-55-LL', 'NPC-55-L', 'NPC-55',
    'NPC-56', 'NPC-57', 'NPC-58', 'NPC-59', 'NPC-60', 'NPC-61', 'NPC-62', 'NPC-62_D',
    'NPC-67', 'NPC-68', 'NPC-69', 'NPC-70', 'NPC-70-D', 'NPC-70-DD', 'NPC-71-LL',
    'NPC-71-L', 'NPC-71', 'NPC-72', 'NPC-73-L', 'NPC-73', 'NPC-74', 'NPC-75',
    'NPC-76', 'NPC-77', 'NPC-78', 'NPC-79-L', 'NPC-79', 'NPC-80', 'NPC-81', 'NPC-82',
    'NPC-83', 'NPC-84', 'NPC-91-LL', 'NPC-91-L', 'NPC-91', 'NPC-92', 'NPC-93',
    'NPC-94', 'NPC-95', 'NPC-96', 'NPC-97', 'NPC-98', 'NPC-99', 'NPC-100',
    'NPC-100-D', 'NPC-101-LL', 'NPC-101-L', 'NPC-102', 'NPC-103', 'NPC-104',
    'NPC-105', 'NPC-109-LL', 'NPC-109-L', 'NPC-109', 'NPC-110', 'NPC-111',
    'NPC-112-D', 'NPC-113', 'NPC-118', 'NPC-119', 'NPC-120', 'NPC-120-D', 'NPC-121',
    'NPC-122', 'NPC-123', 'NPC-124', 'NPC-125', 'NPC-126', 'NPC-127', 'NPC-128',
    'NPC-129', 'NPC-130', 'NPC-131', 'NPC-132-L', 'NPC-132', 'NPC-133', 'NPC-134',
    'NPC-134-D', 'NPC-142', 'NPC-146', 'NPC-147', 'NPC-149', 'NPC-150', 'NPC-151',
    'NPC-152', 'NPC-153-L', 'NPC-153', 'NPC-154', 'NPC-155', 'NPC-156', 'NPC-157-LL',
    'NPC-157-L', 'NPC-157', 'NPC-158', 'NPC-158-D', 'NPC-190', 'NPC-191', 'NPC-192',
    'NPC-193', 'NPC-194', 'NPC-195', 'NPC-196', 'NPC-201', 'NPC-202', 'NPC-202-D',
    'NPC-203', 'NPC-209', 'NPC-210', 'NPC-215-LL', 'NPC-215', 'NPC-216', 'NPC-217',
    'NPC-218', 'NPC-218-D', 'NPC-219', 'NPC-220', 'NPC-221', 'NPC-222', 'NPC-224',
    'NPC-225', 'NPC-225-D', 'NPC-226-LL', 'NPC-226-L', 'NPC-226', 'NPC-227',
    'NPC228', 'NPC-229', 'NPC-230', 'NPC-231', 'NPC-232', 'NPC-233', 'NPC-234-L',
    'NPC-234', 'NPC-235', 'NPC-240-L', 'NPC-240', 'NPC-241', 'NPC-242', 'NPC-242-D',
    'NPC-245', 'NPC-246', 'NPC-247', 'NPC-248', 'NPC-249', 'NPC-250', 'NPC-251',
    'NPC-252', 'NPC-252-D', 'NPC-253', 'NPC-290', 'NPC-291', 'NPC-292', 'NPC-293',
    'NPC-294', 'NPC-332-LL', 'NPC-332-L', 'NPC-332', 'NPC-332-D', 'NPC-348-LL',
    'NPC-348-L', 'NPC-348', 'NPC-349', 'NPC-350', 'NPC-351', 'NPC-352', 'NPC-392',
    'NPC-393', 'NPC-394', 'NPC-394-D', 'NPC-395', 'NPC-401', 'NPC-402', 'NPC-403',
    'NPC-404', 'NPC-405', 'NPC-406'
  ];
  

  // Get image URL for color code
  const getColorImageUrl = (code) => {
    // Extract number from NPC code (handles NPC-1-L, NPC-11-D, etc.)
    const match = code.match(/NPC-(\d+)/);
    if (match) {
      const number = match[1];
      return `https://cashmerehouseofnepal.com/images/co${number}.jpg`;
    }
    return '/products/color-placeholder.jpg';
  };

  // Filter colors based on search
  const filteredColors = colorCodes.filter(code =>
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openColorModal = (code) => {
    setSelectedColor(code);
  };

  const closeColorModal = () => {
    setSelectedColor(null);
  };

  return (
    <motion.div
      className="colors-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="colors-hero">
        <div className="container">
          <motion.div
            className="colors-hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1  style={{ color: 'var(--accent-gold)' }} >Our Color Collection</h1>
            <p>Explore our extensive range of beautiful cashmere colors</p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="colors-search">
        <div className="container">
          <motion.div
            className="search-container"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="search-box">
              <input
                type="text"
                placeholder="Search colors by code (e.g., NPC-14, NPC-1-L)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
            <div className="color-count">
              {filteredColors.length} colors available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Colors Grid Section */}
      <section className="colors-grid-section">
        <div className="container">
          <motion.div
            className="colors-matrix"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence>
              {filteredColors.map((code, index) => (
                <motion.div
                  key={code}
                  className="color-box"
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => openColorModal(code)}
                >
                  <div className="color-image">
                    <img 
                      src={getColorImageUrl(code)} 
                      alt={`Color ${code}`}
                      onError={(e) => {
                        e.target.src = '/products/color-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="color-code">{code}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredColors.length === 0 && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No colors found</h3>
              <p>Try searching with a different color code</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Color Modal */}
      <AnimatePresence>
        {selectedColor && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeColorModal}
          >
            <motion.div
              className="color-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeColorModal}>
                ×
              </button>
              <div className="modal-content">
                <div className="modal-color-image">
                  <img 
                    src={getColorImageUrl(selectedColor)} 
                    alt={`Color ${selectedColor}`}
                    onError={(e) => {
                      e.target.src = '/products/color-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="modal-color-info">
                  <h2>{selectedColor}</h2>
                  <div className="color-details">
                    <div className="detail-row">
                      <span className="label">Color Code:</span>
                      <span className="value">{selectedColor}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Available For:</span>
                      <span className="value">All Products</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Composition:</span>
                      <span className="value">Pure Cashmere & Blends</span>
                    </div>
                  </div>
                  
                  <div className="color-description">
                    <h3>About This Color</h3>
                    <p>
                      This beautiful color from our premium collection is achieved through 
                      careful dyeing of cashmere and silk yarns before weaving, ensuring 
                      vibrant, long-lasting colors that won't fade over time.
                    </p>
                  </div>

                  <div className="modal-actions">
                    <motion.button
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contact')}
                    >
                      Request Sample
                    </motion.button>
                    <motion.button
                      className="btn btn-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contact')}

                    >
                      Use in Product
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Color Section */}
      <section className="custom-color-section">
        <div className="container">
          <motion.div
            className="custom-color-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="custom-color-text">
              <h2>Custom Colors Available</h2>
              <p>
                Don't see the perfect color? We can create custom colors to match 
                your specific requirements using our traditional dyeing techniques.
              </p>
              <ul className="custom-features">
                <li>Pantone color matching</li>
                <li>Custom color development</li>
                <li>Sample swatches provided</li>
                <li>Minimum quantities apply</li>
              </ul>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Custom Color
              </motion.button>
            </div>
            <div className="custom-color-image">
              <img src="/nehicus/0B5A0625.jpg" alt="Custom Color Process" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Note */}
      <section className="color-note-section">
        <div className="container">
          <motion.div
            className="color-note"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>📝 Important Note</h3>
            <p>
              <strong>Color Variations:</strong> Colors may appear slightly different 
              on various screens and devices. We recommend requesting a physical sample 
              for accurate color matching. All yarns are dyed before weaving for optimal 
              color saturation and longevity.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Colors;