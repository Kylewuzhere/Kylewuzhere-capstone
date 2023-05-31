"use client";
import React, { useEffect, useState } from "react";

const CohortTable = ({ cohortData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/cohort/${cohortData}`
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
            <table>
              <thead>
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Zoom</th>
                  <th className="px-6 py-4">iQualify</th>
                  <th className="px-6 py-4">Slack</th>
                  <th className="px-6 py-4">Github</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.id}</td>
                    <td>{user.zoom_logged_in}</td>
                    <td>{user.iqualify_logged_in}</td>
                    <td>{user.slack_logged_in}</td>
                    <td>{user.github_last_commit}</td>
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
