import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <Logo size="small" />
            <p className="footer-tagline">
              AI-powered real estate investment analytics for Montreal's Airbnb market.
            </p>
          </div>

          {/* Product Section */}
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/about">How It Works</Link></li>
              <li><Link to="/technical-guide">Technical Guide</Link></li>
              <li><Link to="/about#faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="mailto:othmane.zizi.pro@gmail.com">Support</a></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} CashFlow MTL. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            Investment analysis for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
