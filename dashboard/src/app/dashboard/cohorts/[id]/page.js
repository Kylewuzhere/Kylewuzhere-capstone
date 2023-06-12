import CohortTitle from "@/components/CohortTitle";
import CohortTable from "@/components/CohortTable";
import CohortVisuals from "@/components/CohortVisuals";

export default function Cohort({ params }) {
  return (
    <div className="w-full min-h-full flex flex-col gap-4 bg-grey-light pb-14">
      <CohortTitle />
      <CohortVisuals data={params.id} />
      <CohortTable cohortData={params.id} />
    </div>
  );
}
