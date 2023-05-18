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
  ];

  return (
    <aside className="col-span-2 p-2 mt-10">
      <ul className="flex flex-col gap-4 text-center">
        {items.map(({ href, title }) => (
          <Link
            className="w-2/3 mx-auto text-center p-6 text-white bg-grey-button rounded hover:bg-slate-100 hover:text-black"
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
