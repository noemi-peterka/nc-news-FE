import bin from "../assets/recycle-bin.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";
import heart from "../assets/heart.png";
import { useContext } from "react";
import { UserContext } from "./User";

export default function CommentCard({
  author,
  body,
  date,
  votes,
  onDelete,
  commentId,
}) {
  const { loggedInUser } = useContext(UserContext);
  const canDelete = loggedInUser?.username === author;
  console.log(commentId);
  return (
    <div className="comment-card">
      <div className="comment-top">
        <div className="comment-meta">
          <div className="meta-item">
            <img
              className="meta-icon"
              src={userIcon}
              alt=""
              aria-hidden="true"
            />
            <span className="comment-author">{author}</span>
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
        </div>

        {canDelete && (
          <button
            className="comment-icon-btn"
            aria-label="Delete comment"
            onClick={() => onDelete(commentId)}
          >
            <img className="meta-icon" src={bin} alt="" aria-hidden="true" />
          </button>
        )}
      </div>

      <p className="comment-body">{body}</p>

      <div className="comment-actions">
        <div className="meta-item">
          <img className="meta-icon" src={heart} alt="" aria-hidden="true" />
          <span>{votes}</span>
        </div>
      </div>
    </div>
  );
}
