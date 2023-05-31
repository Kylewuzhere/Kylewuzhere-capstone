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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Zoom</th>
          <th>iQualify</th>
          <th>Slack</th>
          <th>Github</th>
        </tr>
      </thead>
    </table>
  );
};
