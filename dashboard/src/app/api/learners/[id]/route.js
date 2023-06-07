import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  try {
    const query = `
    SELECT learners.*, cohorts.name, subjects.name AS subject_name
    FROM learners
    FULL OUTER JOIN cohorts ON learners.cohort_id = cohorts.id
    JOIN subjects ON learners.current_subject_id = subjects.id
    WHERE learners.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return null;
  }
}
