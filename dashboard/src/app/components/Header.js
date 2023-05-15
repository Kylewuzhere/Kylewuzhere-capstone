import React from 'react';


const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex items-center justify-between">
      <img src="/images/logo-transparent.png" alt="Logo" className="h-10 w-auto mx-6 my-6" />
      <button className="text-white bg-orange py-2 px-4 rounded">
        Login
      </button>
    </header>
  );
};

export default Header;

