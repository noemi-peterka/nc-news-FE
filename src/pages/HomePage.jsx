import { getArticlesMostPopular } from "../utils/api";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const result = await getArticlesMostPopular();
      setArticles(result);
    }
    fetchArticles();
  }, []);
  console.log(articles);
  return (
    <div className="articles-list">
      {articles.map((article) => {
        console.log(article.title);
        return (
          <ArticleCard
            key={article.id}
            title={article.title}
            author={article.author}
            body={article.body}
            commentCount={article.comment_count}
            date={article.created_at}
            topic={article.topic}
            votes={article.votes}
          />
        );
      })}
    </div>
  );
}
