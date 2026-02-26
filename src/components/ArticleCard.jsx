import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getArticlesById,
  getCommentsByArticleId,
  upvoteArticle,
  downvoteArticle,
  getArticles,
} from "../utils/api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import heart from "../assets/heart.png";
import redHeart from "../assets/redHeart.png";
import comment from "../assets/comment.png";
import userIcon from "../assets/user.png";
import calendar from "../assets/calendar.png";

export default function ArticleCard() {
  let params = useParams();
  let id = params.id;

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [hide, setHide] = useState(true);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const result = await getArticlesById(id);

      setArticle(result[0]);
    }
    fetchArticle();
  }, [voted]);

  useEffect(() => {
    async function fetchComments() {
      const result = await getCommentsByArticleId(id);

      setComments(result);
    }
    fetchComments();
  }, [comments]);

  async function upvoteArticleById(id) {
    const result = await upvoteArticle(id);

    setVoted(true);
  }

  async function downvoteArticleById(id) {
    const result = await downvoteArticle(id);

    setVoted(false);
  }

  return (
    <>
      <div className="article-card">
        <img src={article.article_img_url} alt="" />
        <p>{article.topic}</p>
        <div className="icon-text">
          <img className="user-icon" src={userIcon} alt="user icon" />
          {article.author}
        </div>
        <div className="icon-text">
          <img className="calendar-icon" src={calendar} alt="calendar icon" />
          {new Date(article.created_at).toLocaleDateString("en-GB")}
        </div>
        <h2>{article.title}</h2>
        <p>{article.body}</p>

        {!voted && (
          <div className="icon-text">
            <button
              onClick={() => {
                upvoteArticleById(id);
              }}
            >
              <img className="heart-icon" src={heart} alt="empty heart icon" />
              {article.votes}
            </button>
          </div>
        )}
        {voted && (
          <div className="icon-text">
            <button
              onClick={() => {
                downvoteArticleById(id);
              }}
            >
              {" "}
              <img className="heart-icon" src={redHeart} alt="red heart icon" />
              {article.votes}
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          <img className="comment-icon" src={comment} alt="comment icon" />
          {comments.length}
        </button>

        <CommentForm id={id} setComments={setComments} />

        {!hide && (
          <div className="comments-list">
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  commentId={comment.comment_id}
                  id={comment.article_id}
                  author={comment.author}
                  body={comment.body}
                  date={comment.created_at}
                  votes={comment.votes}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
