"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      className="text-white bg-orange py-2 px-7 rounded text-sm"
      onClick={() =>
        signIn("okta", {
          redirect: true,
          callbackUrl: "/dashboard/cohorts",
        })
      }
    >
      Sign in
    </button>
  );
};
