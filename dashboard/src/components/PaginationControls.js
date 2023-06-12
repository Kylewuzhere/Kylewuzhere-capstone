const PaginationControls = ({
  onPrev,
  onNext,
  currentPage = null,
  nextDisabled = null,
}) => {
  const activeClass = `bg-blue-light hover:bg-orange
  hover:text-white text-black font-bold py-2 px-4 rounded`;
  const inactiveClass = `bg-blue-light text-grey-md font-bold py-2 px-4 rounded`;
  const prevDisabled = currentPage > 1 ? false : true;

  return (
    <div className="flex justify-center items-center py-5">
      <button
        className={prevDisabled ? inactiveClass : activeClass}
        onClick={onPrev}
        disabled={prevDisabled}
      >
        Prev
      </button>
      <span className="mx-4 text-black font-bold">Page {currentPage}</span>
      <button
        className={nextDisabled ? inactiveClass : activeClass}
        onClick={onNext}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
