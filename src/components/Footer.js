import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <span className="footer-text">&copy; 2024 All Rights Reserved</span>
          <a href="/terms" className="footer-link">Terms</a>
          <a href="/privacy" className="footer-link">Privacy</a>
        </div>
        <a href="https://theunloved.co.uk" target="_blank" rel="noopener noreferrer" className="footer-made-with-love">
          Made with love by the unloved
        </a>
      </div>
    </footer>
  );
};

export default Footer;