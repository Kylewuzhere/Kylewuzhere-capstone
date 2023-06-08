import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const id = params.id;
  if (!id) {
    return NextResponse.error(400, "Missing id");
  }

  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const offset = limit * (page - 1);

  const query = `
    SELECT
      learners.id,
      learners.first_name,
      learners.last_name,
    MAX(CASE WHEN activity_log.source = 'zoom' AND activity_log.event_type = 'joined meeting' THEN activity_log.event_time::text END) AS zoom_logged_in,
    MAX(CASE WHEN activity_log.source = 'iqualify' AND (activity_log.event_type = 'logged in' OR activity_log.event_type = 'joined meeting') THEN activity_log.event_time::text END) AS iqualify_logged_in,
    MAX(CASE WHEN activity_log.source = 'slack' AND activity_log.event_type = 'logged in' THEN activity_log.event_time::text END) AS slack_logged_in,
    MAX(CASE WHEN activity_log.source = 'github' AND activity_log.event_type = 'pushed commit' THEN activity_log.event_time::text END) AS github_last_commit
  FROM learners
  LEFT JOIN activity_log ON learners.id = activity_log.learner_id
  WHERE learners.cohort_id = $1
  AND (activity_log.source = 'zoom' OR activity_log.source = 'iqualify' OR activity_log.source = 'slack' OR activity_log.source = 'github')
  GROUP BY learners.id, learners.first_name, learners.last_name
  ORDER BY learners.first_name
  LIMIT ${limit}
  OFFSET ${offset}`;

  try {
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.error(500, "Internal server error");
  }
}
