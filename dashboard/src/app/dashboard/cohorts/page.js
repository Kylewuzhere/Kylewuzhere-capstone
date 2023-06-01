import CohortTitle from "@/components/CohortTitle";
import Link from "next/link";

export default async function Cohorts() {
  async function GetCohorts() {
    // Call the /cohort route with a GET request
    const query = await fetch("http://localhost:3000/api/cohort", { cache: 'no-store'});
    const response = await query.json();

    // Returns an array of cohort names and id's
    return response.rows;
  }

  const cohorts = await GetCohorts();

  return (
    <div className=" w-full h-full bg-grey-light">
      <div className="w-full mb-2 border-b-2 border-black ">
        <CohortTitle />
      </div>
      <div className="w-1/2 mx-auto h-[calc(100%-18%)] grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-scroll">
        {cohorts.map((cohort) => (
          <Link
            key={cohort.id}
            className="cohortsListItem"
            href={`/dashboard/cohorts/${cohort.id}`}
          >
            {cohort.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
