import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <section className="h-full">
      <div className="container">
        <h2 className="font-bold mt-4">
          You are logged in as: {session?.user?.name}
        </h2>
      </div>
    </section>
  );
};

export default Dashboard;
