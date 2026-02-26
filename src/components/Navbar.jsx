import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <NavLink
        to="/articles"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Articles
      </NavLink>

      <NavLink
        to="/topics"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Topics
      </NavLink>
    </nav>
  );
}
