import Navbar from "./Navbar";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "./User";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>NC News</h1>
        </Link>

        <div id="login-info">
          <p>Logged in as: {loggedInUser.username}</p>
          <img src={loggedInUser.avatar_url} className="logged-in-img" />
        </div>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </>
  );
}
