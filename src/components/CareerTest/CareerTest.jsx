import { useState, useEffect } from "react";
import "./CareerTest.scss";
import axios from "axios";
import { API_URL } from "../../utils/api";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export default function CareerTest() {
  const [quiz, setQuiz] = useState([]);
  const [scoringSystem, setScoringSystem] = useState({});
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
  const handleAnswerSelect = (answerValue) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerValue;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScores = () => {
    const updatedScores = {};

    answers.forEach((answer) => {
      if (answer) {
        const answerScore = scoringSystem[answer];
        Object.keys(answerScore).forEach((field) => {
          updatedScores[field] =
            (updatedScores[field] || 0) + answerScore[field];
        });
      }
    });

    setScores(updatedScores);
    console.log(updatedScores);
  };

  const getTopFields = () => {
    const sortedFields = Object.entries(scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([field]) => field);
    return sortedFields.slice(0, 5);
  };

  const getRandomColor = () => {
    const min = 50; // minimum value for each color channel
    const max = 205; // maximum value for each color channel
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };

  const data = getTopFields()
    .slice(0, 5)
    .map((field) => {
      const percentage =
        (scores[field] / Object.values(scores).reduce((a, b) => a + b, 0)) *
        100;

      return {
        title: field,
        value: scores[field],
        color: getRandomColor(),
        label: `${field} (${percentage.toFixed(2)}%)`,
      };
    });

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="quiz">
      {quiz.length > 0 ? (
        <div className="quiz__container">
          {Object.keys(scores).length === 0 && (
            <div>
              <p className="quiz__question">{currentQuestion.question}</p>
              {currentQuestion.answers.map((answer) => (
                <label className="quiz__label" key={answer.value}>
                  <input
                    className="quiz__input"
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={answer.value}
                    onChange={() => handleAnswerSelect(answer.value)}
                    checked={answers[currentQuestionIndex] === answer.value}
                  />
                  <span className="quiz__text">{answer.text}</span>
                </label>
              ))}
              <div className="quiz__buttons">
                {currentQuestionIndex > 0 && (
                  <div
                    className="quiz__button quiz__button--previous"
                    onClick={handlePreviousQuestion}
                  >
                    Previous Question
                  </div>
                )}
                {currentQuestionIndex < quiz.length - 1 && (
                  <div
                    className="quiz__button quiz__button--next"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </div>
                )}
                {currentQuestionIndex === quiz.length - 1 && (
                  <div
                    className="quiz__button quiz__button--submit"
                    onClick={calculateScores}
                  >
                    Submit
                  </div>
                )}
              </div>
            </div>
          )}
          {Object.keys(scores).length > 0 && (
            <div className="quiz__result">
              <p className="quiz__result-text">
                Top fields based on your answers:
              </p>
              <ol className="quiz__result-list">
                {getTopFields().map((field) => (
                  <li className="quiz__result-item" key={field}>
                    {field}
                  </li>
                ))}
              </ol>
              <div className="quiz__job-search">
                <Link to="/job-search" state={{ values: getTopFields() }}>
                  Job Search
                </Link>
              </div>
              <PieChart
                className="quiz__pie-chart"
                data={data}
                label={({ dataEntry }) => dataEntry.label}
                labelStyle={{
                  fontSize: "2px",
                  fontFamily: "sans-serif",
                  fill: "#000",
                  fontWeight: "bold",
                  fontSize: "0.15rem",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
