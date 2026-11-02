export type LaunchRow = {
  id: string;
  user_id: string;
  author_name: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  category: string;
  launch_date: string;
  created_at: string;
  backings?: { backer_id: string }[];
};

export type PactStatus = "own" | "none" | "backed" | "backs_you" | "pact";

/**
 * A pact forms when you back someone's launch AND they back at least one of yours.
 */
export function pactStatus(
  launch: Pick<LaunchRow, "id" | "user_id">,
  me: string | null,
  myBackedLaunchIds: Set<string>,
  backersOfMyLaunches: Set<string>,
): PactStatus {
  if (!me) return "none";
  if (launch.user_id === me) return "own";
  const iBacked = myBackedLaunchIds.has(launch.id);
  const theyBackMe = backersOfMyLaunches.has(launch.user_id);
  if (iBacked && theyBackMe) return "pact";
  if (iBacked) return "backed";
  if (theyBackMe) return "backs_you";
  return "none";
}

export const FREE_PACT_LIMIT = 10;

export function daysUntil(dateStr: string, now = new Date()): number {
  const d = new Date(dateStr + "T00:00:00Z");
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((d.getTime() - today) / 86400000);
}
