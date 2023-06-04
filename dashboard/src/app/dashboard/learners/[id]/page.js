"use client";

import React from "react";
import LearnersTitle from "@/components/LearnersTitle";
import IframeVisuals from "@/components/quickSightVisuals";

export default function Learners({ params }) {
  return (
    <div className="w-full h-full bg-blue-light">
      <LearnersTitle />
      <IframeVisuals data={params.id} />
    </div>
  );
}
