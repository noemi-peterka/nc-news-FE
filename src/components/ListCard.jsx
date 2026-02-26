import { Link } from "react-router";
import heart from "../assets/heart.png";
import redHeart from "../assets/redHeart.png";
import comment from "../assets/comment.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";

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
          <img className="user-icon" src={userIcon} alt="user icon" />
          {author}
        </div>

        <div className="icon-text">
          <img className="calendar-icon" src={calendar} alt="calendar icon" />
          {new Date(date).toLocaleDateString("en-GB")}
        </div>
        <div className="icon-text">
          <img className="comment-icon" src={comment} alt="comment icon" />
          {commentCount}
        </div>
        <div className="icon-text">
          <img className="heart-icon" src={heart} alt="empty heart icon" />{" "}
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
