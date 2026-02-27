import { getArticlesMostPopular } from "../utils/api";
import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import flame from "../assets/fire-flame.png";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchArticles() {
      setIsLoading(true);
      setErr(null);
      try {
        const result = await getArticlesMostPopular();

        if (!ignore) setArticles(result);
      } catch (e) {
        if (!ignore) setErr(e.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    fetchArticles();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-left">
          <div className="page-kicker">
            <img
              className="kicker-icon"
              src={flame}
              alt=""
              aria-hidden="true"
            />
            Home
          </div>
          <h2 className="page-title">Top Articles</h2>
          <p className="page-subtitle">Most popular stories right now</p>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {err && <p>{err}</p>}

      <div className="articles-list">
        {articles.map((article) => (
          <ListCard
            key={article.article_id}
            id={article.article_id}
            title={article.title}
            author={article.author}
            commentCount={article.comment_count}
            date={article.created_at}
            topic={article.topic}
            votes={article.votes}
            image={article.article_img_url}
          />
        ))}
      </div>
    </>
  );
}
