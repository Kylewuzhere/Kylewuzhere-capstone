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

  const fetchLearners = async (search = "") => {
    let url = `http://localhost:3000/api/learners?limit=${limit}&page=${currentPage}`;
    if (search) {
      url += `&search=${search}`;
    }
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();
    setLearners(data.rows);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchLearners(search);
    }, 500);
  }, [search]);

  useEffect(() => {
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

  const nextDisabled = learners.length < limit ? true : false;

  return (
    <>
      {loading && <LoadingView />}
      {!loading && (
        <>
          <SearchBar search={search} setSearch={setSearch} />
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
