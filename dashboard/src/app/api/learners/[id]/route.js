import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const query = `
    SELECT learners.*, cohorts.name, subjects.name AS subject_name
    FROM learners
    FULL OUTER JOIN cohorts ON learners.cohort_id = cohorts.id
    JOIN subjects ON learners.current_subject_id = subjects.id
    WHERE learners.id = $1;
    `;

  try {
    if (!id) {
      return NextResponse.json(
        {
          error: "Learner Not Found",
          rows,
        },
        { status: 404 }
      );
    }
    const { rows } = await pool.query(query, [id]);
    if (rows.length < 1) {
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
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
