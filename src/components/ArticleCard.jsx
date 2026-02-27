import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getArticlesById,
  getCommentsByArticleId,
  upvoteArticle,
  downvoteArticle,
  deleteComment,
  upvoteComment,
  downvoteComment,
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
  const [commentSort, setCommentSort] = useState("newest");
  const [articleVoted, setArticleVoted] = useState(false);
  const [err, setErr] = useState(null);

  const [deleteErr, setDeleteErr] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchArticle() {
      setErr(null);
      setArticle(null);
      try {
        const result = await getArticlesById(id);

        if (!ignore) setArticle(result[0]);
      } catch (e) {
        if (!ignore) setErr(e);
      }

      setArticle(result[0]);
      setArticleVoted(false);
    }

    fetchArticle();
    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    async function fetchComments() {
      const result = await getCommentsByArticleId(id);
      setComments(result);
    }
    fetchComments();
  }, [id]);

  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === "votes") return b.votes - a.votes;
    if (commentSort === "oldest")
      return newDate(a.created_at) - new Date(b.created_at);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  async function handleUpvoteArticle() {
    if (!article) return;
    setArticleVoted(true);
    setArticle((curr) => ({ ...curr, votes: curr.votes + 1 }));

    try {
      await upvoteArticle(id);
    } catch {
      setArticleVoted(false);
      setArticle((curr) => ({ ...curr, votes: curr.votes - 1 }));
    }
  }

  async function handleDownvoteArticle() {
    if (!article) return;
    setArticleVoted(false);
    setArticle((curr) => ({ ...curr, votes: curr.votes - 1 }));

    try {
      await downvoteArticle(id);
    } catch {
      setArticleVoted(true);
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

  async function handleUpvoteComment(commentId) {
    setComments((curr) =>
      curr.map((c) =>
        c.comment_id === commentId ? { ...c, votes: c.votes + 1 } : c,
      ),
    );

    try {
      await upvoteComment(commentId);
    } catch {
      setComments((curr) =>
        curr.map((c) =>
          c.comment_id === commentId ? { ...c, votes: c.votes - 1 } : c,
        ),
      );
    }
  }

  async function handleDownvoteComment(commentId) {
    setComments((curr) =>
      curr.map((c) =>
        c.comment_id === commentId ? { ...c, votes: c.votes - 1 } : c,
      ),
    );

    try {
      await downvoteComment(commentId);
    } catch {
      setComments((curr) =>
        curr.map((c) =>
          c.comment_id === commentId ? { ...c, votes: c.votes + 1 } : c,
        ),
      );
    }
  }
  if (err?.status === 404) {
    return (
      <div className="page-hero">
        <div className="page-hero-left">
          <div className="page-kicker">Not found</div>
          <h2 className="page-title">Article not found</h2>
          <p className="page-subtitle">
            This article may have been deleted or the link is incorrect.
          </p>
          <Link className="card-cta" to="/articles">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }
  if (err)
    return (
      <p className="form-error">Something went wrong. Please try again.</p>
    );

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
          {!articleVoted ? (
            <button className="action-btn" onClick={handleUpvoteArticle}>
              <img
                className="action-icon"
                src={heart}
                alt=""
                aria-hidden="true"
              />
              <span>{article.votes}</span>
            </button>
          ) : (
            <button className="action-btn" onClick={handleDownvoteArticle}>
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
              {sortedComments.map((c) => (
                <CommentCard
                  key={c.comment_id}
                  commentId={c.comment_id}
                  author={c.author}
                  body={c.body}
                  date={c.created_at}
                  votes={c.votes}
                  onDelete={handleDeleteComment}
                  onUpvote={handleUpvoteComment}
                  onDownvote={handleDownvoteComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
