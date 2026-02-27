import { Link } from "react-router";

export default function () {
  return (
    <div className="page-hero">
      <div className="page-hero-left">
        <div className="page-kicker">404</div>
        <h2 className="page-title">Page not found</h2>
        <p className="page-subtitle">
          The page you’re looking for doesn’t exist. Try going back home.
        </p>
        <Link className="card-cta" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
