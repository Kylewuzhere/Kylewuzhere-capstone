"useclient";
import { useState } from "react";
import LearnersTitle from "@/components/LearnersTitle";
import LearnerContent from "@/components/LearnerContent";

export default function Learners() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="w-full h-full border-b-2 border-black bg-blue-light">
      <LearnersTitle filter={filter} setFilter={setFilter} />
      <LearnerContent filter={filter} />
    </div>
  );
}
