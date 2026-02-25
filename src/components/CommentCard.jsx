import bin from "../assets/recycle-bin.png";

export default function CommentCard(props) {
  const { commentId, id, author, body, date, votes } = props;

  const user = "grumpy19";
  return (
    <>
      <div className="comment-card">
        <h4>Written by {author}</h4>
        <p>{new Date(date).toLocaleDateString("en-GB")}</p>
        <p>{body}</p>
        {user !== author && (
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
        )}
        {user === author && (
          <button
            onClick={(comment) => {
              //delete a comment
              console.log(comment);
            }}
          >
            <img className="icon" src={bin} alt="bin" />
          </button>
        )}
      </div>
    </>
  );
}
