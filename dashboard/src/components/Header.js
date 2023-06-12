"use client";

import React from "react";
import { LogoutButton } from "./LogoutButton";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession({
    required: false,
  });

  return (
    <header className="sticky top-0 w-full h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
      <img className="max-h-8" src="/images/logo-transparent.png" alt="Logo" />
      {session && <LogoutButton />}
    </header>
  );
};

export default Header;
