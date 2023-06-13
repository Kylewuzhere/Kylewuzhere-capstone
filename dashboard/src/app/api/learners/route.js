import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET learners route
// Returns a list of all learners in the database
// Reference: https://nextjs.org/docs/app/building-your-application/routing/router-handlers (Scroll down to the first code snippet of Dynamic Route Handlers
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const offset = limit * (page - 1);

  const sortOptions = {
    name: "learners.first_name",
    cohort: "cohorts.name",
    startDate: "cohorts.programme_start",
    programmeLevel: "learners.programme",
    iQualify: "iqualify_logged_in",
    slack: "slack_logged_in",
  };

  const sortColumn = sortOptions[sort] || "learners.first_name";

  const filters = {
    inactive: "current_subject_id = 999",
    active: "current_subject_id >= 0 AND current_subject_id <= 7",
    all: "current_subject_id >= 0 AND current_subject_id <= 7 OR current_subject_id = 999",
  };

  let sqlQuery = `SELECT
        learners.id,
        learners.first_name,
        learners.last_name,
        learners.current_subject_id,
        cohorts.name AS cohort_name,
        cohorts.programme_start,
        learners.programme,
        MAX(CASE WHEN activity_log.source = 'zoom' THEN activity_log.event_time END) AS zoom_logged_in,
        MAX(CASE WHEN activity_log.source = 'iqualify' THEN activity_log.event_time END) AS iqualify_logged_in,
        MAX(CASE WHEN activity_log.source = 'slack' THEN activity_log.event_time END) AS slack_logged_in,
        MAX(CASE WHEN activity_log.source = 'github' THEN activity_log.event_time END) AS github_last_commit
      FROM learners
      JOIN cohorts ON learners.cohort_id = cohorts.id
      LEFT JOIN activity_log ON learners.id = activity_log.learner_id`;

  const queryParameters = [];
  if (filter === "inactive") {
    sqlQuery += ` WHERE ${filters[filter]}`;
  } else if (filter === "active") {
    sqlQuery += ` WHERE ${filters[filter]}`;
  }

  if (search) {
    sqlQuery += `
      ${filter === "inactive" || filter === "active" ? "AND" : "WHERE"} (
        learners.first_name LIKE $${queryParameters.length + 1} OR
        learners.last_name LIKE $${queryParameters.length + 1}
    )`;
    queryParameters.push(`${search}%`);
  }

  sqlQuery += `
    GROUP BY
      learners.id,
      learners.first_name,
      learners.last_name,
      learners.current_subject_id,
      cohorts.name,
      cohorts.programme_start,
      learners.programme
    ORDER BY
      ${sortColumn} ${order}
    LIMIT ${limit}
    OFFSET ${offset}`;

  try {
    if (!limit || !page || !sort || !order) {
      return NextResponse.json(
        { error: "Bad Request", rows: [] },
        { status: 400 }
      );
    } else {
      const { rows } = await pool.query(sqlQuery, queryParameters);
      if (search && rows.length === 0) {
        return NextResponse.json(
          {
            error: "Learner Not Found",
            rows,
          },
          { status: 404 }
        );
      } else {
        return NextResponse.json({ rows }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
