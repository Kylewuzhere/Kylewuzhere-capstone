"use client";
import { useState, useEffect } from "react";
import CohortTitle from "@/components/CohortTitle";
import Link from "next/link";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("active");
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  useEffect(() => {
    async function getCohorts() {
      const response = await fetch("/api/cohort");
      const data = await response.json();
      setCohorts(data.rows);
    }
    getCohorts();
  }, []);

  useEffect(() => {
    filterCohorts();
  }, [selectedFilter, cohorts]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const filterCohorts = () => {
    if (selectedFilter === "active") {
      setFilteredCohorts(cohorts.filter(isActiveCohort));
    } else if (selectedFilter === "inactive") {
      setFilteredCohorts(cohorts.filter(isInactiveCohort));
    } else {
      setFilteredCohorts(cohorts);
    }
  };

  const isActiveCohort = (cohort) => {
    const startDate = parseDate(cohort.programme_start);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference < 1200;
  };

  const isInactiveCohort = (cohort) => {
    const startDate = parseDate(cohort.programme_start);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference > 1200;
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="w-full min-h-full bg-grey-light pb-14">
      <div className="w-full border-b-2 border-black">
        <CohortTitle
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          showFilters={true}
        />
      </div>
      <div className="mx-auto max-w-screen-md mt-10 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCohorts.map((cohort) => (
            <Link
              key={cohort.id}
              className="flex flex-col justify-center items-center p-8 bg-white border-2 border-black rounded h-40"
              href={`/dashboard/cohorts/${cohort.id}`}
            >
              <span className="text-lg">{cohort.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
