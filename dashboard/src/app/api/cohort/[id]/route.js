import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const { searchParams } = request.nextUrl;

  if (!id) {
    return NextResponse.error(400, "Missing id");
  }

  const query = `
    SELECT *
    FROM cohort
    JOIN users ON cohort.id = users.cohort_id
    WHERE cohort.id = $1;
  `;

  try {
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.error(500, "Internal server error");
  }
}
