import { Link } from "react-router";
import heart from "../assets/heart.png";
import comment from "../assets/comment.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";

export default function ListCard(props) {
  const { id, title, author, body, commentCount, date, topic, votes, image } =
    props;
  return (
    <article className="article-card">
      <Link to={`/articles/${id}`} className="card-media">
        <img className="card-img" src={image} alt={`An image for ${title}`} />
      </Link>

      <div className="card-content">
        <div className="card-top">
          <span className="topic-pill">{topic}</span>
        </div>

        <h3 className="card-title">{title}</h3>

        <div className="card-meta">
          <div className="meta-item">
            <img
              className="meta-icon"
              src={userIcon}
              alt=""
              aria-hidden="true"
            />
            <span>{author}</span>
          </div>

          <div className="meta-item">
            <img
              className="meta-icon"
              src={calendar}
              alt=""
              aria-hidden="true"
            />
            <span>{new Date(date).toLocaleDateString("en-GB")}</span>
          </div>

          <div className="meta-item">
            <img
              className="meta-icon"
              src={comment}
              alt=""
              aria-hidden="true"
            />
            <span>{commentCount}</span>
          </div>

          <div className="meta-item">
            <img className="meta-icon" src={heart} alt="" aria-hidden="true" />
            <span>{votes}</span>
          </div>
        </div>

        <Link to={`/articles/${id}`} className="card-cta">
          Read More
        </Link>
      </div>
    </article>
  );
}
