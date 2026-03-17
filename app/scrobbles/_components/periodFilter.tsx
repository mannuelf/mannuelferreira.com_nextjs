"use client";

import { PERIODS, RECENT_PERIODS } from "../types";

interface PeriodFilterProps {
  value: string;
  onChange: (period: string) => void;
  variant?: "recent";
}

export default function PeriodFilter({ value, onChange, variant }: PeriodFilterProps) {
  const periods = variant === "recent" ? RECENT_PERIODS : PERIODS;

  return (
    <div className="flex gap-1">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`px-4 py-1 text-sm rounded-full border transition-colors cursor-pointer ${
            value === p.value
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
