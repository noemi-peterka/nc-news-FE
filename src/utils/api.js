export async function getArticles() {
  const result = await fetch(`https://nc-news-0plp.onrender.com/api/articles`);

  return result.json();
}
