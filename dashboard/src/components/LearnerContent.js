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
    let url = `/api/learners?limit=${limit}&page=${currentPage}&filter=${selectedFilter}`;

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
  }, [currentPage, selectedFilter]);

  const nextDisabled = learners.length < limit ? true : false;

  if (loading) return <LoadingView />;

  return (
    <div className="pb-24 bg-blue-light">
      <SearchBar search={search} setSearch={setSearch} />
      <LearnerTable content={learners} />
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
    </div>
  );
};

export default LearnerContent;
