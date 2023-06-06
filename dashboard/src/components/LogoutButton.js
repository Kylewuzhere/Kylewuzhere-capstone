"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      className="text-white bg-orange py-3 px-7 rounded text-sm"
      onClick={() =>
        signOut({ redirect: true, callbackUrl: "http://localhost:3000" })
      }
    >
      Sign Out
    </button>
  );
};
