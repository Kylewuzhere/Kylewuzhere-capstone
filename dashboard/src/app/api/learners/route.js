import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET learners route
// Returns a list of all learners in the database
export async function GET() {
  const { rows } = await pool.query(
    "SELECT first_name,last_name,users.id,cohort.name,programme_start,last_updated FROM users FULL OUTER JOIN iqualify_data on users.id=iqualify_data.user_id FULL OUTER JOIN cohort on users.cohort_id=cohort.id Limit 7"
  );
  return NextResponse.json({ rows });
}
