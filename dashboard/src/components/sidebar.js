import React from "react";
import Link from "next/link";

const Sidebar = () => {
  // Credits for the sidebar:
  // https://daily-dev-tips.com/posts/creating-a-sidebar-layout-in-nextjs-with-tailwind/
  const items = [
    {
      href: "/dashboard/cohorts",
      title: "Cohorts",
    },
    {
      href: "/dashboard/students",
      title: "Students",
    },
  ];

  return (
    <aside className="fixed left-0 top-12 pt-24 h-[calc(100%-3rem)] w-40 bg-black col-span-2 px-2">
      <ul className="flex flex-col gap-4 text-center">
        {items.map(({ href, title }) => (
          <Link
            // className="mx-auto text-center p-6 text-white text-xs bg-grey-button rounded hover:bg-slate-100 hover:text-black"
            className="mx-auto text-center p-6 text-black text-xs bg-grey-button rounded hover:bg-orange hover:text-black"
            href={href}
          >
            {title.toUpperCase()}
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
