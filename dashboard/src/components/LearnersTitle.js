const LearnersTitle = ({ selectedFilter, onFilterChange }) => {
  const handleFilter = (filter) => {
    onFilterChange(filter);
  };

  return (
    <div className="w-full h-12  bg-blue text-black text-3xl font-semibold pt-11 pb-9 px-12 flex items-center justify-between">
      <h1 className="ml-4">LEARNERS</h1>
      <div className="text-sm flex space-x-4 mr-4">
        <button className="rounded border border-black bg-grey-light text-white px-10 py-2">
          Current
        </button>
      </div>
    </div>
  );
};

export default LearnersTitle;
