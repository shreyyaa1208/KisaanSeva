import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="logo">
              <div className="logo-icon">
                <div className="leaf"></div>
              </div>
              <span className="logo-text">KisaanSeva</span>
            </div>
            <p className="brand-description">
              KisaanSeva platform provides cutting-edge Machine Learning models
              for agricultural predictions and insights.
            </p>
          </div>

          {/* Company Section */}
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/contributors">Contributors</a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/crop-recommendation">Crop Recommendation</a>
              </li>
              <li>
                <a href="/fertilizer-recommendation">
                  Fertilizer Recommendation
                </a>
              </li>
              <li>
                <a href="/soil-quality">Soil Quality</a>
              </li>
              <li>
                <a href="/price-prediction">Price Prediction</a>
              </li>
              <li>
                <a href="/forecast">Forecast</a>
              </li>
              <li>
                <a href="/disease">Disease Detection</a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/code-of-conduct">Code Of Conduct</a>
              </li>
              <li>
                <a href="/license">License</a>
              </li>
              <li>
                <a href="/terms">Terms and Conditions</a>
              </li>
              <li>
                <a href="/cookie-policy">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            Copyright © 2025 All Rights Reserved{" "}
            <span className="brand-highlight">KisaanSeva</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
