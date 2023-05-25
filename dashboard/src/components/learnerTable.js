"use client";
import React, { useState } from "react";

// import SearchBar from "./searchBar";

import React, { useState, useEffect } from "react";

const Table = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const [learners, setlearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/learners");
        const data = await response.json();
        setlearners(data.rows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column) => {
    if (column === "startDate") {
      if (startDateSortColumn === column) {
        setStartDateSortOrder(startDateSortOrder === "asc" ? "desc" : "asc");
      } else {
        setStartDateSortColumn(column);
        setStartDateSortOrder("asc");
      }
    } else {
      if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortOrder("asc");
      }
    }
  };

  const sortedLearners = [...learners];
  sortedLearners.sort((a, b) => {
    if (sortColumn === "name") {
      return sortOrder === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name);
    } else if (sortColumn === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortColumn === "cohort") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortColumn === "iQualify") {
      return sortOrder === "asc"
        ? a.last_updated.localeCompare(b.last_updated)
        : b.last_updated.localeCompare(a.last_updated);
    } else if (startDateSortColumn === "startDate") {
      const dateA = new Date(a.programme_start);
      const dateB = new Date(b.programme_start);

      if (startDateSortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    }

    return 0;
  });

  return (
    <div className="flex flex-col overflow-x-auto">
      {/* <SearchBar /> */}
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            {loading ? (
              <div>Loading...</div> // Show loading state
            ) : (
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
                  {learners.map((learner) => (
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
                      <td
                        className="whitespace-nowrap px-6 py-4"
                        onClick={() => alert("button clicked")}
                      >
                        →
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

export default Table;
