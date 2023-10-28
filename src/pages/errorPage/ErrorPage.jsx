import React from "react";

// CSS UTILITIES
import "./errorPage.css";

// LOCAL COMPONENTS
import Nav from "../../components/Nav/Nav";

const ErrorPage = () => {
  return (
    <>
      <Nav />
      <div className="errorPageBG">
        <h1>404</h1>
        <h3>PAGE NOT FOUND </h3>
      </div>
    </>
  );
};

export default ErrorPage;
