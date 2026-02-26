import { Link } from "react-router";

export default function TopicCard(props) {
  const { slug, description, image } = props;

  return (
    <article className="topic-card">
      <div className="card-content">
        <h3 className="card-title">{slug.toUpperCase()}</h3>
        <p className="topic-desc">{description}</p>

        <Link to={`/topics/${slug}`} className="card-cta">
          View articles for {slug}
        </Link>
      </div>
    </article>
  );
}
