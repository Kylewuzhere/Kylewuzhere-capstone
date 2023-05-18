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
    { name: "Cohort 9", id: "9" },
    { name: "Cohort 10", id: "10" },
  ];
  // dummy cohorts

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-wrap gap-3 w-1/2">
      {cohorts.map((cohort) => (
        <Link
          key={cohort.id}
          className="flex justify-center items-center w-[45%] h-24 m-auto bg-white border-2 border-black rounded"
          href={`/dashboard/cohorts/${cohort.id}`}
        >
          <span>{cohort.name}</span>
        </Link>
      ))}
    </div>
  );
}
