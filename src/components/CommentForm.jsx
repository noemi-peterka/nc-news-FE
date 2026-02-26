import { useState } from "react";

export default function CommentForm({ id, setComments }) {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [err, setErr] = useState(null);

  async function postComment(articleId, body) {
    const res = await fetch(
      `https://nc-news-0plp.onrender.com/api/articles/${articleId}/comments`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          author: "grumpy19",
          body,
        }),
      },
    );

    if (!res.ok) throw new Error(`Failed to post comment (${res.status})`);
    const data = await res.json();
    return data.comment;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr(null);

    const trimmed = comment.trim();
    if (!trimmed) return;

    setIsPosting(true);

    try {
      const newComment = await postComment(id, trimmed);

      setComments((curr) => [newComment, ...curr]);
      setComment("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label className="comment-label" htmlFor="comment">
        Add a comment
      </label>

      <textarea
        id="comment"
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write something…"
        rows={3}
      />

      <div className="comment-form-actions">
        {err && <p className="form-error">{err}</p>}
        <button className="comment-submit" type="submit" disabled={isPosting}>
          {isPosting ? "Posting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
