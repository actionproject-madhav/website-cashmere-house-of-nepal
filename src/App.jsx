// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import Catalogue from './pages/Catalogue';
import QualitySize from './pages/QualitySize';
import Colors from './pages/Colors';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/quality-size" element={<QualitySize />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              {/* No callback route needed for SPA */}
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;