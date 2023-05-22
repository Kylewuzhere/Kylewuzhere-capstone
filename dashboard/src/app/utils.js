import pool from "@/app/db";

export async function GetCohorts() {
  const { rows } = await pool.query("SELECT * FROM cohorts");
  return rows;
}
