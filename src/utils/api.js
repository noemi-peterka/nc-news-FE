export async function getArticlesMostPopular() {
  const res = await fetch(
    "https://nc-news-0plp.onrender.com/api/articles?sort_by=votes&order=desc",
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || `Failed to get articles(${res.status})`);
  }
  return data.articles;
}

export async function getArticles({ topic, sort_by, order, p, limit } = {}) {
  const qs = new URLSearchParams();

  if (topic) qs.set("topic", topic);
  if (sort_by) qs.set("sort_by", sort_by);
  if (order) qs.set("order", order);
  if (p) qs.set("p", String(p));
  if (limit) qs.set("limit", String(limit));

  const url = `https://nc-news-0plp.onrender.com/api/articles${qs.toString() ? `?${qs.toString()}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch articles (${res.status})`);

  const data = await res.json();
  return data.articles;
}

export async function getTopics() {
  const res = await fetch("https://nc-news-0plp.onrender.com/api/topics");

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || `Failed to get topics(${res.status})`);
  }
  return data.topics;
}

export async function getArticlesById(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}`,
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || `Failed to get article(${res.status})`);
  }
  return data.article;
}

export async function getCommentsByArticleId(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/articles/${id}/comments`,
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || `Failed to get comments(${res.status})`);
  }
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
  if (!res.ok) {
    throw new Error(data.msg || `Failed to upvote article(${res.status})`);
  }
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
  if (!res.ok) {
    throw new Error(data.msg || `Failed to downvote article(${res.status})`);
  }
  return data.article;
}

export async function upvoteComment(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/comments/${id}`,
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
  if (!res.ok) {
    throw new Error(data.msg || `Failed to upvote comment(${res.status})`);
  }
  return data.comment;
}

export async function downvoteComment(id) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/comments/${id}`,
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
  if (!res.ok) {
    throw new Error(data.msg || `Failed to downvote comment(${res.status})`);
  }
  return data.comment;
}

export async function getUser() {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/users/grumpy19`,
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || `Failed to get user(${res.status})`);
  }
  return data.user[0];
}

export async function deleteComment(commentId) {
  const res = await fetch(
    `https://nc-news-0plp.onrender.com/api/comments/${commentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to delete comment (${res.status})`);
  }
  return true;
}

export async function postTopic({ slug, description }) {
  const res = await fetch(`https://nc-news-0plp.onrender.com/api/topics`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      "slug": slug,
      "description": description,
    }),
  });

  const data = await res.json().catch(() => {});
  if (!res.ok) {
    throw new Error(data.msg || `Failed to create topic(${res.status})`);
  }
  return data.topic;
}

export async function postArticle({ title, topic, author, body }) {
  const res = await fetch(`https://nc-news-0plp.onrender.com/api/topics`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      "slug": slug,
      "description": description,
    }),
  });

  const data = await res.json().catch(() => {});
  if (!res.ok) {
    throw new Error(data.msg || `Failed to create topic(${res.status})`);
  }
  return data.topic;
}
