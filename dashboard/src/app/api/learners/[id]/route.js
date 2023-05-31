import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const { searchParams } = request.nextUrl;
  try {
    const query = `
      SELECT users.*, cohort.name
      FROM users
      FULL OUTER JOIN cohort ON users.cohort_id = cohort.id
      WHERE users.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return null;
  }
}
