const CohortTitle = ({ selectedFilter, onFilterChange, showFilters }) => {
  return (
    <div className="w-full h-12 bg-grey-lighter text-black text-3xl font-semibold pt-11 pb-9 px-12 flex items-center justify-between">
      <h1 className="ml-4">COHORTS</h1>
      {showFilters && (
        <div className="text-sm flex space-x-4 mr-4">
          <button
            className={`rounded ${
              selectedFilter === "active" ? "border-black border" : ""
            } ${
              selectedFilter === "active" ? "bg-blue-light" : "bg-blue-md"
            } text-black px-10 py-2`}
            onClick={() => onFilterChange("active")}
          >
            Active
          </button>
          <button
            className={`rounded ${
              selectedFilter === "inactive" ? "border-black border" : ""
            } ${
              selectedFilter === "inactive" ? "bg-blue-light" : "bg-blue-md"
            } text-black px-10 py-2`}
            onClick={() => onFilterChange("inactive")}
          >
            Inactive
          </button>
          <button
            className={`rounded ${
              selectedFilter === "all" ? "border-black border" : ""
            } ${
              selectedFilter === "all" ? "bg-blue-light" : "bg-blue-md"
            } text-black px-10 py-2`}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
        </div>
      )}
    </div>
  );
};

export default CohortTitle;
