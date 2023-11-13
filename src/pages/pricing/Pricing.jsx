import React from "react";

// MUI COMPONENTS
import { Toolbar } from "@mui/material";

// LINK CSS
import "./pricing.css";

// LOCAL COMPONENTS
import Footer from "../../components/footer/Footer";
import Nav from "../../components/Nav/Nav";

const Pricing = () => {
  return (
    <div>
      <Nav />
      <Toolbar />
      <Footer />
    </div>
  );
};

export default Pricing;
