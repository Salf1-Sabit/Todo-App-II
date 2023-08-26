import React from "react";

import "./Home.css";

import Nav from "../components/Nav/Nav";

const Home = () => {
  return (
    <div>
      <Nav />
      <h3 className="temp-welcome-message">WELCOME TO TODO HIVE.</h3>
    </div>
  );
};

export default Home;
