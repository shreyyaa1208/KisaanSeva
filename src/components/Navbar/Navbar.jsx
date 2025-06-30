import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LanguageSelector, useLanguage } from "../Language/Language";

import "./styles.css"; // Or your correct path

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">KisaanSeva</div>

        <div
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-container ${isMenuOpen ? "show" : ""}`}>
        <a href="/">{t("home")}</a>
        <a href="/crop-recommendation">{t("cropManagement")}</a>
        <Link to="/fertilizer-prediction">{t("Fertilizer")}</Link>
        <a href="/disease-detection">{t("diseaseDetection")}</a>
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
