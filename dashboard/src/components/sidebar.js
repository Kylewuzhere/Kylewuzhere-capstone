import React from "react";
import Link from "next/link";

const Sidebar = () => {
  const items = [
    {
      href: "/dashboard/cohorts",
      title: "Cohorts",
    },
  ];
  return (
    <aside className="bg-grey-dark w-full md:w-60">
      <nav>
        <ul>
          {items.map(({ href, title }) => (
            <li className="m-10" key={title}>
              <Link
                className={`flex p-5 text-white bg-grey-button rounded hover:bg-slate-100 hover:text-black cursor-pointer`}
                href={href}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
