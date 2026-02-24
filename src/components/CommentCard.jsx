export default function CommentCard(props) {
  const { id, author, body, date, votes } = props;
  return (
    <>
      <div className="comment-card">
        <h4>Written by {author}</h4>
        <p>{new Date(date).toLocaleDateString("en-GB")}</p>
        <p>{body}</p>
        <p>
          Votes: {votes}{" "}
          <button
            onClick={() => {
              // increase the vote count
            }}
          >
            &hearts;
          </button>
        </p>
      </div>
    </>
  );
}
