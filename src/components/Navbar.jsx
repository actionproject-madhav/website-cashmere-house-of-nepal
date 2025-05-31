import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About Us' },
    { path: '/catalogue', name: 'Catalogue' },
    { path: '/quality-size', name: 'Quality & Size' },
    { path: '/colors', name: 'Colors' },
    { path: '/contact', name: 'Contact' },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
    // Scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Left Menu Button */}
        <div className="menu-section">
          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
          <span className="menu-text">Menu</span>
        </div>

        {/* Center Logo and Company Name */}
        <div className="center-section">
          <Link to="/" className="logo-company-link">
            <img 
              src="/logo.png" 
              alt="Cashmere House of Nepal Logo" 
              className="logo-image"
            />
            <h1 className="company-name">CASHMERE HOUSE OF NEPAL</h1>
          </Link>
        </div>

        {/* Right Auth Section */}
        <div className="spacer-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLoading ? (
            <div style={{ fontSize: '14px', color: '#666' }}>Loading...</div>
          ) : isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                style={{ 
                  color: '#333', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {user?.name || 'Profile'}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </div>
      </div>

      {/* Middle Navigation Menu */}
      <div className="nav-menu-container">
        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/profile"
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              My Account
            </Link>
          )}
        </div>
      </div>

      {/* Left Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
          <div className="dropdown-menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`dropdown-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/profile"
                className={`dropdown-link ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                My Account
              </Link>
            )}
            {/* Auth buttons in mobile menu */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
              {!isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <LoginButton />
                  <SignupButton />
                </div>
              ) : (
                <LogoutButton />
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;