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
    </div>
  );
}
