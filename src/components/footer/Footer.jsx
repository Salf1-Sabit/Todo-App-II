import React from "react";

import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-child child-1">
          <h2>TODO HIVE.</h2>
          <p>
            Join millions of people who organize work and life with TODO HIVE.
          </p>
        </div>
        <div className="footer-child child-2">
          <Link className="navbar-link" to="/">
            How it works
          </Link>
          <Link className="navbar-link" to="/pricing">
            Pricing
          </Link>
          <Link className="navbar-link" to="/">
            For teams
          </Link>
          <Link className="navbar-link" to="/">
            Help center
          </Link>
        </div>
        <div className="footer-child child-3">
          <Link className="navbar-link" to="/about">
            About
          </Link>
          <Link className="navbar-link" to="/contact">
            Contact us
          </Link>
          <Link className="navbar-link" to="/">
            Our story
          </Link>
          <Link className="navbar-link" to="/">
            Terms of service
          </Link>
          <Link className="navbar-link" to="/">
            Feedback
          </Link>
        </div>
      </div>
      <p className="copyright">Copyright © 2023 Salfi Sabit</p>
    </footer>
  );
};

export default Footer;
