const CohortTitle = async () => {
  return (
    <div className="w-full h-12  bg-grey-lighter text-black text-3xl font-semibold pt-11 pb-9 px-12 flex items-center justify-between">
      <h1 className="ml-4">COHORTS</h1>
      <div className="text-sm flex space-x-4 mr-4">
        <button className="rounded border border-black bg-blue-light text-black px-10 py-2">
          Sort
        </button>
        <button className="rounded border border-black bg-blue-light text-black px-10 py-2">
          Filter
        </button>
      </div>
    </div>
  );
};

export default CohortTitle;
