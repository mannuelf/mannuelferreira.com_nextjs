export type Period = "7day" | "1month" | "3month" | "6month" | "12month" | "overall";
export type RecentPeriod = "today" | "7day" | "1month" | "3month" | "6month" | "12month";

export const PERIODS: { value: Period; label: string }[] = [
  { value: "7day", label: "7d" },
  { value: "1month", label: "1M" },
  { value: "3month", label: "3M" },
  { value: "6month", label: "6M" },
  { value: "12month", label: "12M" },
  { value: "overall", label: "All" },
];

export const RECENT_PERIODS: { value: RecentPeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7day", label: "7d" },
  { value: "1month", label: "1M" },
  { value: "3month", label: "3M" },
  { value: "6month", label: "6M" },
  { value: "12month", label: "12M" },
];
