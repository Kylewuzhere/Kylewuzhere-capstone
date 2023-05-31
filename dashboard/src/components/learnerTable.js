"use client";
import React, { useState } from "react";
import Link from "next/link";

const LearnerTable = ({ content }) => {
  const [sort, setSort] = useState({ column: "name", order: "asc" });

  const handleSort = (column) => {
    if (sort.column === column) {
      setSort((prevSort) => ({
        column,
        order: prevSort.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort({ column, order: "asc" });
    }
  };

  const getSortIcon = (column) => {
    if (sort.column === column) {
      return sort.order === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>;
    }
    return null;
  };

  const sortedLearners = [...content].sort((a, b) => {
    const { column, order } = sort;

    if (column === "name") {
      return order === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name);
    } else if (column === "id") {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    } else if (column === "cohort") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (column === "iQualify") {
      return order === "asc"
        ? a.last_updated.localeCompare(b.last_updated)
        : b.last_updated.localeCompare(a.last_updated);
    } else if (column === "startDate") {
      const dateA = new Date(a.programme_start);
      const dateB = new Date(b.programme_start);

      return order === "asc" ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            {content.length === 0 ? (
              <p className="mx-5 my-5">No Learners Found</p>
            ) : (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Name {getSortIcon("name")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      Id {getSortIcon("id")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleSort("cohort")}
                    >
                      Cohort {getSortIcon("cohort")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleSort("startDate")}
                    >
                      Start Date {getSortIcon("startDate")}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleSort("iQualify")}
                    >
                      iQualify (Last log in) {getSortIcon("iQualify")}
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Slack (Last active)
                    </th>
                    <th scope="col" className="px-6 py-4">
                      More
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLearners.map((learner) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={learner.id}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {learner.first_name + " " + learner.last_name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {learner.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {learner.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {learner.programme_start}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">N/A</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {learner.last_updated}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">N/A</td>
                      <td className="whitespace-nowrap px-6 py-4 cursor-pointer hover:bg-gray-200 rounded">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <Link href={`/dashboard/learners/${learner.id}`}>
                            {/* This will need to be customised further when we are building the indiviual pages */}
                            <span style={{ fontSize: "14px" }}>&#9658;</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerTable;
