"use client";
import React, { useState, useEffect, useRef } from "react";
import LearnerTable from "@/components/LearnerTable";
import SearchBar from "@/components/SearchBar";
import LoadingView from "@/components/LoadingView";
import PaginationControls from "./PaginationControls";

const LearnerContent = ({ selectedFilter }) => {
  const [loading, setLoading] = useState(false);
  const [learners, setLearners] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchTimeoutRef = useRef(null);

  const limit = 15;

  const nextDisabled = learners.length < limit ? true : false;

  useEffect(() => {
    // returns api endpoint based on whether or not a search query is present
    setLoading(true);
    const conditionalAPI = () => {
      if (search !== null && search !== "") {
        return `http://localhost:3000/api/learners?search=${search}limit=${limit}&page=${currentPage}`;
      } else {
        return `http://localhost:3000/api/learners?limit=${limit}&page=${currentPage}`;
      }
    };

    // fetch data under the api endpoint of conditionalAPI()
    async function fetchLearners() {
      const response = await fetch(conditionalAPI(), { cache: "no-store" });
      const data = await response.json();
      setLearners(data.rows);
      setLoading(false);
    }

    fetchLearners();
  }, [currentPage]);

  const filteredLearners = learners.filter((learner) => {
    if (selectedFilter === "active") {
      return learner.current_subject_id >= 0 && learner.current_subject_id <= 7;
    } else if (selectedFilter === "inactive") {
      return learner.current_subject_id === 999;
    }
    return true;
  });

  return (
    <>
      {loading && <LoadingView />}
      {!loading && (
        <>
          <SearchBar />
          <LearnerTable content={filteredLearners} />
          <PaginationControls
            onPrev={() => {
              setCurrentPage(currentPage - 1);
            }}
            onNext={() => {
              setCurrentPage(currentPage + 1);
            }}
            currentPage={currentPage}
            nextDisabled={nextDisabled}
          />
        </>
      )}
    </>
  );
};

export default LearnerContent;
