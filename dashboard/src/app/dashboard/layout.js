import Sidebar from "@/components/Sidebar";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] justify-center ml-40">
        {children}
      </div>
    </>
  );
}
