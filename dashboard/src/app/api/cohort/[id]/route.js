import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  if (!id) {
    return NextResponse.error(400, "Missing id");
  }

  const query = `
  SELECT
  users.id,
  users.first_name,
  users.last_name,
  COALESCE(zoom.event_time::text, NULL) AS zoom_logged_in,
  COALESCE(iqualify.event_time::text, NULL) AS iqualify_logged_in,
  COALESCE(slack.event_time::text, NULL) AS slack_logged_in,
  COALESCE(github.event_time::text, NULL) AS github_last_commit
FROM
  users
LEFT JOIN (
  SELECT user_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'Zoom' AND event_type = 'logged in'
  GROUP BY user_id
) AS zoom ON users.id = zoom.user_id 
LEFT JOIN (
  SELECT user_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'iQualify' AND (event_type = 'logged in' OR event_type = 'joined meeting')
  GROUP BY user_id
) AS iqualify ON users.id = iqualify.user_id
LEFT JOIN (
  SELECT user_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'Slack' AND event_type = 'logged in'
  GROUP BY user_id
) AS slack ON users.id = slack.user_id 
LEFT JOIN (
  SELECT user_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'Github' AND event_type = 'pushed commit'
  GROUP BY user_id
) AS github ON users.id = github.user_id
WHERE users.cohort_id = $1;

`;

  try {
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.error(500, "Internal server error");
  }
}
