import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    country: [],
    city: [],
    experience: [],
    sector: [],
    tags: [],
    hideClosed: false
  });
  const [jobCounts, setJobCounts] = useState({
    country: {},
    city: {},
    experience: {},
    sector: {},
    tags: {}
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 30;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
 
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs', {
        params: { ...filters }
      });
      setJobs(response.data);

      const counts = {
        country: {},
        city: {},
        experience: {},
        sector: {},
        tags: {}
      };

      response.data.forEach((job) => {
        const countryName = job.country?.replace(/[^a-zA-Z\s]/g, '').trim();
        if (countryName) {
          counts.country[countryName] = (counts.country[countryName] || 0) + 1;
        }
  
        if (job.cities) {
          const cityList = Array.isArray(job.cities)
            ? job.cities
            : job.cities.split(',').map((c) => c.trim());
  
          cityList.forEach((city) => {
            if (city) counts.city[city] = (counts.city[city] || 0) + 1;
          });
        }
       
        if (job.experience_levels) {
          const expList = Array.isArray(job.experience_levels)
            ? job.experience_levels
            : job.experience_levels.split(',').map((e) => e.trim());
  
          expList.forEach((exp) => {
            if (exp) counts.experience[exp] = (counts.experience[exp] || 0) + 1;
          });
        }
  
        if (job.sectors) {
          const sectorList = Array.isArray(job.sectors)
            ? job.sectors
            : job.sectors.split(',').map((s) => s.trim());
  
          sectorList.forEach((sector) => {
            if (sector) counts.sector[sector] = (counts.sector[sector] || 0) + 1;
          });
        }
  
        if (job.tags) {
          const tagList = Array.isArray(job.tags)
            ? job.tags
            : job.tags.split(',').map((t) => t.trim());
  
          tagList.forEach((tag) => {
            if (tag) counts.tags[tag] = (counts.tags[tag] || 0) + 1;
          });
        }
      });
  
      setJobCounts(counts);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, [filters, currentPage]);

  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' 
        ? (checked ? [...filters[name], value] : filters[name].filter((val) => val !== value)) 
        : value
    });
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const paginateJobs = (jobs) => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return jobs.slice(startIndex, endIndex);
  };
  
  const getUniqueValues = (data) => {
    return [...new Set(
      data
        .flatMap(item => typeof item === 'string' ? item.split(',') : item) // split strings
        .map(value => value.trim()) 
        .filter(value => value)
    )];
  };
  
 
  const countries = getUniqueValues(jobs.map((job) => job.country));
  
  const cities = getUniqueValues(jobs.map((job) => job.cities));
  const experienceLevels = getUniqueValues(jobs.map((job) => job.experience_levels));
  const sectors = getUniqueValues(jobs.map((job) => job.sectors));
  const tags = getUniqueValues(jobs.map((job) => job.tags));

  return (
    <div>
      <Navbar />
      <Hero />

      <div className="job-layout">
      <div className="filters-column">
          
          <div className="filter-container">
            <label>Country</label>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="country-all"
                  checked={filters.country.length === countries.length} // Check if 'All' is selected
                  onChange={() => handleFilterChange({ target: { name: 'country', value: '', type: 'checkbox' } })}
                />
                All
              </label>
              {countries.map((country, index) => {
                const cleanedCountry = country.replace(/[^a-zA-Z\s]/g, '').trim();
                const count = jobCounts.country[cleanedCountry] || 0;

                return (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="country"
                      value={country}
                      checked={filters.country.includes(country)}
                      onChange={handleFilterChange}
                    />
                    {country}
                    <span className="job-count">{count}</span>
                  </label>
                );
              })}

            </div>
          </div>

          
          <div className="filter-container">
            <label>City</label>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="city-all"
                  checked={filters.city.length === cities.length} // Check if 'All' is selected
                  onChange={() => handleFilterChange({ target: { name: 'city', value: '', type: 'checkbox' } })}
                />
                All
              </label>
              {cities.map((city, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="city"
                    value={city}
                    checked={filters.city.includes(city)}
                    onChange={handleFilterChange}
                  />
                  {city}
                  <span className="job-count">{jobCounts.city[city] || 0}</span>
                </label>
              ))}
            </div>
          </div>

          
          <div className="filter-container">
            <label>Experience</label>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="experience-all"
                  checked={filters.experience.length === experienceLevels.length} // Check if 'All' is selected
                  onChange={() => handleFilterChange({ target: { name: 'experience', value: '', type: 'checkbox' } })}
                />
                All
              </label>
              {experienceLevels.map((experience, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="experience"
                    value={experience}
                    checked={filters.experience.includes(experience)}
                    onChange={handleFilterChange}
                  />
                  {experience}
                  <span className="job-count">{jobCounts.experience[experience] || 0}</span>

                </label>
              ))}
            </div>
          </div>

          
          <div className="filter-container">
            <label>Sector</label>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="sector-all"
                  checked={filters.sector.length === sectors.length} // Check if 'All' is selected
                  onChange={() => handleFilterChange({ target: { name: 'sector', value: '', type: 'checkbox' } })}
                />
                All
              </label>
              {sectors.map((sector, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="sector"
                    value={sector}
                    checked={filters.sector.includes(sector)}
                    onChange={handleFilterChange}
                  />
                  {sector}
                  <span className="job-count">{jobCounts.sector[sector] || 0}</span>

                </label>
              ))}
            </div>
          </div>

          
          <div className="filter-container">
            <label>Tags</label>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  name="tags-all"
                  checked={filters.tags.length === tags.length} // Check if 'All' is selected
                  onChange={() => handleFilterChange({ target: { name: 'tags', value: '', type: 'checkbox' } })}
                />
                All
              </label>
              {tags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={filters.tags.includes(tag)}
                    onChange={handleFilterChange}
                  />
                  {tag}
                  <span className="job-count">{jobCounts.tags[tag] || 0}</span>

                </label>
              ))}
            </div>
          </div>

          
        </div>



        
        <div className="jobs-column">
          <input
            type="text"
            className="search-input"
            placeholder="Search by job title"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="job-list">
            {paginateJobs(jobs)
              .filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))
              .filter((job) =>
                (!filters.country.length || filters.country.includes(job.country)) &&
                (!filters.city.length || filters.city.includes(job.cities)) &&
                (!filters.experience.length || filters.experience.includes(job.experience_levels)) &&
                (!filters.sector.length || filters.sector.includes(job.sectors)) &&
                (!filters.tags.length || (Array.isArray(job.tags) && job.tags.some(tag => filters.tags.includes(tag)))) &&
                (!filters.hideClosed || job.status !== 'closed')
              )
              .map((job) => (
                  <a
                    key={job.id}
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-card-link"
                  >
                    <div className="job-card">
                      <img src={job.logo_url || 'https://via.placeholder.com/50'} alt="logo" className="job-logo" />

                      <div className="job-main">
                        <div className="job-details">
                          <h3 className="job-title">{job.title}</h3>
                          <p className="job-company">{job.company}</p>
                          <div>
                          <p className="job-location">{job.country}</p>
                          <p className="job-location">
                            {job.cities
                              .split(',') 
                              .filter(city => city.trim() !== '') 
                              .map((city, idx) => (
                                <span key={idx} className="city">
                                  {city.trim()}
                                </span>
                              ))}
                          </p>
                          </div>
                        </div>

                        <div className="job-info-side">
                          <div className="job-tags-section">
                            <div className="job-tags-row">
                              {(Array.isArray(job.experience_levels) ? job.experience_levels : job.experience_levels?.split(',') || [])
                                .slice(0, 2)
                                .map((tag, idx) => (
                                  <span key={`exp-${idx}`} className="job-tag">{tag.trim()}</span>
                                ))}
                            </div>
                            <div className="job-tags-row">
                              {(Array.isArray(job.sectors) ? job.sectors : job.sectors?.split(',') || [])
                                .slice(0, 2)
                                .map((tag, idx) => (
                                  <span key={`sector-${idx}`} className="job-tag">{tag.trim()}</span>
                                ))}
                            </div>
                            <div className="job-tags-row tags-scrollable">
                              {(Array.isArray(job.tags) ? job.tags : job.tags?.split(',') || [])
                                .slice(0, 3)
                                .map((tag, idx) => (
                                  <span key={`tag-${idx}`} className="job-tag">{tag.trim()}</span>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="job-actions">
                          <p className="job-date">{job.posted_on || 'Today'}</p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              axios.delete(`http://localhost:5000/jobs/${job.id}`).then(fetchJobs);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
            <div className="pagination">
              <button 
                onClick={handlePreviousPage} 
                className="pagination-button"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                onClick={handleNextPage} 
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
      </div>
      <Footer/>
      <div id="post-job">
        
      </div>
      
    </div>
  );
};

export default App;
