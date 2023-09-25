import React from "react";

import "./features-card.css";
import "@mui/icons-material/";

const FeaturesCard = ({ icon, title, desc }) => {
  return (
    <div className="card">
      <div>
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div>{desc}</div>
    </div>
  );
};

export default FeaturesCard;
