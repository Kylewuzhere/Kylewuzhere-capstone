import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET learners route
// Returns a list of all learners in the database
// Reference: https://nextjs.org/docs/app/building-your-application/routing/router-handlers (Scroll down to the first code snippet of Dynamic Route Handlers
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // query is the search query from the url with the name "search"
  const query = searchParams.get("search");

  if (query !== null) {
    const entries = query.replace(/[^a-z\p{L} ]/giu, "").split(" ");
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
