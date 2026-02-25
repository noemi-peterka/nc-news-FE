import { Link } from "react-router";

export default function ListCard(props) {
  const { id, title, author, body, commentCount, date, topic, votes, image } =
    props;
  return (
    <>
      <div className="article-card">
        <img src={`${image}`} alt={`An image for ${title}`} />
        <h3>{title}</h3>
        <div className="topic">{topic}</div>
        <div className="icon-text">
          <img
            className="user-icon"
            src="src/assets/user.png"
            alt="user icon"
          />
          {author}
        </div>

        <div className="icon-text">
          <img
            className="calendar-icon"
            src="src/assets/calendar.png"
            alt="calendar icon"
          />
          {new Date(date).toLocaleDateString("en-GB")}
        </div>
        <div className="icon-text">
          <img
            className="comment-icon"
            src="src/assets/comment.png"
            alt="comment icon"
          />
          {commentCount}
        </div>
        <div className="icon-text">
          <img
            className="heart-icon"
            src="src/assets/heart.png"
            alt="empty heart icon"
          />{" "}
          {votes}
        </div>
        <Link to={`/articles/${id}`} className="nav-link">
          Read More
        </Link>
        {/* on click will take you to article card */}
      </div>
    </>
  );
}
