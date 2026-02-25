import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getArticlesById,
  getCommentsByArticleId,
  upvoteArticle,
  downvoteArticle,
} from "../utils/api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

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
        <p>{article.author}</p>
        <p>{new Date(article.created_at).toLocaleDateString("en-GB")}</p>
        <h2>{article.title}</h2>
        <p>{article.body}</p>

        {!voted && (
          <div className="icon-text">
            <button
              onClick={() => {
                upvoteArticleById(id);
              }}
            >
              <img
                className="heart-icon"
                src="src/assets/heart.png"
                alt="empty heart icon"
              />
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
              <img
                className="heart-icon"
                src="src/assets/redHeart.png"
                alt="red heart icon"
              />
              {article.votes}
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          <img
            className="comment-icon"
            src="src/assets/comment.png"
            alt="comment icon"
          />
          {comments.length}
        </button>

        <CommentForm id={id} setComments={setComments} />

        {/* Above is where the input form for the comments will go */}

        {!hide && (
          <div className="comments-list">
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
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
