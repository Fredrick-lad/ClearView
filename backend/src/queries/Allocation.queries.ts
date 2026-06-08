import pool from "../database.js";
export async function createIncomeAllocation(
  incomeId: number,
  envelopeId: number,
  periodId: number,
  amount: number
) {
  const sql = `
    INSERT INTO IncomeAllocation
    (income_id, envelope_id, period_id, allocated_amount)
    VALUES (?, ?, ?, ?)
  `;

  return pool.query(sql, [incomeId, envelopeId, periodId, amount]);
}