import { Link } from "react-router-dom";
import "./ErrorPage.scss";

export default function ErrorPage() {
  return (
    <div className="error">
      <img
        className="error__image"
        src="https://thumbs.dreamstime.com/b/oops-sign-18087812.jpg"
        alt="oops img"
      />
      <h1 className="error__title">404 - PAGE NOT FOUND</h1>
      <Link className="error__link" to="/">
        Go Home
      </Link>
    </div>
  );
}
