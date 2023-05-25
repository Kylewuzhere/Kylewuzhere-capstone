import { useParams } from "next/navigation";

export default function getParams() {
  const params = useParams();
  return params.LearnerId;
}
