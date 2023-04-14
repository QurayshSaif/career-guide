import { useState, useEffect } from "react";
import "../CareerTest/CareerTest.scss";
import axios from "axios";
import { API_URL } from "../../utils/api";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import backarrow from "../../assets/arrow-back.svg";

export default function QuickCareerTest() {
  const [quiz, setQuiz] = useState([]);
  const [scoringSystem, setScoringSystem] = useState({});
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);

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
      .get(`${API_URL}/questions/quick`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleAnswerSelect = (answerValue) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerValue;
    setAnswers(updatedAnswers);
    setDisableNextButton(false);
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === undefined) {
      setShowMessage(true);
      setDisableNextButton(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setDisableNextButton(answers[currentQuestionIndex + 1] === undefined);
    setShowMessage(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScores = () => {
    if (answers[currentQuestionIndex] === undefined) {
      setShowMessage(true);
      setDisableNextButton(true);
      return;
    }
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
  };

  const getTopFields = () => {
    const sortedFields = Object.entries(scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([field]) => field);
    return sortedFields.slice(0, 5);
  };

  const getRandomColor = () => {
    const min = 50;
    const max = 205;
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
  console.log(currentQuestionIndex);

  return (
    <div className="quiz-parent">
      <div className="quiz">
        <div className="quiz__container">
          {quiz.length > 0 ? (
            <>
              {Object.keys(scores).length === 0 && (
                <div>
                  <div className="quiz__question-container">
                    {currentQuestionIndex > 0 && (
                      <img
                        src={backarrow}
                        onClick={handlePreviousQuestion}
                        alt="Back Arrow"
                        className="quiz__arrow"
                      />
                    )}
                    <p className="quiz__question">{currentQuestion.question}</p>
                    <div className="quiz__qn-number">
                      ( {currentQuestionIndex + 1} / {quiz.length} )
                    </div>
                  </div>
                  <div className="quiz__option-container">
                    {currentQuestion.answers.map((answer) => (
                      <label className="quiz__label" key={answer.value}>
                        <input
                          className="quiz__input"
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={answer.value}
                          onChange={() => handleAnswerSelect(answer.value)}
                          checked={
                            answers[currentQuestionIndex] === answer.value
                          }
                        />
                        <span className="quiz__text">{answer.text}</span>
                      </label>
                    ))}
                  </div>

                  <div className="quiz__buttons">
                    {currentQuestionIndex < quiz.length - 1 && (
                      <div
                        className={`quiz__button quiz__button--next ${
                          disableNextButton && "quiz__button--disabled"
                        }`}
                        onClick={handleNextQuestion}
                      >
                        Next Question
                      </div>
                    )}

                    {currentQuestionIndex === quiz.length - 1 && (
                      <div
                        className={`quiz__button quiz__button--submit ${
                          disableNextButton && "quiz__button--disabled"
                        }`}
                        onClick={calculateScores}
                      >
                        Submit
                      </div>
                    )}
                    {showMessage && (
                      <div className="quiz__message">
                        Please select an option before proceeding!
                      </div>
                    )}
                  </div>
                </div>
              )}
              {Object.keys(scores).length > 0 && (
                <div className="quiz__result">
                  <p className="quiz__result-text">
                    Top Fields Based On Your Answers:
                  </p>
                  <div className="quiz__result-container">
                    <ol className="quiz__result-list">
                      {getTopFields().map((field) => (
                        <li className="quiz__result-item" key={field}>
                          {field}
                        </li>
                      ))}
                    </ol>

                    <PieChart
                      className="quiz__pie-chart"
                      data={data}
                      label={({ dataEntry }) => dataEntry.label}
                      labelStyle={{
                        fill: "#fff",
                        fontSize: "0.16rem",
                      }}
                    />
                  </div>
                  <div className="quiz__job-search-container">
                    <Link to="/">
                      <div className="quiz__job-search quiz__job-search--retake">
                        Retake Quiz
                      </div>
                    </Link>
                    <Link to="/job-search" state={{ values: getTopFields() }}>
                      <div className="quiz__job-search">Job Search</div>
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
}
