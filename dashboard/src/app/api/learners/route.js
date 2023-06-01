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
      "SELECT first_name,last_name,users.id,cohort.name,programme_start,last_updated FROM users FULL OUTER JOIN iqualify_data ON users.id=iqualify_data.user_id FULL OUTER JOIN cohort ON users.cohort_id=cohort.id WHERE (first_name LIKE INITCAP($1) OR last_name LIKE INITCAP($1)) OR (last_name LIKE INITCAP($2) OR first_name LIKE INITCAP($2))",
      [entries[0], entries[1]]
    );
    return NextResponse.json({ rows });
  } else {
    // returns ALL learners
    const { rows } = await pool.query(
      "SELECT first_name,last_name,users.id,cohort.name,programme_start,last_updated FROM users FULL OUTER JOIN iqualify_data on users.id=iqualify_data.user_id FULL OUTER JOIN cohort on users.cohort_id=cohort.id Limit 7"
    );
    return NextResponse.json({ rows });
  }
}
