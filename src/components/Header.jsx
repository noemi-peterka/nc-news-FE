import Navbar from "./Navbar";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "./User";
import logo from "../assets/logo.png";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-text" aria-label="Go to homepage">
          <h1>NC News</h1>
        </Link>

        <div
          className="user-chip"
          title={`Logged in as ${loggedInUser.username}`}
        >
          <img
            src={loggedInUser.avatar_url}
            alt={loggedInUser.username}
            className="user-avatar"
          />
          <div className="user-meta">
            <span className="user-label">Logged in</span>
            <span className="user-name">{loggedInUser.username}</span>
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
}
