import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  getArticlesById,
  getCommentsByArticleId,
  upvoteArticle,
  downvoteArticle,
} from "../utils/api";
import CommentCard from "./CommentCard";

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
  }, []);

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
        <p>
          {article.votes}
          {!voted && (
            <button
              onClick={() => {
                upvoteArticleById(id);
              }}
            >
              {" "}
              &hearts;
            </button>
          )}

          {voted && (
            <button
              onClick={() => {
                downvoteArticleById(id);
              }}
            >
              {" "}
              &#10084;&#65039;
            </button>
          )}
        </p>

        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          {comments.length}{" "}
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 121.86 122.88"
          >
            <path d="M30.28,110.09,49.37,91.78A3.84,3.84,0,0,1,52,90.72h60a2.15,2.15,0,0,0,2.16-2.16V9.82a2.16,2.16,0,0,0-.64-1.52A2.19,2.19,0,0,0,112,7.66H9.82A2.24,2.24,0,0,0,7.65,9.82V88.55a2.19,2.19,0,0,0,2.17,2.16H26.46a3.83,3.83,0,0,1,3.82,3.83v15.55ZM28.45,63.56a3.83,3.83,0,1,1,0-7.66h53a3.83,3.83,0,0,1,0,7.66Zm0-24.86a3.83,3.83,0,1,1,0-7.65h65a3.83,3.83,0,0,1,0,7.65ZM53.54,98.36,29.27,121.64a3.82,3.82,0,0,1-6.64-2.59V98.36H9.82A9.87,9.87,0,0,1,0,88.55V9.82A9.9,9.9,0,0,1,9.82,0H112a9.87,9.87,0,0,1,9.82,9.82V88.55A9.85,9.85,0,0,1,112,98.36Z" />
          </svg>
        </button>

        <form>
          <label>
            Add a comment:
            <input type="text" />
          </label>
        </form>

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
