import React from "react";
import "./styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-column">
          <h2>Contact Us</h2>
          <p className="footer-small">Email: support@beer.com</p>
          <p className="footer-small">Phone: 123-456-7890</p>
        </div>
        <div className="footer-column">
          <h2>Useful Links</h2>
          <p className="footer-small">Practice</p>
          <p className="footer-small">Mock Test</p>
          <p className="footer-small">About Us</p>
          <p className="footer-small">Programs</p>
        </div>
        <div className="footer-column">
          <h2></h2>
          <div className="footer-logo">
            <img src="/path/to/company-logo.png" alt="Company Logo" />
          </div>
          <p className="footer-small">Join the conversation</p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com">
              <img src="/path/to/facebook-logo.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com">
              <img src="/path/to/instagram-logo.png" alt="Instagram" />
            </a>
            <a href="https://www.viber.com">
              <img src="/path/to/viber-logo.png" alt="Viber" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        Copyright@2023 | Be.Er | Er.Production | Login
      </div>
    </footer>
  );
};

export default Footer;
