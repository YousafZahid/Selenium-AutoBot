
import React, { useState } from 'react';
import './Navbar.css';
import PostJob from './Postjob';

const Navbar = () => {
  const [showPostJob, setShowPostJob] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setShowPostJob(true);
  };

  const handleClose = () => {
    setShowPostJob(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Actuary List</h2>
        </div>
        <ul className="navbar-links">
          <li><a href="#about" className="not-special-link">About</a></li>
          <li><a href="#blog" className="not-special-link">Blog</a></li>
          <li><a href="#post-job" className="not-special-link" onClick={handleOpen}>Post A Job</a></li>
          <li><a href="#freejobalerts" className="special-link">Get Free Job Alerts</a></li>
        </ul>
      </nav>

      {showPostJob && <PostJob onClose={handleClose} />}
    </>
  );
};

export default Navbar;
