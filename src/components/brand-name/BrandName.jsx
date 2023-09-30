import React from "react";

import "./brandName.css";
import { Link } from "react-router-dom";

const BrandName = () => {
  return (
    <>
      <Link to="/" className="brand-name-link">
        <h3 className="brand-name">
          TODO HIVE<span className="brand-name-dot">.</span>
        </h3>
      </Link>
    </>
  );
};

export default BrandName;
