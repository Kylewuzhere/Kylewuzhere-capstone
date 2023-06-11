"use client";
import { useSearchParams } from "next/navigation";
import LearnerDetails from "@/components/LearnerDetails";

export default function Page({ learnerId }) {
  const current_subject_id = useSearchParams().get("current_subject_id");

  return (
    <div className="grid grid-cols-5 gap-4 row-span-2  h-full  ">
      <div className="col-span-2">
        <LearnerDetails learnerId={learnerId} />
        <iframe
          className="h-[400px] mt-2 w-full   flex self-center"
          src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/1b6c3007-d4d9-4044-8e59-633eb895af8a?directory_alias=diquicksights?#p.userId=${learnerId}&p.subjectId=${current_subject_id}`}
        ></iframe>
      </div>
      <div className="grid grid-cols-2 col-span-3 row-span-2 h-full  gap-2 content-start">
        <iframe
          className="h-[650px] col-span-2  mt-4 w-full flex self-center"
          src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/7201167f-3f6c-432b-8d93-ee0b4414db28?directory_alias=diquicksights?#p.userId=${learnerId}&p.subjectId=${current_subject_id}`}
        ></iframe>
      </div>
    </div>
  );
}
