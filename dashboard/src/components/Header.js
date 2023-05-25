import React from "react";
import { LogoutButton } from "./logoutButton";

const Header = (session) => {
  return (
    <header className="fixed top-0 w-full h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
      <img className="max-h-8" src="/images/logo-transparent.png" alt="Logo" />
      {session && <LogoutButton />}
    </header>
  );
};

export default Header;
