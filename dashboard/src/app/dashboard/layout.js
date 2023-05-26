import Sidebar from "@/components/sidebar";

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
      <div className="pt-12 flex justify-center items-center h-screen ml-40">
        {children}
      </div>
    </>
  );
}
