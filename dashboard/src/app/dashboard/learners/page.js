"use client";
import { useState } from "react";
import LearnersTitle from "@/components/LearnersTitle";
import LearnerContent from "@/components/LearnerContent";

export default function Learners() {
  const [selectedFilter, setSelectedFilter] = useState("active");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="w-full min-h-full pb-14 bg-blue-light">
      <LearnersTitle
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        showFilters={true}
      />
      <LearnerContent selectedFilter={selectedFilter} />
    </div>
  );
}
