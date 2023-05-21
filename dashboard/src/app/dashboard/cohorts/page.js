import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Cohorts() {
  const cohorts = [
    { name: "Cohort 1", id: "1" },
    { name: "Cohort 2", id: "2" },
    { name: "Cohort 3", id: "3" },
    { name: "Cohort 4", id: "4" },
    { name: "Cohort 5", id: "5" },
    { name: "Cohort 6", id: "6" },
    { name: "Cohort 7", id: "7" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
    { name: "Cohort 8", id: "8" },
  ];
  // dummy cohorts

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mt-12 w-1/2 h-[calc(100%-10%)] grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-scroll">
      {cohorts.map((cohort) => (
        <Link
          key={cohort.id}
          className="flex justify-center items-center p-8 bg-grey border-2 border-black rounded"
          href={`/dashboard/cohorts`}
        >
          <span className="text-sm">{cohort.name}</span>
        </Link>
      ))}
    </div>
  );
}
