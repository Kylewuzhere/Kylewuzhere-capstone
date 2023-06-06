"use client";
import React, { useEffect, useState } from "react";

const CohortDetails = ({ cohortId }) => {
  const [cohort, setCohort] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCohort() {
      try {
        const response = await fetch(`/api/cohort`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cohort");
        }

        const data = await response.json();
        const foundCohort = data.rows.find((cohort) => cohort.id === cohortId);
        setCohort(foundCohort);
      } catch (error) {
        console.error("Error fetching cohort:", error);
        setError(error.message);
      }
    }

    fetchCohort();
  }, [cohortId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ width: "350px" }}
      className="bg-blue-light shadow-md rounded-md p-8 ml-4 mt-4 flex flex-col"
    >
      {cohort && (
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">{cohort.name}</h2>
              <p className="text-sm">
                Programme Start: {cohort.programme_start}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohortDetails;
