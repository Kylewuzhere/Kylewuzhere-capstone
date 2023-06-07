"use client";
import { useState, useEffect } from "react";
import CohortTitle from "@/components/CohortTitle";
import Link from "next/link";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("active");
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  useEffect(() => {
    async function GetCohorts() {
      const response = await fetch("http://localhost:3000/api/cohort");
      const data = await response.json();
      setCohorts(data.rows);
    }
    GetCohorts();
  }, []);

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
