import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getArticlesById } from "../utils/api";
import Accordion from "react-bootstrap/Accordion";

export default function ArticleCard() {
  let params = useParams();
  let id = params.id;

  const [article, setArticle] = useState([]);

  useEffect(() => {
    async function fetchArticle() {
      const result = await getArticlesById(id);

      setArticle(result[0]);
    }
    fetchArticle();
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
        <button>Comments</button>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}
