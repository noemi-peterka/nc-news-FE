import bin from "../assets/recycle-bin.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";
import heart from "../assets/heart.png";
import redHeart from "../assets/redHeart.png";
import { useContext, useState } from "react";
import { UserContext } from "./User";

export default function CommentCard({
  commentId,
  author,
  body,
  date,
  votes,
  onDelete,
  onUpvote,
  onDownvote,
}) {
  const { loggedInUser } = useContext(UserContext);
  const canDelete = loggedInUser?.username === author;

  const [voted, setVoted] = useState(false);

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
        {!voted ? (
          <button
            className="action-btn"
            onClick={() => {
              setVoted(true);
              onUpvote(commentId);
            }}
          >
            <img
              className="action-icon"
              src={heart}
              alt=""
              aria-hidden="true"
            />
            <span>{votes}</span>
          </button>
        ) : (
          <button
            className="action-btn"
            onClick={() => {
              setVoted(false);
              onDownvote(commentId);
            }}
          >
            <img
              className="action-icon"
              src={redHeart}
              alt=""
              aria-hidden="true"
            />
            <span>{votes}</span>
          </button>
        )}
      </div>
    </div>
  );
}
