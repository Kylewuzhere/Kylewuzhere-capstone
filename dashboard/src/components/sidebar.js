"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  const links = [
    {
      href: "/dashboard/cohorts",
      title: "Cohorts",
    },
    {
      href: "/dashboard/learners",
      title: "Learners",
    },
  ];

  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-12 pt-24 h-[calc(100%-3rem)] w-40 bg-black col-span-2 px-2">
      <ul className="flex flex-col gap-4 text-center">
        {links.map(({ href, title }, index) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={index}
              className={`${
                isActive ? "border-white w-full font-bold" : "w-11/12"
              } text-sm bg-grey-button mx-auto text-center p-6 text-black rounded border-transparent hover:border-white border-[1px] hover:w-full transition-all duration-100 ease-in-out`}
              href={href}
            >
              {title.toUpperCase()}
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
