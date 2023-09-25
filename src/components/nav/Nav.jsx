import React from "react";

import "./nav.css";
import { Link, NavLink } from "react-router-dom";
import BrandName from "../brand-name/BrandName";

function NavBar() {
  return (
    <div className="navbar">
      <BrandName />

      <div className="nav-items-container">
        <NavLink to="/" className="nav-item" activeClassName="active-page">
          Home
        </NavLink>
        <NavLink to="/pricing" className="nav-item">
          Pricing
        </NavLink>
        <NavLink to="/about" className="nav-item">
          About
        </NavLink>
        <NavLink to="/contact" className="nav-item">
          Contact
        </NavLink>
      </div>

      <Link to="/login" className="nav-item">
        <button className="nav-item sign-in-button">Sign In</button>
      </Link>
    </div>
  );
}

export default NavBar;
