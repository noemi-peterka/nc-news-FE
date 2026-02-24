export default function TopicCard(props) {
  const { slug, description, image } = props;

  return (
    <>
      <div className="topics-card">
        <img src={`${image}`} alt={`An image for ${slug}`} />
        <h3>{slug.toUpperCase()}</h3>

        <p>{description}</p>
        <button>Go to {slug}</button>
        {/* on click will take you to all articles of that topic */}
      </div>
    </>
  );
}
