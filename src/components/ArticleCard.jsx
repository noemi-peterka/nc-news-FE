import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getArticlesById, getCommentsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";

export default function ArticleCard() {
  let params = useParams();
  let id = params.id;

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const result = await getArticlesById(id);

      setArticle(result[0]);
    }
    fetchArticle();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      const result = await getCommentsByArticleId(id);

      setComments(result);
    }
    fetchComments();
  }, []);
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
          <button
            onClick={() => {
              // increase the vote count
            }}
          >
            &hearts;
          </button>
        </p>
        <button
          onClick={() => {
            setHide(!hide);
          }}
        >
          Comments
        </button>

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
