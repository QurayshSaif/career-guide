import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/career-guide-logo.png";

const Header = () => {
  const location = useLocation();
  const isQuiz =
    location.pathname.startsWith("/career-quiz") ||
    location.pathname === "/" ||
    location.pathname === "/demo-career-quiz";
  const isCareerDetails = location.pathname.startsWith("/job-search");

  return (
    <div className="header">
      <div className="header__contents">
        <Link to="/">
          <img className="header__logo" src={logo} alt="career logo" />
        </Link>
        <div className="header__nav">
          <Link
            to="/"
            className={isQuiz ? " header__active" : "header__inactive"}
          >
            Career Quiz
          </Link>
          <Link
            to="/job-search"
            className={isCareerDetails ? " header__active" : "header__inactive"}
          >
            Job Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
