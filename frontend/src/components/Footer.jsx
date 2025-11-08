import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          {/* Main Column */}
          <div className="footer-column">
            <h4 className="footer-title">Main</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">Work With Us</a></li>
              <li><a href="/">My Gear</a></li>
            </ul>
          </div>

          {/* Learn Column */}
          <div className="footer-column">
            <h4 className="footer-title">Learn</h4>
            <ul className="footer-links">
              <li><a href="/courses">Courses</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/notes">Notes</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="/">Terms</a></li>
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Refund</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h4 className="footer-title">Social</h4>
            <ul className="footer-links">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter (X)</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="made-with-love">
            Made with <span className="emoji">💷</span> and <span className="emoji">💸</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;