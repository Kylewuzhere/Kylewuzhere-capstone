"use client";
import { useState } from "react";
import LearnersTitle from "@/components/LearnersTitle";
import LearnerContent from "@/components/LearnerContent";

export default function Learners() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="w-full h-full border-b-2 border-black bg-blue-light">
      <LearnersTitle
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      <LearnerContent selectedFilter={selectedFilter} />
    </div>
  );
}
