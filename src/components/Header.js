import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-background">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src="/path/to/logo.png" alt="Logo" />
          </Link>
          <nav className="nav-menu">
            <ul>
              <li><Link to="/festival">Festival</Link></li>
              <li><Link to="/film-guide">Film Guide</Link></li>
              <li><Link to="/tickets">Tickets</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div className="header-buttons">
            <button className="header-btn primary">Get Tickets</button>
            <button className="header-btn secondary">Donate</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;