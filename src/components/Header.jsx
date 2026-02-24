import Navbar from "./Navbar";
import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <div className="header">
        <Link to="/">
          <h1>NC News</h1>
        </Link>

        <span className="signed-in-user">Signed in user placeholder</span>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </>
  );
}
