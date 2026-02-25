import { getArticlesMostPopular } from "../utils/api";
import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";

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
      <div className="icon-text">
        <h2>
          <img
            className="fire-icon"
            src="src/assets/fire-flame.png"
            alt="fire-icon"
          />
          Top Articles
        </h2>
      </div>
      <div className="articles-list">
        {articles.map((article) => {
          return (
            <ListCard
              key={article.article_id}
              id={article.article_id}
              title={article.title}
              author={article.author}
              body={article.body}
              commentCount={article.comment_count}
              date={article.created_at}
              topic={article.topic}
              votes={article.votes}
              image={article.article_img_url}
            />
          );
        })}
      </div>
    </>
  );
}
