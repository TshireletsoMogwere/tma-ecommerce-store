import "../styles/Sorting.css";

function Sorting({ onSortChange, currentSort }) {

  const handleChange = (e) => {
    const [sortBy, order] = e.target.value.split(",");
    onSortChange({ sortBy, order });
  };

 

  return (
    <div className={`sorting-container`}>
      {true && (
        <>
          <h3 className="sorting-title">Sort: </h3>
          <select
            className="sorting-select"
            onChange={handleChange}
            value={`${currentSort.sortBy},${currentSort.order}`}
          >
            <option value="relevance,asc">Relevance</option>
            <option value="title,asc">Title A → Z</option>
            <option value="title,desc">Title Z → A</option>
            <option value="price,asc">Price Low → High</option>
            <option value="price,desc">Price High → Low</option>
            <option value="rating,desc">Top Rated</option>
            <option value="rating,asc">Lowest Rated</option>
          </select>
        </>
      )}
    </div>
  );
}

export default Sorting;
