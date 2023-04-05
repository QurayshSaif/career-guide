import { useState, useEffect } from "react";
import "./CareerTest.scss";
import axios from "axios";
import { API_URL } from "../../utils/api";

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
    return sortedFields.slice(0, 3);
  };

  const currentQuestion = quiz[currentQuestionIndex];

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
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
