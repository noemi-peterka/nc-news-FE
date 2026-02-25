export async function getArticles(currentPage) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles?_p=${
      currentPage + 1
    }&_limit=${postsPerPage}`,
  );

  const data = await res.json();
  return data.articles;
}

export async function getUsers() {
  const result = await fetch(`https://nc-news-0plp.onrender.com/api/users`);

  return result.json();
}

export async function getArticlesMostPopular() {
  const res = await fetch(
    "https://nc-news-0plp.onrender.com/api/articles?sort_by=votes&order=asc",
  );

  const data = await res.json();
  return data.articles;
}

export async function getTopics() {
  const res = await fetch("https://nc-news-0plp.onrender.com/api/topics");

  const data = await res.json();
  return data.topics;
}

export async function getArticlesById(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}`,
  );

  const data = await res.json();
  return data.article;
}

export async function getCommentsByArticleId(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}/comments`,
  );

  const data = await res.json();
  return data.comments;
}

export async function upvoteArticle(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        "inc_votes": 1,
      }),
    },
  );

  const data = await res.json();
  console.log(data);
  return data.article;
}

export async function downvoteArticle(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        "inc_votes": -1,
      }),
    },
  );

  const data = await res.json();
  console.log(data);
  return data.article;
}
