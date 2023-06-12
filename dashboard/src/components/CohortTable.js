"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PaginationControls from "./PaginationControls";

const CohortTable = ({ cohortData }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 6;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/cohort/${cohortData}?limit=${limit}&page=${currentPage}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setUsers(data.rows);
    }
    fetchData();
  }, [cohortData, currentPage]);

  const nextDisabled = users.length < limit ? true : false;

  return (
    <div className="h-full">
      {users.length === 0 ? (
        <p className="mx-5 my-5">No Learners Found</p>
      ) : (
        <table className="min-w-full text-left text-sm font-light bg-gray-200 opacity-80">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4 bg-gray-300">Name</th>
              <th className="px-6 py-4 bg-gray-300">
                Zoom (Last meeting joined)
              </th>
              <th className="px-6 py-4 bg-gray-300">iQualify (Last log in)</th>
              <th className="px-6 py-4 bg-gray-300">Slack (Last log in)</th>
              <th className="px-6 py-4 bg-gray-300">Github (Last commit)</th>
              <th className="px-6 py-4 bg-gray-300">More</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-b dark:border-neutral-500" key={user.id}>
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
                <td className="cursor-pointer hover:bg-blue-light rounded">
                  <Link href={`/dashboard/learners/${user.id}`}>
                    <div className="w-full h-full">
                      <div className="px-6 py-4  flex items-left">
                        <span className="text-[14px]">&#9658;</span>
                      </div>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationControls
        onPrev={() => {
          setCurrentPage(currentPage - 1);
        }}
        onNext={() => {
          setCurrentPage(currentPage + 1);
        }}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
      />
    </div>
  );
};

export default CohortTable;
