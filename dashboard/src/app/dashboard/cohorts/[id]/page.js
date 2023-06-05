import CohortTitle from "@/components/CohortTitle";
import CohortDetails from "@/components/CohortDetails";
import CohortTable from "@/components/CohortTable";

export default function Cohort({ params }) {
  const cohortId = String(params.id);

  return (
    <div className="w-full h-full relative bg-grey-light">
      <CohortTitle />
      <CohortDetails cohortId={cohortId} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-auto">
        <CohortTable cohortData={params.id} />
      </div>
    </div>
  );
}
