import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="container">
      <div className="row">
        <h1>Getting Started</h1>
      </div>
      <div className="divider" />
      <div className="row">
        <div className="col">
          <p>
            Collect feedback from your users simply. Just signin with Google, create a survey and
            the rest will be taken care of.
          </p>
        </div>
        <div className="card-action">
          <Link to="/surveys">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
