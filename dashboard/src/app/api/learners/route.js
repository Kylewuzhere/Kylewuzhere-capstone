import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET learners route
// Returns a list of all learners in the database
// Reference: https://nextjs.org/docs/app/building-your-application/routing/router-handlers (Scroll down to the first code snippet of Dynamic Route Handlers
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // query is the search query from the url with the name "search"
  const query = searchParams.get("search");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const offset = limit * (page - 1);

  if (query !== null && query !== "" && query !== " ") {
    // slicer takes a string, returns an array of strings ready for SQL query
    const slicer = (input) => {
      // removes any non-alphabetic characters from the input, except spaces and unicode characters
      const cleanned = input.replace(/[^a-z\p{L} ]/giu, "");
      let entries = cleanned.split(" ");
      // removes empty strings from the array
      entries.filter(function (word) {
        return word !== "";
      });
      // Adds % to the end of each entry
      entries = entries.map((entry) => entry + "%");
      return entries;
    };
    const entries = slicer(query);
    // retrieves all learners that match the search query (NAME)
    const { rows } = await pool.query(
      `SELECT
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
      LEFT JOIN activity_log ON learners.id = activity_log.learner_id
      WHERE learners.first_name LIKE $1 OR learners.last_name LIKE $1 OR learners.first_name LIKE $2 OR learners.last_name LIKE $2 
      GROUP BY learners.id, learners.first_name, learners.last_name, learners.current_subject_id, cohorts.name, cohorts.programme_start, learners.programme
      ORDER BY learners.first_name
      LIMIT ${limit}
      OFFSET ${offset}`,
      [entries[0], entries[1]]
    );
    return NextResponse.json({ rows });
  } else {
    // returns ALL learners
    const { rows } = await pool.query(
      `SELECT
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
      LEFT JOIN activity_log ON learners.id = activity_log.learner_id
      GROUP BY learners.id, learners.first_name, learners.last_name, learners.current_subject_id, cohorts.name, cohorts.programme_start, learners.programme
      ORDER BY learners.first_name
      LIMIT ${limit}
      OFFSET ${offset}`
    );
    return NextResponse.json({ rows });
  }
}
