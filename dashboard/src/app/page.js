import { LoginButton } from "../components/loginButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center bg-grey-dark p-24">
        <div className="flex justify-center items-center">
          <LoginButton />
        </div>
      </main>
    </div>
  );
}
