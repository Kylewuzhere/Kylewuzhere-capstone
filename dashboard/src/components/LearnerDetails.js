"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">
                {learner.first_name} {learner.last_name}
              </h2>
              <p className="mb-4">Cohort: {learner.name}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500 italic">Email</span>
                <div>
                  <button
                    onClick={handleEmail}
                    className="bg-transparent hover:bg-gray-300 rounded"
                  >
                    <Image
                      src="/images/email.png"
                      alt="Email"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500 italic">Message on Slack</span>
                <div>
                  <button
                    onClick={handleSlackMessage}
                    className="bg-white hover:bg-gray-300 text-gray-800 rounded"
                    disabled
                  >
                    <Image
                      src="/images/slack.png"
                      alt="Slack"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerDetails;
