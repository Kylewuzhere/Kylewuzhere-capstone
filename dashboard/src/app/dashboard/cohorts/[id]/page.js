import CohortTitle from "@/components/CohortTitle";
import CohortDetails from "@/components/CohortDetails";
import CohortTable from "@/components/CohortTable";
import CohortVisuals from "@/components/CohortVisuals";

export default function Cohort({ params }) {
  console.log(params);
  return (
    <div className="w-full h-full relative bg-grey-light">
      <CohortTitle />
      {/* <CohortDetails cohortId={params.id} />
      < */}
      <CohortVisuals data={params.id} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-auto">
        <CohortTable cohortData={params.id} />
      </div>
    </div>
  );
}
