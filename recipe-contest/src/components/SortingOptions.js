import React from "react";
import "./SortingOptions.css";

const SortingOptions = ({ sortBy, setSortBy }) => {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
      <option value="">Sort By</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="highestRating">Highest Rating</option>
      <option value="lowestRating">Lowest Rating</option>
    </select>
  );
};

export default SortingOptions;
