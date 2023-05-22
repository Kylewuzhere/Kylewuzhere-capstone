import React from "react";
import { LogoutButton } from "./logoutButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);
  if (session)
    return (
      <header className="h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
        <img
          className="max-h-8"
          src="/images/logo-transparent.png"
          alt="Logo"
        />
        <LogoutButton />
      </header>
    );
  else
    return (
      <header className="h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
        <img
          className="max-h-8"
          src="/images/logo-transparent.png"
          alt="Logo"
        />
      </header>
    );
};

export default Header;
