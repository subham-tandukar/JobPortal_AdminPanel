import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="overlay">
        <div className="content">
          <h1>404</h1>
          <p>Page Not Found</p>
          <Link to="/">
            <button className="uk-button">Redirect to dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
