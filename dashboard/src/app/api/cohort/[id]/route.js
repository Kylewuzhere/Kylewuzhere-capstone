import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const { searchParams } = request.nextUrl;

  const query = `
    SELECT *
    FROM cohort
    JOIN users ON cohort.id = users.cohort_id
    WHERE cohort.id = $1;
  `;
}
