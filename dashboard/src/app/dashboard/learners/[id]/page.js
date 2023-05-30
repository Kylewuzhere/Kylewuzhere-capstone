"use client";

import React from "react";
import LearnersTitle from "@/components/LearnersTitle";
import LearnerDetails from "@/components/LearnerDetails";

export default function Learners({ params }) {
  return (
    <div className="w-full h-full bg-blue-light">
      <LearnersTitle />
      <LearnerDetails learnerId={params.id} />

      {/* <iframe
        className="w-full h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/68130911-39a3-44d6-9510-49afa451eccf?directory_alias=diquicksights#p.userid=${params.id}`}
      ></iframe> */}
    </div>
  );
}
