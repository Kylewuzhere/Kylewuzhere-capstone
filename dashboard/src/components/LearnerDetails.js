"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    // Logic to handle email functionality
    console.log("Email learner:", learner.email);
  };

  const handleSlackMessage = () => {
    // Logic to handle Slack message functionality
    console.log("Send Slack message to learner:", learner.first_name);
  };

  return (
    <div
      style={{ width: "500px" }}
      className="bg-gray-200 rounded-md p-8 ml-4 mt-4"
    >
      {learner && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {learner.first_name} {learner.last_name}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleEmail}
                className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Email
              </button>
              <button
                onClick={handleSlackMessage}
                className="bg-white hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                disabled
              >
                Slack
              </button>
            </div>
          </div>
          <p className="mb-4">Cohort: {learner.name}</p>
        </div>
      )}
    </div>
  );
};

export default LearnerDetails;