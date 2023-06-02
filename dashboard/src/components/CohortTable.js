"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const CohortTable = ({ cohortData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/cohort/${cohortData}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setUsers(data.rows);
    }
    fetchData();
  }, [cohortData]);

  return (
    <div className="flex flex-col overflow-x-auto bg-grey-light">
      <div className="-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light bg-gray-200 opacity-80">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th className="px-6 py-4 bg-gray-300">Name</th>

                  <th className="px-6 py-4 bg-gray-300">
                    Zoom (Last meeting joined)
                  </th>
                  <th className="px-6 py-4 bg-gray-300">
                    iQualify (Last log in)
                  </th>
                  <th className="px-6 py-4 bg-gray-300">Slack (Last log in)</th>
                  <th className="px-6 py-4 bg-gray-300">
                    Github (Last commit)
                  </th>
                  <th className="px-6 py-4 bg-gray-300">More</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    className="border-b dark:border-neutral-500"
                    key={user.id}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {`${user.first_name} ${user.last_name}`}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {user.zoom_logged_in}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.iqualify_logged_in}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.slack_logged_in}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.github_last_commit}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 cursor-pointer hover:bg-gray-200 rounded">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Link href={`/dashboard/learners/${user.id}`}>
                          <span style={{ fontSize: "14px" }}>&#9658;</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortTable;
