import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GetCohorts } from "@/app/utils";

export default async function Cohorts() {
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
