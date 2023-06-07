"use client";

import React from "react";
import LearnersTitle from "@/components/LearnersTitle";
import IframeVisuals from "@/components/QuickSightVisuals";

export default function Learners({ params }) {
  return (
    <div className="w-full h-full bg-blue-light">
      <LearnersTitle showFilters={false} />
      <IframeVisuals data={params.id} />
    </div>
  );
}
