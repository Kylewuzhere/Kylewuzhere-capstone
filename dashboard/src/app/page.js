import { LoginButton } from "../components/loginButton";
import InitialHeader from "@/components/InitialHeader";

export default function Home() {
  return (
    <>
      <InitialHeader />
      <div className="flex min-h-screen pb-24 items-center justify-center bg-grey-dark">
        <LoginButton />
      </div>
    </>
  );
}
