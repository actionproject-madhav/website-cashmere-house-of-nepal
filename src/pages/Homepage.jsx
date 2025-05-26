import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; 

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({
    products: false,
    company: false,
    cta: false
  });
  
  const productsRef = useRef(null);
  const companyRef = useRef(null);
  const ctaRef = useRef(null);
  const cursorLightRef = useRef(null);
  const heroRef = useRef(null);

  // Enhanced smooth scroll handling with performance optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Advanced mouse tracking for dynamic light effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
      
      // Update cursor light position
      if (cursorLightRef.current) {
        cursorLightRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced Intersection Observer with stagger animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target === productsRef.current) {
            setIsVisible(prev => ({ ...prev, products: true }));
          } else if (target === companyRef.current) {
            setIsVisible(prev => ({ ...prev, company: true }));
          } else if (target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    }, observerOptions);

    if (productsRef.current) observer.observe(productsRef.current);
    if (companyRef.current) observer.observe(companyRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section with offset
  const scrollToSection = useCallback((sectionRef) => {
    if (sectionRef.current) {
      const offsetTop = sectionRef.current.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Enhanced parallax calculation
  const getParallaxStyle = (speed = 0.5, direction = 'y') => {
    if (direction === 'x') {
      return { transform: `translateX(${scrollY * speed}px)` };
    }
    return { transform: `translateY(${scrollY * speed}px)` };
  };

  // Advanced mouse parallax with bounds
  const getMouseParallax = (intensity = 0.02, bounds = { x: 30, y: 30 }) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = Math.max(-bounds.x, Math.min(bounds.x, (mousePosition.x - centerX) * intensity));
    const deltaY = Math.max(-bounds.y, Math.min(bounds.y, (mousePosition.y - centerY) * intensity));
    
    return {
      transform: `translate(${deltaX}px, ${deltaY}px)`
    };
  };

  // Dynamic gradient based on mouse position
  const getDynamicGradient = () => {
    const x = (mousePosition.x / window.innerWidth) * 100;
    const y = (mousePosition.y / window.innerHeight) * 100;
    return {
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 30%, transparent 70%)`
    };
  };

  // Generate Cloudinary URL for each product
  const getCloudinaryUrl = (designNumber) => {
    return `https://res.cloudinary.com/dya4qw9dt/image/upload/${designNumber}.webp`;
  };

  // Sample products from your catalogue
  const featuredProducts = [
    {
      id: 1,
      number: '0B5A0498',
      image: getCloudinaryUrl('0B5A0498')
    },
    {
      id: 2,
      number: '0B5A0507',
      image: getCloudinaryUrl('0B5A0507')
    },
    {
      id: 3,
      number: '0B5A0535',
      image: getCloudinaryUrl('0B5A0535')
    },
    {
      id: 4,
      number: '0B5A0550',
      image: getCloudinaryUrl('0B5A0550')
    },
    {
      id: 5,
      number: '0B5A0571',
      image: getCloudinaryUrl('0B5A0571')
    },
    {
      id: 6,
      number: '0B5A0604',
      image: getCloudinaryUrl('0B5A0604')
    }
  ];

  return (
    <div className="homepage" id="home">
      {/* Cursor Light Effect */}
      <div ref={cursorLightRef} className="cursor-light"></div>
  
      {/* Enhanced Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1" style={getParallaxStyle(0.3)}></div>
        <div className="ambient-orb ambient-orb-2" style={getParallaxStyle(0.5)}></div>
        <div className="ambient-orb ambient-orb-3" style={getParallaxStyle(0.2)}></div>
        <div className="ambient-orb ambient-orb-4" style={getParallaxStyle(0.4)}></div>
        <div className="mesh-gradient" style={getDynamicGradient()}></div>
      </div>
  
      <section className="hero" ref={heroRef}>
        <div className="hero-bg-image">
          <img src={getCloudinaryUrl('0B5A0598')} />
          <div className="hero-overlay"></div>
        </div>
  
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span>Established in 1995</span>
              </div>
  
              <h1 className="hero-title">
                <span className="title-main">Leading Manufacturer and Exporter of </span>
                <span className="title-highlight">
                  <span className="gradient-text glow-text">Cashmere Products</span>
                </span>
                <span className="title-location"> in Nepal</span>
              </h1>
  
              <div className="hero-subtitle-container">
                <p className="hero-subtitle">
                  Cashmere House of Nepal was established in 1995. Our company aims to revive
                  the heritage of Cashmere exclusive art with the ancient zeal, giving a new
                  look and new design of qualitative products to explore it worldwide.
                </p>
                <p className="hero-subtitle" style={{ marginTop: '1rem' }}>
                  We manufacture exclusive handmade cashmere products: Blankets, shawls,
                  stoles, scarves and sweaters. For more new design assurance, we dye the
                  cashmere and silk yarn before it is given to be woven.
                </p>
              </div>
  
              <div className="hero-buttons">
                <Link to="/catalogue" className="btn btn-primary">
                  <span>Explore Products</span>
                  <span className="btn-icon">→</span>
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  <span>Our Heritage</span>
                  <span className="btn-icon">↗</span>
                </Link>
              </div>
            </div>
  
            <div className="scroll-indicator">
              <div className="scroll-arrow" onClick={() => scrollToSection(productsRef)}>
                <div className="scroll-icon">↓</div>
                <div className="scroll-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section className="products-preview" ref={productsRef} id="catalogue">
        <div className="section-bg-effects">
          <div className="section-spotlight"></div>
        </div>
  
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>Our Collection</span>
            </div>
            <h2 className="section-title">
              Premium <span className="gradient-text">Handcrafted Products</span>
            </h2>
            <p className="section-description">
              Discover our exquisite collection of handmade cashmere products, each piece representing traditional Nepalese craftsmanship.
            </p>
          </div>
  
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-card ${isVisible.products ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-image-container">
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
                      <Link to="/catalogue" className="btn btn-primary btn-sm">
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-number">{product.number}</div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="section-cta">
            <Link to="/catalogue" className="btn btn-primary btn-lg">
              <span>View Full Collection</span>
              <span className="btn-icon">→</span>
            </Link>
          </div>
        </div>
      </section>
  
      <section className="company-info" ref={companyRef}>
        <div className="section-bg-effects">
          <div className="section-spotlight"></div>
        </div>
  
        <div className="container">
          <div className="info-grid">
            <div className={`info-text ${isVisible.company ? 'visible' : ''}`}>
              <div className="section-badge">
                <span>Our Heritage</span>
              </div>
              <h2>The Diamond Fiber of the <span className="gradient-text">Himalayas</span></h2>
              <div className="info-content">
                <p>
                  Fine quality pure cashmere is a rare and most precious natural fiber -
                  the diamond fiber extracted from the body of Herricos Capra mountain goats
                  (Chyangra) from the peaks of the Himalayas.
                </p>
                <p>
                  Its lightness, warmth and gentle caressing touch makes cashmere one of
                  life's ultimate pleasures. Our fabulous quality cashmere products offer
                  unparalleled elegance and comfort, being luxurious, sensuous and fashionable.
                </p>
              </div>
            </div>
  
            <div className={`info-visual ${isVisible.company ? 'visible' : ''}`}>
              <div className="info-image-container">
                <div className="info-image-placeholder">
                  <img src="/homepage.png" alt="Company Info" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;