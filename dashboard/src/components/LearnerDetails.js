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
    console.log("Email learner:", learner.email);
  };

  const handleSlackMessage = () => {
    console.log("Send Slack message to learner:", learner.first_name);
  };

  const handleMoreDetails = () => {
    console.log("More details about the learner:", learner);
  };

  return (
    <div
      style={{ width: "500px" }}
      className="bg-gray-200 rounded-md p-8 ml-4 mt-4 flex flex-col"
    >
      {learner && (
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">
              {learner.first_name} {learner.last_name}
            </h2>
            <p className="mb-4">
              <span className="text-gray-500">Cohort: </span>
              {learner.name}
            </p>
            <button
              onClick={handleMoreDetails}
              className="bg-gray-300 hover:bg-gray-400 text-xs text-black px-4 py-2 rounded inline-flex items-center mt-4"
            >
              More Details
              <span className="ml-2">&#9660;</span>
            </button>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 italic text-sm">Email</span>
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
              <span className="text-gray-500 italic text-xs">
                Message on Slack
              </span>
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
      )}
    </div>
  );
};

export default LearnerDetails;
