"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <div>
      <button
        className="text-white bg-orange py-2 px-7 rounded text-sm"
        onClick={() =>
          signIn("okta", {
            redirect: true,
            callbackUrl: "http://localhost:3000/dashboard",
          })
        }
      >
        Sign in
      </button>
    </div>
  );
};
