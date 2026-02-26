import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import { useParams } from "react-router";
import { getArticles } from "../utils/api";
import Dropdown from "../components/Dropdown";

export default function ArticlePage() {
  let { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const effectiveTopic = slug ?? topic;

  useEffect(() => {
    setPage(1);
  }, [effectiveTopic, sortBy, order]);

  useEffect(() => {
    let ignore = false;

    async function fetchArticles() {
      setIsLoading(true);
      setErr(null);

      try {
        const result = await getArticles({
          topic: effectiveTopic || undefined,
          sort_by: sortBy,
          order,
          p: page,
          limit,
        });

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
  }, [effectiveTopic, sortBy, order, page]);

  const hasNext = articles.length === limit;
  const hasPrev = page > 1;

  return (
    <>
      <Dropdown
        sortBy={sortBy}
        order={order}
        topic={slug ? slug : topic}
        onSortByChange={setSortBy}
        onOrderChange={setOrder}
        onTopicChange={(newTopic) => {
          if (!slug) setTopic(newTopic);
        }}
      />

      <div className="pagination">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={!hasPrev || isLoading}
        >
          ‹
        </button>

        <span className="page-indicator">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext || isLoading}
        >
          ›
        </button>
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
            body={article.body}
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
