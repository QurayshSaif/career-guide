import "./JobSearch.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function JobSearch() {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.indeed.com/ads/apisearch",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
            params: {
              publisher: "17083005191573",
              q: "java",
              l: "toronto",
              co: "canada",
              v: "2",
              format: "json",
              radius: "25",
            },
          }
        );
        setSearchData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))} */}
    </div>
  );
}
