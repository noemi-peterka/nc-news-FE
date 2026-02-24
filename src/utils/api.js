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
