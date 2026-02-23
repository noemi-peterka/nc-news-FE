import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>NC News</h1>
        <span className="signed-in-user">Signed in user placeholder</span>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </>
  );
}
