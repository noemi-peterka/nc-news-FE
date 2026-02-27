import { getTopics } from "../utils/api";
import { useState, useEffect } from "react";
import TopicCard from "../components/TopicCard";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchTopics() {
      setIsLoading(true);
      setErr(null);

      try {
        const result = await getTopics();

        if (!ignore) setTopics(result);
      } catch (e) {
        if (!ignore) setErr(e.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchTopics();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <h2 className="topic-header">All Topics</h2>

      {isLoading && <p>Loading...</p>}
      {err && <p>{err}</p>}

      <div className="topics-list">
        {topics.map((topic) => {
          return (
            <TopicCard
              key={topic.slug}
              slug={topic.slug}
              description={topic.description}
              image={topic.img_url}
            />
          );
        })}
      </div>
    </>
  );
}
