import LearnersTitle from "@/components/LearnersTitle";
import Table from "@/components/learnerTable";

export default function Learners() {
  return (
    <div className="w-full h-full bg-blue-light">
      <div className="w-full  mb-10 border-b-2 border-black ">
        <LearnersTitle />
      </div>
      <Table />
    </div>
  );
}
