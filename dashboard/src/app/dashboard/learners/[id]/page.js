import LearnersTitle from "@/components/LearnersTitle";

export default function Learners({ params }) {
  return (
    <div className="w-full h-full bg-blue-light">
      <LearnersTitle />
      <iframe
        className="w-full h-full"
        src={`https://ap-southeast-2.quicksight.aws.amazon.com/sn/embed/share/accounts/236143717967/dashboards/d5d02744-a9e2-478e-a459-67c9ea03ab6f/sheets/d5d02744-a9e2-478e-a459-67c9ea03ab6f_46a79b94-630a-4388-ba64-26a4c1d46e6e/visuals/d5d02744-a9e2-478e-a459-67c9ea03ab6f_17b8fd5b-3b53-402a-91ea-e29036855036?directory_alias=diquicksights#p.userId=${params.id}`}
      ></iframe>
    </div>
  );
}
