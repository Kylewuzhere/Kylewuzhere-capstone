import LearnersTitle from "@/components/LearnersTitle";
import LearnerVisuals from "@/components/LearnerVisuals";

// params is the object that contains the dynamic route parameters
export default function Learners({ params }) {
  return (
    <div className="min-h-full bg-blue-light">
      <LearnersTitle />
      <LearnerVisuals learnerId={params.id} />
    </div>
  );
}
