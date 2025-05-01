import React from 'react';
import './Footer.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
     
        <div className="footer-column">
          <h4>🏗️ Actuary List</h4>
          <ul>
            <li>About us</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>🧑‍🎓 For actuaries</h4>
          <ul>
            <li>Get job alerts</li>
            <li>Search jobs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>🏢 For employers</h4>
          <ul>
            <li>Start hiring</li>
            <li>Employer directory</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>💬 Contact</h4>
          <ul>
            <li>Email us</li>
          </ul>
        </div>

        {/* Row 2 */}
        <div className="footer-column">
          <h4>🔍 Job types</h4>
          <ul>
            <li>Sectors</li>
            <li>Experience levels</li>
            <li>Keywords</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>📍 Job locations</h4>
          <ul>
            <li>Countries</li>
            <li>Cities</li>
          </ul>
        </div>
        <div className="footer-column empty"></div>
        <div className="footer-column empty"></div>
      </div>

      <hr />

      <div className="footer-bottom">
        <div className="footer-socials">
          <FaLinkedin className="social-icon" />
          <FaInstagram className="social-icon" />
        </div>
        <div className="footer-links">
          <span>Cookies</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
