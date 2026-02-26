import { useState } from "react";
import { postTopic } from "../utils/api";
import normalizeSlug from "../utils/helpers";

export default function TopicForm({ onCreated }) {
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);

    const cleanSlug = normalizeSlug(slug);
    const cleanDesc = description.trim();

    if (!cleanSlug || !cleanDesc) {
      setErr("Please provide both a slug and a description.");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(cleanSlug)) {
      setErr("Slug can only contain letters, numbers, and hyphens.");
      return;
    }

    setIsPosting(true);
    try {
      const newTopic = await postTopic({
        slug: cleanSlug,
        description: cleanDesc,
      });
      onCreated(newTopic);
      setSlug("");
      setDescription("");
    } catch (e) {
      setErr(e.message);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <div className="topic-form-header">
        <h3 className="topic-form-title">Add a topic</h3>
        <p className="topic-form-subtitle">
          Create a new category for articles.
        </p>
      </div>

      <label>
        Slug
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. politics"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="For any political articles"
          rows={3}
        />
      </label>

      <div className="topic-form-actions">
        {err && <p className="form-error">{err}</p>}
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Creating…" : "Create topic"}
        </button>
      </div>
    </form>
  );
}
