const FilterButton = ({ filter, selectedFilter, onFilterChange }) => {
  const isSelected = selectedFilter === filter;
  const buttonClass = `rounded ${
    isSelected ? "border-black border bg-blue-light" : "bg-blue-md"
  } text-black px-10 py-2`;

  return (
    <button className={buttonClass} onClick={() => onFilterChange(filter)}>
      {filter.charAt(0).toUpperCase() + filter.slice(1)}
    </button>
  );
};

const CohortTitle = ({ selectedFilter, onFilterChange, showFilters }) => {
  return (
    <div className="w-full h-12 bg-grey-lighter text-black text-3xl font-semibold pt-11 pb-9 px-12 flex items-center justify-between">
      <h1 className="ml-4">COHORTS</h1>
      {showFilters && (
        <div className="text-sm flex space-x-4 mr-4">
          <FilterButton
            filter="active"
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
          />
          <FilterButton
            filter="inactive"
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
          />
          <FilterButton
            filter="all"
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      )}
    </div>
  );
};

export default CohortTitle;
