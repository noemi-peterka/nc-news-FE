import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import { useParams } from "react-router";
import { getArticlesByTopic, getArticles } from "../utils/api";

export default function ArticlePage() {
  let { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState(slug);

  //Need to fix this so that after clicking on articles by topics, you can then go to articles
  // at the moment its keeping the topics articles in show

  useEffect(() => {
    if (topic) {
      async function fetchArticles() {
        const result = await getArticlesByTopic(topic);

        setArticles(result);
      }
      fetchArticles();
    } else {
      async function fetchArticles() {
        const result = await getArticles();

        setArticles(result);
      }
      fetchArticles();
    }
  }, [slug]);

  return (
    <>
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
