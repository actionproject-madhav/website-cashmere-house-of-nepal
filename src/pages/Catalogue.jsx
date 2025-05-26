// pages/Catalogue.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Catalogue.css';

const Catalogue = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // All your images
  const imageFilenames = [
    '0B5A0498', '0B5A0501', '0B5A0507', '0B5A0513', '0B5A0517', '0B5A0531', '0B5A0535', '0B5A0537',
    '0B5A0539', '0B5A0542', '0B5A0547', '0B5A0550', '0B5A0552', '0B5A0557', '0B5A0560', '0B5A0565',
    '0B5A0568', '0B5A0571', '0B5A0575', '0B5A0576', '0B5A0581', '0B5A0586', '0B5A0588', '0B5A0589',
    '0B5A0592', '0B5A0596', '0B5A0598', '0B5A0604', '0B5A0607', '0B5A0608', '0B5A0613', '0B5A0616',
    '0B5A0618', '0B5A0622', '0B5A0625', '0B5A0629', '0B5A0632', '0B5A0637', '0B5A0638', '0B5A0640',
    '0B5A0643', '0B5A0647', '0B5A0650', '0B5A0652', '0B5A0655', '0B5A0657', '0B5A0660', '0B5A0663',
    '0B5A0664', '0B5A0668', '0B5A0671', '0B5A0676', '0B5A0677', '0B5A0679', '0B5A0684', '0B5A0687',
    '0B5A0689', '0B5A0690', '0B5A0694', '0B5A0699', '0B5A0702', '0B5A0703', '0B5A0707', '0B5A0710',
    '0B5A0713', '0B5A0716', '0B5A0722', '0B5A0724', '0B5A0727', '0B5A0728', '0B5A0732', '0B5A0734',
    '0B5A0738', '0B5A0740', '0B5A0741', '0B5A0744', '0B5A0747', '0B5A0751', '0B5A0756', '0B5A0760',
    '0B5A0762', '0B5A0766', '0B5A0768', '0B5A0770', '0B5A0772', '0B5A0773', '0B5A0777', '0B5A0780',
    '0B5A0784', '0B5A0791', '0B5A0792', '0B5A0795', '0B5A0797', '0B5A0802', '0B5A0803', '0B5A0806',
    '0B5A0808', '0B5A0814', '0B5A0816', '0B5A0823', '0B5A0826', '0B5A0830', '0B5A0835', '0B5A0836',
    '0B5A0839', '0B5A0843', '0B5A0845', '0B5A0847', '0B5A0850', '0B5A0854', '0B5A0857', '0B5A0860',
    '0B5A0869', '0B5A0870', '0B5A0873', '0B5A0877', '0B5A0882', '0B5A0883', '0B5A0887', '0B5A0888',
    '0B5A0896', '0B5A0902', '0B5A0904', '0B5A0905', '0B5A0910', '0B5A0911', '0B5A0912', '0B5A0914',
    '0B5A0917', '0B5A0921', '0B5A0926', '0B5A0931', '0B5A0932', '0B5A0935', '0B5A0939', '0B5A0945',
    '0B5A0947', '0B5A0957', '0B5A0958', '0B5A0961', '0B5A0969', '0B5A0973', '0B5A0976', '0B5A0977',
    '0B5A0978', '0B5A0980', '0B5A0982', '0B5A0983', '0B5A0985', '0B5A0986', '0B5A0988', '0B5A0991',
    '0B5A0993', '0B5A0995', '0B5A1000', '0B5A1003', '0B5A1004', '0B5A1006', '0B5A1008'
  ];

  // Generate Cloudinary URL for each product
  const getCloudinaryUrl = (designNumber) => {
    return `https://res.cloudinary.com/dya4qw9dt/image/upload/${designNumber}.webp`;
  };

  // Simple product objects
  const products = imageFilenames.map((filename, index) => ({
    id: index + 1,
    number: filename,
    image: getCloudinaryUrl(filename)
  }));

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleContactUs = () => {
    // Navigate to contact page - you can implement this based on your routing
    window.location.href = '/contact';
  };

  return (
    <motion.div
      className="catalogue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="catalogue-hero">
        <div className="container">
          <motion.div
            className="catalogue-hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: 'var(--accent-gold)' }}>Our Collection</h1>
            <p>Premium Handcrafted Products</p>
          </motion.div>

          
          <div className="search-container">
    <div className="search-input-wrapper">
      <input
        type="text"
        placeholder="Search product number (e.g., 0B5A0498)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="search-icon">🔍</div>
    </div>
    {searchTerm && (
      <div className="search-results-count">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </div>
    )}
  </div>
        </div>
      </section>




      {/* Products Grid */}
      <section className="products-section section-padding">
        <div className="container">
          <motion.div
            className="products-grid"
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.01 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => openProductModal(product)}
                >
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.number}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="image-placeholder" style={{ display: 'none' }}>
                      <span>{product.number}</span>
                    </div>
                    <div className="product-overlay">
                      <button className="view-details-btn">View</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-number">{product.number}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductModal}
          >
            <motion.div
              className="product-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeProductModal}>
                ×
              </button>
              <div className="modal-content">
                <div className="modal-image">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.number}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none' }}>
                    <span>{selectedProduct.number}</span>
                  </div>
                </div>
                <div className="modal-info">
                  <h2>{selectedProduct.number}</h2>
                  <div className="modal-actions">
                    <motion.button
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContactUs}
                    >
                      Order / Contact Us
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Catalogue;