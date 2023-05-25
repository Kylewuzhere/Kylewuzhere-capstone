"use client";
import React from "react";
import Link from "next/link";
// import SearchBar from "./searchBar";

const Table = async () => {
  async function GetStudents() {
    // Call the /cohort route with a GET request
    const query = await fetch("http://localhost:3000/api/learners");
    const response = await query.json();

    // Returns an array of learners info from joined tables
    return response.rows;
  }

  const students = await GetStudents();

  return (
    <div className="flex flex-col overflow-x-auto">
      {/* <SearchBar /> */}
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Cohort
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    iQualify(Last log in)
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Slack(Last active)
                  </th>
                  <th scope="col" className="px-6 py-4">
                    More
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    className="border-b dark:border-neutral-500"
                    key={student.id}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.first_name + " " + student.last_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.programme_start}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {student.last_updated}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">N/A</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link href={`/dashboard/learners/${student.id}`}>→</Link>
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

export default Table;
