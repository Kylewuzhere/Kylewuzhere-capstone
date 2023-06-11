import CohortTitle from "@/components/CohortTitle";
import CohortTable from "@/components/CohortTable";
import CohortVisuals from "@/components/CohortVisuals";

export default function Cohort({ params }) {
  return (
    <div className="w-full h-full flex flex-col gap-4 bg-grey-light">
      <CohortTitle />
      <CohortVisuals data={params.id} />
      <CohortTable cohortData={params.id} />
    </div>
  );
}
