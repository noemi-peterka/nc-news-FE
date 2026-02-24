import { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import ReactPaginate from "react-paginate";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        `https://nc-news-0plp.onrender.com/api/articles?_p=${
          currentPage + 1
        }&_limit=${postsPerPage}`,
      );
      const data = await res.json();

      const totalPosts = res.headers.get("X-Total-Count");
      setPageCount(Math.ceil(totalPosts / postsPerPage));

      setArticles(data.articles);
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

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

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
}
