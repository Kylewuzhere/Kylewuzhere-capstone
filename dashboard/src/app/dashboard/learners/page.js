import LearnersTitle from "@/components/LearnersTitle";
import Table from "@/components/learnerTable";

export default function Learners() {
  return (
    <div className="w-full h-full border-b-2 border-black bg-blue-light">
      <LearnersTitle />
      <Table />
    </div>
  );
}
