import { Link } from "react-router";

export default function TopicCard(props) {
  const { slug, description, image } = props;

  return (
    <article className="topic-card">
      <Link to={`/topics/${slug}`} className="card-media">
        <img className="card-img" src={image} alt={`An image for ${slug}`} />
      </Link>

      <div className="card-content">
        <div className="topic-pill">{slug}</div>
        <h3 className="card-title">{slug.toUpperCase()}</h3>
        <p className="topic-desc">{description}</p>

        <Link to={`/topics/${slug}`} className="card-cta">
          View topic
        </Link>
      </div>
    </article>
  );
}
