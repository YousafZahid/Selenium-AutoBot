// src/components/Hero.js
import React from 'react';
import './Hero.css';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Find Handpicked Actuarial Jobs That Match Your Expertise</h1>
        <p>With 300+ open roles and 50 new jobs posted weekly, your dream job is just a click away.</p>
        
        <div className="search-bar">
          <input type="text" placeholder="Enter Keyword or Job Title or Location" />
          <button>
            <FaSearch /> Search Jobs
          </button>
        </div>

        <div className="hero-trust-box">
          <p>Trusted by 1700+ actuaries finding their dream jobs.</p>
          <button className="join-button">Join the list</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
