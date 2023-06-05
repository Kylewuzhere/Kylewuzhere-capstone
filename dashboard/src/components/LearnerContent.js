"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Table from "@/components/LearnerTable";
import SearchBar from "@/components/SearchBar";
import LoadingView from "@/components/LoadingView";

// LearnerContent is a containing client component that lets table & searchbar components interact.
const LearnerContent = () => {
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

  // while data is yet to load, display loading view
  // once data is loaded,display searchbar and table
  // if no learners are found, display "No Learners Found"
  return (
    <>
      {loading && <LoadingView />}
      {!loading && (
        <>
          <SearchBar />
          <Table content={learners} />
        </>
      )}
    </>
  );
};
export default LearnerContent;
