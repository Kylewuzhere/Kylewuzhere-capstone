"use client";

import LearnersTitle from "@/components/LearnersTitle";
import IndividualLearner from "@/components/individualLearner";
import getParams from "@/app/utils/getParams";

export default function Learners() {
  const id = getParams();
  return (
    <div className="w-full h-full bg-blue-light">
      <div className="w-full  mb-10 border-b-2 border-black ">
        <LearnersTitle />
        <IndividualLearner id={id} />
      </div>
    </div>
  );
}
