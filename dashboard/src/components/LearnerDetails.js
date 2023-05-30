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

  const handleEmail = () => {
    // Logic to handle email functionality to be further developed
    console.log("Email learner:", learner.email);
  };

  const handleSlackMessage = () => {
    // Logic to handle Slack message functionality to be further developed
    console.log("Send Slack message to learner:", learner.first_name);
  };
};
