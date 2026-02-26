import { getTopics } from "../utils/api";
import { useState, useEffect } from "react";
import TopicCard from "../components/TopicCard";
import TopicForm from "../components/TopicForm";

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
      <h2>Topics</h2>
      <TopicForm
        onCreated={(newTopic) => {
          setTopics((curr) => {
            if (curr.some((t) => t.slug === newTopic.slug)) return curr;
            return [newTopic, ...curr];
          });
        }}
      />
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
