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
      "SELECT learners.id,first_name,last_name,cohorts.name,programme_start,last_updated FROM learners FULL OUTER JOIN iqualify_data ON learners.id=iqualify_data.learner_id FULL OUTER JOIN cohorts ON learners.cohort_id=cohorts.id WHERE (first_name LIKE $1 OR last_name LIKE $1) OR (last_name LIKE $2 OR first_name LIKE $2) AND learners.current_subject_id<999",
      [entries[0], entries[1]]
    );
    return NextResponse.json({ rows });
  } else {
    // returns ALL learners
    const { rows } = await pool.query(
      "SELECT learners.id,first_name,last_name,current_subject_id,cohorts.name,programme_start,last_updated FROM learners FULL OUTER JOIN iqualify_data on learners.id=iqualify_data.learner_id FULL OUTER JOIN cohorts on learners.cohort_id=cohorts.id WHERE learners.current_subject_id<999"
    );
    return NextResponse.json({ rows });
  }
}
