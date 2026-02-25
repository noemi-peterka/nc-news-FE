import { useState, useEffect } from "react";

export default function CommentForm(props) {
  let { id } = props;
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    async function postComment(id, comment) {
      const res = await fetch(
        `https://nc-news-0plp.onrender.com/api/articles/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            "author": "grumpy19",
            "body": comment,
          }),
        },
      );

      const data = await res.json();
      console.log(data);
      return data.article;
    }
    postComment(id, comment);
    setComment("");
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
