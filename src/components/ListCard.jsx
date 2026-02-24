export default function ListCard(props) {
  const { id, title, author, body, commentCount, date, topic, votes, image } =
    props;
  return (
    <>
      <div className="article-card">
        <img src={`${image}`} alt={`An image for ${title}`} />
        <h3>{title}</h3>
        <h4>Written by {author}</h4>
        <p>{new Date(date).toLocaleDateString("en-GB")}</p>
        <p>Comments: {commentCount}</p>
        <p>Votes: {votes}</p>
        <button>Read more</button>
        {/* on click will take you to article card */}
      </div>
    </>
  );
}
