import CohortTitle from "@/components/CohortTitle";
import CohortTable from "@/components/CohortTable";

export default function Cohort({ params }) {
  return (
    <div className="w-full h-screen relative bg-grey-light">
      <CohortTitle />
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-auto">
        <CohortTable cohortData={params.id} />
      </div>
    </div>
  );
}
