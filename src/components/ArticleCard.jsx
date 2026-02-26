import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getArticlesById,
  getCommentsByArticleId,
  upvoteArticle,
  downvoteArticle,
  deleteComment,
} from "../utils/api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import heart from "../assets/heart.png";
import redHeart from "../assets/redHeart.png";
import commentIcon from "../assets/comment.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";

export default function ArticleCard() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [voted, setVoted] = useState(false);
  const [deleteErr, setDeleteErr] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const result = await getArticlesById(id);
      setArticle(result[0]);
      setVoted(false); // reset vote UI when switching article
    }
    fetchArticle();
  }, [id]);

  useEffect(() => {
    async function fetchComments() {
      const result = await getCommentsByArticleId(id);
      setComments(result);
    }
    fetchComments();
  }, [id]);

  async function handleUpvote() {
    if (!article) return;
    setVoted(true);
    setArticle((curr) => ({ ...curr, votes: curr.votes + 1 }));
    try {
      await upvoteArticle(id);
    } catch {
      // rollback if request fails
      setVoted(false);
      setArticle((curr) => ({ ...curr, votes: curr.votes - 1 }));
    }
  }

  async function handleDownvote() {
    if (!article) return;
    setVoted(false);
    setArticle((curr) => ({ ...curr, votes: curr.votes - 1 }));
    try {
      await downvoteArticle(id);
    } catch {
      // rollback if request fails
      setVoted(true);
      setArticle((curr) => ({ ...curr, votes: curr.votes + 1 }));
    }
  }

  async function handleDeleteComment(commentId) {
    setDeleteErr(null);
    const prevComments = comments;
    setComments((curr) => curr.filter((c) => c.comment_id !== commentId));

    try {
      await deleteComment(commentId);
    } catch (err) {
      setComments(prevComments);
      setDeleteErr(err.message);
    }
  }
  if (!article) return <p>Loading...</p>;

  return (
    <article className="article-detail">
      <div className="article-hero">
        <img
          className="article-hero-img"
          src={article.article_img_url}
          alt=""
        />
      </div>

      <div className="article-detail-card">
        <div className="article-detail-top">
          <span className="topic-pill">{article.topic}</span>
        </div>

        <h1 className="article-detail-title">{article.title}</h1>

        <div className="article-detail-meta">
          <div className="meta-item">
            <img
              className="meta-icon"
              src={userIcon}
              alt=""
              aria-hidden="true"
            />
            <span>{article.author}</span>
          </div>

          <div className="meta-item">
            <img
              className="meta-icon"
              src={calendar}
              alt=""
              aria-hidden="true"
            />
            <span>
              {new Date(article.created_at).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>

        <div className="article-detail-body">{article.body}</div>

        <div className="article-actions">
          {!voted ? (
            <button className="action-btn" onClick={handleUpvote}>
              <img
                className="action-icon"
                src={heart}
                alt=""
                aria-hidden="true"
              />
              <span>{article.votes}</span>
            </button>
          ) : (
            <button className="action-btn" onClick={handleDownvote}>
              <img
                className="action-icon"
                src={redHeart}
                alt=""
                aria-hidden="true"
              />
              <span>{article.votes}</span>
            </button>
          )}

          <button
            className="action-btn"
            onClick={() => setShowComments((s) => !s)}
          >
            <img
              className="action-icon"
              src={commentIcon}
              alt=""
              aria-hidden="true"
            />
            <span>{comments.length}</span>
            <span className="action-label">
              {showComments ? "Hide comments" : "Show comments"}
            </span>
          </button>
        </div>

        <div className="comments-section">
          <h2 className="comments-title">Comments</h2>
          <CommentForm id={id} setComments={setComments} />
          {deleteErr && <p className="form-error">{deleteErr}</p>}
          {showComments && (
            <div className="comments-list">
              {comments.map((c) => (
                <CommentCard
                  key={c.comment_id}
                  commentId={c.comment_id}
                  id={c.article_id}
                  author={c.author}
                  body={c.body}
                  date={c.created_at}
                  votes={c.votes}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
