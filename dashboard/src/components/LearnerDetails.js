"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const LearnerDetails = ({ learnerId }) => {
  const [learner, setLearner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    async function fetchLearner() {
      try {
        const response = await fetch(`/api/learners/${learnerId}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        setLearner(data.rows[0]);
      } catch (error) {
        console.error("Error fetching learner:", error);
      }
    }

    fetchLearner();
  }, [learnerId]);

  const sendEmail = () => {
    if (learner && learner.email) {
      const emailUrl = `mailto:${learner.email}`;
      window.location.href = emailUrl;
    }
  };

  const sendSlackMessage = () => {
    console.log("Sending Slack message to learner:", learner.first_name);
  };

  const handleMoreDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{ width: "550px" }}
      className="bg-grey-md shadow-md rounded-md p-8 ml-4 mt-4 flex flex-col"
    >
      {learner && (
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className="mr-4">
              <Image
                src="/images/avatar.png"
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                {learner.first_name} {learner.last_name}
              </h2>
              <p className="mb-2">
                <span className="text-gray-700">Cohort: </span>
                {learner.name}
              </p>
              <p className="mb-4">
                <span className="text-gray-700">Subject: </span>
                {learner.subject_name}
              </p>
              <button
                onClick={handleMoreDetails}
                className="bg-gray-300 hover:bg-gray-400 text-xs text-black px-4 py-2 rounded inline-flex items-center mt-4"
              >
                More Details
                <span className="ml-2">&#9660;</span>
              </button>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div
                    ref={modalRef}
                    className="bg-white bg-opacity-75 shadow-md rounded-md p-8"
                  >
                    <h2 className="text-xl font-bold mb-4">Email</h2>
                    <p className="mb-4">{learner.email}</p>
                    <button
                      onClick={handleCloseModal}
                      className="bg-gray-300 hover:bg-gray-400 text-xs text-black px-4 py-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 italic text-sm">Email</span>
              <div>
                <button
                  onClick={sendEmail}
                  className="bg-transparent hover:bg-gray-300 rounded"
                >
                  <Image
                    src="/images/email.png"
                    alt="Email"
                    width={55}
                    height={55}
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
                  onClick={sendSlackMessage}
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
