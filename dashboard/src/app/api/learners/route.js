import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET learners route
// Returns a list of all learners in the database
// Reference: https://nextjs.org/docs/app/building-your-application/routing/router-handlers (Scroll down to the first code snippet of Dynamic Route Handlers
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // query is the search query from the url with the name "search"
  const query = searchParams.get("search");

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
          learners.current_subject_id,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'zoom' AND learner_id = learners.id) AS zoom_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'iqualify' AND learner_id = learners.id) AS iqualify_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'slack' AND learner_id = learners.id) AS slack_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'github' AND learner_id = learners.id) AS github_last_commit
        FROM learners
        JOIN cohorts ON learners.cohort_id = cohorts.id
        WHERE (learners.first_name LIKE $1 OR learners.last_name LIKE $1) OR (learners.first_name LIKE $2 OR learners.last_name LIKE $2)`,
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
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'zoom' AND learner_id = learners.id) AS zoom_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'iqualify' AND learner_id = learners.id) AS iqualify_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'slack' AND learner_id = learners.id) AS slack_logged_in,
          (SELECT MAX(event_time) FROM activity_log WHERE source = 'github' AND learner_id = learners.id) AS github_last_commit
        FROM learners
        JOIN cohorts ON learners.cohort_id = cohorts.id`
    );
    return NextResponse.json({ rows });
  }
}
