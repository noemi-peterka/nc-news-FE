import { getArticlesMostPopular } from "../utils/api";
import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import flame from "../assets/fire-flame.png";

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const result = await getArticlesMostPopular();
      setArticles(result);
    }
    fetchArticles();
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
