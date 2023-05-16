import React from "react";
import { LogoutButton } from "./logoutButton";

const Header = () => {
  return (
    <header className="h-12 bg-black text-white py-7 px-7 flex items-center justify-between">
      <img className="max-h-8" src="/images/logo-transparent.png" alt="Logo" />
      <LogoutButton />
    </header>
  );
};

export default Header;
