export default function Dropdown() {
  return (
    <div>
      <label>
        Sort by:
        <select name="selectedFruit">
          <option value="comment-count">Comment count</option>
          <option value="votes">Votes</option>
          <option value="author">Author</option>
        </select>
      </label>
      <label>
        Topic:
        <select name="selectedFruit">
          <option value="coding">Coding</option>
          <option value="football">Football</option>
          <option value="cooking">Cooking</option>
        </select>
      </label>
    </div>
  );
}
