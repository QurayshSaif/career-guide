import "./JobSearch.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { API_URL } from "../../utils/api";

export default function JobSearch() {
  const [searchData, setSearchData] = useState([]);
  let { state } = useLocation();
  const [jobSearch, setJobSearch] = useState("developer");
  const [city, setCity] = useState("toronto");

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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search jobs"
          onChange={(e) => setJobSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {searchData?.results?.map((item) => (
        <div key={item.jobkey}>{item.jobtitle}</div>
      ))}
    </div>
  );
}
