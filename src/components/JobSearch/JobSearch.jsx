import "./JobSearch.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { API_URL } from "../../utils/api";

export default function JobSearch() {
  const [searchData, setSearchData] = useState([]);
  let { state } = useLocation();
  state = state || {};
  const [jobSearch, setJobSearch] = useState("full time developer");
  const [city, setCity] = useState("toronto");
  const [jobDetails, setJobDetails] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/jobs?job=${jobSearch}&location=${city}&country=canada`
      );
      setSearchData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleJobDetails = (job) => {
    if (job.jobkey === jobDetails.jobkey) {
      setJobDetails({});
    } else {
      setJobDetails(job);
    }
  };

  const options = state?.values?.map((value, index) => (
    <option key={index} value={value}>
      {value}
    </option>
  ));

  return (
    <div className="job-search">
      <form className="job-search__form" onSubmit={handleSubmit}>
        {state?.values ? (
          <select
            name="fields"
            id="fields"
            onChange={(e) => setJobSearch(e.target.value)}
          >
            <option value="">Choose a top Field</option>
            {options}
          </select>
        ) : null}

        <input
          className="job-search__input"
          type="text"
          placeholder="Search job titles, company name"
          onChange={(e) => setJobSearch(e.target.value)}
        />
        <input
          className="job-search__input"
          type="text"
          placeholder="city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="job-search__submit" type="submit">
          Find Jobs
        </button>
      </form>

      {searchData?.results?.map((item) => (
        <div
          className="job-search__results"
          key={item.jobkey}
          onClick={() => handleJobDetails(item)}
        >
          <h1 className="job-search__title">{item.jobtitle}</h1>
          <div
            className={
              "job-search__details" +
              (item.jobkey === jobDetails.jobkey
                ? ""
                : " job-search__details--hide")
            }
          >
            <p className="job-search__text-title">Company Name: </p>
            <span className="job-search__text">{item.company}</span>
            <p className="job-search__text-title">Located in: </p>
            <span className="job-search__text">
              {item.formattedLocationFull}, {item.country}
            </span>
            <p className="job-search__text-title">Brief description: </p>
            <span className="job-search__text">{item.snippet}</span>
            <div className="job-search__apply">
              <a href={item.url}>Apply</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
