// src/components/PostJob.js
import React, { useState } from 'react';
import './Postjob.css';

const PostJob = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    link: '',
    logo_url: '',
    company_link: '',
    country: '',
    posted_on: '',
    is_featured: false,
    cities: '',
    experience_levels: '',
    sectors: '',
    tags: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Job added successfully!');
      setFormData({ ...formData, title: '', company: '', link: '', logo_url: '', company_link: '', country: '', posted_on: '', is_featured: false, cities: '', experience_levels: '', sectors: '', tags: '' });
      onClose();
    } else {
      alert(result.error || 'Something went wrong.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="post-job-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
          <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
          <input name="link" placeholder="Job Link" value={formData.link} onChange={handleChange} />
          <input name="logo_url" placeholder="Logo URL" value={formData.logo_url} onChange={handleChange} />
          <input name="company_link" placeholder="Company Link" value={formData.company_link} onChange={handleChange} />
          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          <input name="posted_on" placeholder="Posted On" value={formData.posted_on} onChange={handleChange} />
          <label>
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
            Is Featured?
          </label>
          <input name="cities" placeholder="Cities" value={formData.cities} onChange={handleChange} />
          <input name="experience_levels" placeholder="Experience Levels" value={formData.experience_levels} onChange={handleChange} />
          <input name="sectors" placeholder="Sectors" value={formData.sectors} onChange={handleChange} />
          <input name="tags" placeholder="Tags" value={formData.tags} onChange={handleChange} />

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
