"use client";

import React, { useEffect, useState } from "react";

const LearnerDetails = ({ learnerId }) => {
  const [learner, setLearner] = useState(null);

  useEffect(() => {
    async function fetchLearner() {
      try {
        const response = await fetch(`/api/learners/${learnerId}`);
        const data = await response.json();
        setLearner(data.rows[0]);
      } catch (error) {
        console.error("Error fetching learner:", error);
      }
    }

    fetchLearner();
  }, [learnerId]);
};
