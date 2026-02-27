import { getTopics } from "../utils/api";
import { useState, useEffect } from "react";
import TopicCard from "../components/TopicCard";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const result = await getTopics();
      setTopics(result);
    }
    fetchTopics();
  }, []);
  return (
    <>
      <h2 className="topic-header">All Topics</h2>

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
