import pool from "@/app/db";
import { NextResponse } from "next/server";

// /GET Cohorts route
// Returns a list of all cohorts in the database
export async function GET() {
  const { rows } = await pool.query("SELECT id, name FROM cohorts");
  return NextResponse.json({ rows });
}
