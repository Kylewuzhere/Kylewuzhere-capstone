import { LoginButton } from "../components/loginButton";
import Header from "@/components/InitialHeader";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen pb-24 items-center justify-center bg-grey-dark">
        <LoginButton />
      </div>
    </>
  );
}
