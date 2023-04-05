import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/career-guide-logo.png";

const Header = () => {
  const location = useLocation();
  const isQuiz =
    location.pathname.startsWith("/career-quiz") || location.pathname === "/";
  const isCareerDetails = location.pathname.startsWith("/career-details");

  return (
    <div className="header">
      <div className="header__contents">
        <Link to="/">
          <img className="header__logo" src={logo} alt="career logo" />
        </Link>
        <div className="header__nav">
          <Link
            to="/career-quiz"
            className={isQuiz ? " header__active" : "header__inactive"}
          >
            Career Quiz
          </Link>
          <Link
            to="/career-details"
            className={isCareerDetails ? " header__active" : "header__inactive"}
          >
            Career Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
