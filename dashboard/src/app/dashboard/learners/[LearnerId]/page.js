"use client";

import LearnersTitle from "@/components/LearnersTitle";
import { useParams } from "next/navigation";

export default function Learners() {
  const params = useParams();
  const uid = params.LearnerId;
  return (
    <div className="w-full h-full bg-blue-light">
      <div className="w-full  mb-10 border-b-2 border-black ">
        <LearnersTitle />
        <p>Individual Learner #{uid}</p>
      </div>
    </div>
  );
}
