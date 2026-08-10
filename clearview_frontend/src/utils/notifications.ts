import type { NotificationItem } from "../hooks/context/generalContext";

interface BudgetEnvelope {
  id?: number;
  current_spend?: string | number;
  monthly_limit?: string | number;
}

export function getUnreadNotificationsCount(
  notifications: NotificationItem[],
  envelopeData: unknown,
  readAtMs: number,
): number {
  const envelopes: BudgetEnvelope[] = Array.isArray(envelopeData)
    ? (envelopeData as BudgetEnvelope[])
    : [];
  const alertedKeys = new Set<string>();
  let count = 0;

  for (const env of envelopes) {
    const spent = parseFloat(String(env.current_spend)) || 0;
    const limit = parseFloat(String(env.monthly_limit)) || 0;
    if (limit > 0 && spent / limit >= 0.9) {
      const key = `budget-${env.id}-${Math.floor((spent / limit) * 10)}`;
      if (!alertedKeys.has(key)) {
        alertedKeys.add(key);
        count++;
      }
    }
  }

  for (const n of notifications) {
    if (n.timestamp > readAtMs) count++;
  }

  return count;
}
