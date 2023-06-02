import pool from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  if (!id) {
    return NextResponse.error(400, "Missing id");
  }

  const query = `
  SELECT
  learners.id,
  learners.first_name,
  learners.last_name,
  COALESCE(zoom.event_time::text, NULL) AS zoom_logged_in,
  COALESCE(iqualify.event_time::text, NULL) AS iqualify_logged_in,
  COALESCE(slack.event_time::text, NULL) AS slack_logged_in,
  COALESCE(github.event_time::text, NULL) AS github_last_commit
FROM
learners
LEFT JOIN (
  SELECT learner_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'zoom' AND event_type = 'joined meeting'
  GROUP BY learner_id
) AS zoom ON learners.id = zoom.learner_id 
LEFT JOIN (
  SELECT learner_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'iqualify' AND (event_type = 'logged in' OR event_type = 'joined meeting')
  GROUP BY learner_id
) AS iqualify ON learners.id = iqualify.learner_id
LEFT JOIN (
  SELECT learner_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'slack' AND event_type = 'logged in'
  GROUP BY learner_id
) AS slack ON learners.id = slack.learner_id 
LEFT JOIN (
  SELECT learner_id, MAX(event_time) AS event_time
  FROM activity_log
  WHERE source = 'github' AND event_type = 'pushed commit'
  GROUP BY learner_id
) AS github ON learners.id = github.learner_id
WHERE learners.cohort_id = $1;

`;

  try {
    const { rows } = await pool.query(query, [id]);
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching learner:", error);
    return NextResponse.error(500, "Internal server error");
  }
}
