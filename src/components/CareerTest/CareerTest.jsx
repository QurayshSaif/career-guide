import { useState, useEffect } from "react";
import "./CareerTest.scss";
import axios from "axios";
import { API_URL } from "../../utils/api";

export default function CareerTest() {
  const [quiz, setQuiz] = useState([]);
  const [scoringSystem, setScoringSystem] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/scoring`)
      .then((response) => {
        setScoringSystem(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/questions`)
      .then((response) => {
        setQuiz(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div className="quiz"></div>;
}
