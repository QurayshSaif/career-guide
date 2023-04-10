import { Link } from "react-router-dom";
import "./QuizOptions.scss";

export default function QuizOptions() {
  return (
    <div className="quiz-length">
      <h1 className="quiz-length__title">Choose a Career Quiz Option:</h1>
      <Link className="quiz-length__option" to="/quick-career-quiz">
        <div className="quiz-length__text">Quick Quiz (5 Questions)</div>
      </Link>
      <Link className="quiz-length__option" to="/career-quiz">
        <div className="quiz-length__text">Detailed Quiz (20 Questions)</div>
      </Link>
    </div>
  );
}
