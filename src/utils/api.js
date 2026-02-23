export async function getArticles() {
  const result = await fetch(`https://nc-news-0plp.onrender.com/api/articles`);

  return result.json();
}

export async function getUsers() {
  const result = await fetch(`https://nc-news-0plp.onrender.com/api/users`);

  return result.json();
}

export async function getArticlesMostPopular() {
  const res = await fetch(
    "https://nc-news-0plp.onrender.com/api/articles?sort_by=votes&order=desc",
  );
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data = await res.json();
  return data.articles;
}
