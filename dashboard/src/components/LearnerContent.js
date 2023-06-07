"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LearnerTable from "@/components/LearnerTable";
import SearchBar from "@/components/SearchBar";
import LoadingView from "@/components/LoadingView";

// LearnerContent is a containing client component that lets table & searchbar components interact.
const LearnerContent = ({ selectedFilter }) => {
  const [loading, setLoading] = useState(true);
  const [learners, setLearners] = useState([]);

  // allows us to access the search query from the url
  const searchParams = useSearchParams(true);
  const search = searchParams.get("search");

  useEffect(() => {
    // returns api endpoint based on whether or not a search query is present
    const conditionalAPI = () => {
      if (search !== null && search !== "") {
        return `http://localhost:3000/api/learners?search=${search}`;
      } else {
        return "http://localhost:3000/api/learners";
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
  }, []);

  const filteredLearners = learners.filter((learner) => {
    if (selectedFilter === "active") {
      return learner.current_subject_id >= 0 && learner.current_subject_id <= 7;
    } else if (selectedFilter === "inactive") {
      return learner.current_subject_id === 999;
    }
    return true;
  });

  // while data is yet to load, display loading view
  // once data is loaded,display searchbar and table
  // if no learners are found, display "No Learners Found"
  return (
    <>
      {loading && <LoadingView />}
      {!loading && (
        <>
          <SearchBar />
          <LearnerTable content={learners} />
        </>
      )}
    </>
  );
};
export default LearnerContent;
