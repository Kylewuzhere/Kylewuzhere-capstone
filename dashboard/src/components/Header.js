import React from "react";
import { LogoutButton } from "./logoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="fixed top-0 w-full h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
      <img className="max-h-8" src="/images/logo-transparent.png" alt="Logo" />
      {session && <LogoutButton />}
    </header>
  );
};

export default Header;
