import { Link } from "react-router";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/articles" className="nav-link">
        Articles
      </Link>

      <Link to="/topics" className="nav-link">
        Topics
      </Link>
    </nav>
  );
}
