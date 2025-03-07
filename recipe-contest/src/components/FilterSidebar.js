import React from "react";
import "./FilterSidebar.css";

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <div className="filter-sidebar">
      <h2>Filters</h2>

      <label>
        <input
          type="checkbox"
          checked={filters.contestWinner}
          onChange={() => setFilters({ ...filters, contestWinner: !filters.contestWinner })}
        />
        Contest Winner
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.featured}
          onChange={() => setFilters({ ...filters, featured: !filters.featured })}
        />
        Featured
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.testKitchenApproved}
          onChange={() => setFilters({ ...filters, testKitchenApproved: !filters.testKitchenApproved })}
        />
        Test Kitchen Approved
      </label>
    </div>
  );
};

export default FilterSidebar;
