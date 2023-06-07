"use client";
import { useState, useEffect } from "react";
import CohortTitle from "@/components/CohortTitle";
import Link from "next/link";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  useEffect(() => {
    async function getCohorts() {
      const response = await fetch("http://localhost:3000/api/cohort");
      const data = await response.json();
      setCohorts(data.rows);
    }
    getCohorts();
  }, []);

  useEffect(() => {
    filterCohorts();
  }, [selectedFilter]);

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
    console.log("Active Days Difference:", daysDifference);
    return daysDifference < 1200;
  };

  const isInactiveCohort = (cohort) => {
    const startDate = parseDate(cohort.programme_start);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    console.log("Inactive Days Difference:", daysDifference);
    return daysDifference > 1200;
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="w-full h-full bg-grey-light">
      <div className="w-full mb-2 border-b-2 border-black">
        <CohortTitle
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          showFilters={true}
        />
      </div>
      <div className="w-1/2 mx-auto h-[calc(100%-18%)] grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredCohorts.map((cohort) => (
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
