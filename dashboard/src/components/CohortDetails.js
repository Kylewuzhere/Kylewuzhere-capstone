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
};

export default CohortDetails;
