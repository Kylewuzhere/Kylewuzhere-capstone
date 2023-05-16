import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white py-7 px-7 flex items-center justify-between">
      <img
        src="/images/logo-transparent.png"
        alt="Logo"
        className="h-12 w-auto mx-4 my-5"
      />
      <button className="text-white bg-orange py-3 px-7 rounded text-sm">
        LOG OUT
      </button>
    </header>
  );
};

export default Header;
