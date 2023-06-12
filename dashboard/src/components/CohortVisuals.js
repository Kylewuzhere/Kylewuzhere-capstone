import CohortDetails from "./CohortDetails";
const CohortVisuals = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 row-span-2 h-full">
      <div>
        <CohortDetails cohortId={data} />
      </div>
      <div className="grid grid-cols-2 col-span-2 gap-2 justify-center">
        <iframe
          className="h-[420px] col-span-2 w-full flex self-center"
          src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/6d93df33-7637-429a-9d53-c60d58587de0?directory_alias=diquicksights?#p.cohortId=${data}`}
        ></iframe>
      </div>
    </div>
  );
};
export default CohortVisuals;
