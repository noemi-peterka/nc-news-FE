import { useState } from "react";

export default function CommentForm(props) {
  let { id } = props;
  console.log(id);
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    async function downvoteArticle(id) {
      const res = await fetch(
        `https://nc-news-0plp.onrender.com/api/articles/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            "inc_votes": -1,
          }),
        },
      );

      const data = await res.json();
      console.log(data);
      return data.article;
    }

    setNewItem("");
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
// access to comments list

// needs more work!
