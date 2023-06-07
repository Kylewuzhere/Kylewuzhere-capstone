const CohortTitle = () => {
  return (
    <div className="w-full h-12  bg-grey-lighter text-black text-3xl font-semibold pt-11 pb-9 px-12 flex items-center justify-between">
      <h1 className="ml-4">COHORTS</h1>
      <div className="text-sm flex space-x-4 mr-4">
        {showFilters && (
          <div className="text-sm flex space-x-4 mr-4">
            <button
              className={`rounded border border-black ${
                selectedFilter === "active" ? "bg-gray-200" : "bg-grey-light"
              } text-white px-10 py-2`}
              onClick={() => handleFilter("active")}
            >
              Active
            </button>
            <button
              className={`rounded border border-black ${
                selectedFilter === "inactive" ? "bg-gray-200" : "bg-grey-light"
              } text-white px-10 py-2`}
              onClick={() => handleFilter("inactive")}
            >
              Inactive
            </button>
            <button
              className={`rounded border border-black ${
                selectedFilter === "all" ? "bg-gray-200" : "bg-grey-light"
              } text-white px-10 py-2`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortTitle;
