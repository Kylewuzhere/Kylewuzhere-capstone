"use client";
import Link from "next/link";

const LearnerTable = ({ content, onSort, getSortIcon }) => {
  return (
    <div>
      {content.length === 0 ? (
        <div>
          <p className="mx-5 my-5">No Learners Found</p>
        </div>
      ) : (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("name")}
              >
                Name {getSortIcon("name")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("cohort")}
              >
                Cohort {getSortIcon("cohort")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("startDate")}
              >
                Start Date {getSortIcon("startDate")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("programmeLevel")}
              >
                Programme Level {getSortIcon("programmeLevel")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("iQualify")}
              >
                iQualify (Last log in) {getSortIcon("iQualify")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 cursor-pointer"
                onClick={() => onSort("slack")}
              >
                Slack (Last active) {getSortIcon("slack")}
              </th>
              <th scope="col" className="px-6 py-4">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((learner) => (
              <tr className="border-b dark:border-neutral-500" key={learner.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.first_name + " " + learner.last_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.cohort_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.programme_start}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.programme}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.iqualify_logged_in}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {learner.slack_logged_in || "N/A"}
                </td>
                <td className="cursor-pointer hover:bg-gray-200 rounded">
                  <Link
                    className="w-full h-full"
                    href={`/dashboard/learners/${learner.id}`}
                  >
                    <div className="px-6 py-4  flex items-left">
                      <span className="text-[14px]">&#9658;</span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LearnerTable;
