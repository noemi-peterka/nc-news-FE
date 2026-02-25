import { Link } from "react-router";

export default function TopicCard(props) {
  const { slug, description, image } = props;

  return (
    <>
      <div className="topics-card">
        <img src={`${image}`} alt={`An image for ${slug}`} />
        <h3>{slug.toUpperCase()}</h3>

        <p>{description}</p>
        <Link to={`/topics/${slug}`}>Go to {slug}</Link>
      </div>
    </>
  );
}
