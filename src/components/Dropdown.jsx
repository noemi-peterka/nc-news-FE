export default function Dropdown({
  sortBy,
  order,
  topic,
  onSortByChange,
  onOrderChange,
  onTopicChange,
}) {
  return (
    <div className="filters">
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
          <option value="author">Author</option>
        </select>
      </label>

      <label>
        Order:
        <select value={order} onChange={(e) => onOrderChange(e.target.value)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </label>

      <label>
        Topic:
        <select value={topic} onChange={(e) => onTopicChange(e.target.value)}>
          <option value="">All</option>
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
      </label>
    </div>
  );
}
