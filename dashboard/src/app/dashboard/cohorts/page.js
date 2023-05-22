import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Cohorts() {

  async function GetCohorts() {
    // Call the /cohort route with a GET request
    const query = await fetch("http://localhost:3000/api/cohort");
    const response = await query.json();

    // Returns an array of cohort names and id's
    return response.rows;
  }

  const cohorts = await GetCohorts();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mt-12 w-1/2 h-[calc(100%-10%)] grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-scroll">
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
  );
}
