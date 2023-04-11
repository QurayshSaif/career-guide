import "./JobSearch.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { API_URL } from "../../utils/api";
import dropdown from "../../assets/dropdown.png";

export default function JobSearch() {
  const [searchData, setSearchData] = useState([]);
  let { state } = useLocation();
  state = state || {};
  const [jobSearch, setJobSearch] = useState("");
  const [city, setCity] = useState("");
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
    <div className="job-search-parent">
      <div className="job-search">
        <form className="job-search__form" onSubmit={handleSubmit}>
          {state?.values ? (
            <select
              name="fields"
              id="fields"
              className="job-search__input"
              onChange={(e) => setJobSearch(e.target.value)}
            >
              <option value="" disable-option="true">
                Choose a top Field
              </option>
              {options}
            </select>
          ) : null}

          <input
            className="job-search__input"
            type="text"
            placeholder="Search Job titles"
            onChange={(e) => setJobSearch(e.target.value)}
          />
          <input
            className="job-search__input"
            type="text"
            placeholder="Enter City Name"
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
            <div className="job-search__title-container">
              <h1 className="job-search__title">{item.jobtitle}</h1>
              <img
                className="job-search__dropdown"
                src={dropdown}
                alt="Dropdown arrow"
              />
            </div>
            <div
              className={
                "job-search__details" +
                (item.jobkey === jobDetails.jobkey
                  ? ""
                  : " job-search__details--hide")
              }
            >
              <div className="job-search__block">
                <span className="job-search__text-title">Company Name: </span>
                <span className="job-search__text">{item.company}</span>
              </div>
              <div className="job-search__block">
                <span className="job-search__text-title">Located in: </span>
                <span className="job-search__text">
                  {item.formattedLocationFull}, {item.country}
                </span>
              </div>
              <div className="job-search__block">
                <span className="job-search__text-title">
                  Brief description:{" "}
                </span>
                <span className="job-search__text">{item.snippet}</span>
              </div>
              <div className="job-search__apply">
                <a href={item.url} target="_blank">
                  Apply on Indeed
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
