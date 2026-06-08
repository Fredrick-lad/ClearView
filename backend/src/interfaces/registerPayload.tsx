export interface JwtPayload {
  username: string;
  email: string;
}

export type AllocationQuerryResult = {
  envelope_id: number;
  income_id: number;
  period_id: number;
};
