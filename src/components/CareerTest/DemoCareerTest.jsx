import { useState, useEffect } from "react";
import "./CareerTest.scss";
import axios from "axios";
import { API_URL } from "../../utils/api";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export default function DemoCareerTest() {
  const [quiz, setQuiz] = useState([]);
  const [scoringSystem, setScoringSystem] = useState({});
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [randomQuestionIndexes, setRandomQuestionIndexes] = useState([]);

  const generateRandomIndexes = (length) => {
    const indexes = [];
    while (indexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/scoring`)
      .then((response) => {
        setScoringSystem(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/questions`)
      .then((response) => {
        setQuiz(response.data);
        const indexes = generateRandomIndexes(response.data.length);
        setRandomQuestionIndexes(indexes);
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

  const data = getTopFields()
    .slice(0, 5)
    .map((field) => {
      const percentage =
        (scores[field] / Object.values(scores).reduce((a, b) => a + b, 0)) *
        100;
      return {
        title: field,
        value: scores[field],
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        label: `${field} (${percentage.toFixed(2)}%)`,
      };
    });

  const currentQuestion = quiz[randomQuestionIndexes[currentQuestionIndex]];

  return (
    <div className="quiz">
      {quiz.length > 0 ? (
        <div className="quiz__container">
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
            {currentQuestionIndex < 2 && (
              <div
                className="quiz__button quiz__button--next"
                onClick={handleNextQuestion}
              >
                Next Question
              </div>
            )}
            {currentQuestionIndex > 0 && (
              <div
                className="quiz__button quiz__button--previous"
                onClick={handlePreviousQuestion}
              >
                Previous Question
              </div>
            )}

            {currentQuestionIndex === 2 && (
              <div
                className="quiz__button quiz__button--submit"
                onClick={calculateScores}
              >
                Submit
              </div>
            )}
          </div>
          {Object.keys(scores).length > 0 && (
            <div className="quiz__result">
              <p className="quiz__result-text">
                Top fields based on your answers:
              </p>
              <ul className="quiz__result-list">
                {getTopFields().map((field) => (
                  <li className="quiz__result-item" key={field}>
                    {field}
                  </li>
                ))}
              </ul>
              <PieChart
                data={data}
                label={({ dataEntry }) => dataEntry.label}
                labelStyle={{
                  fontSize: "2px",
                  fontFamily: "sans-serif",
                  fill: "#fff",
                }}
              />
              <Link to="/job-search" state={{ values: getTopFields() }}>
                Job Search
              </Link>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
