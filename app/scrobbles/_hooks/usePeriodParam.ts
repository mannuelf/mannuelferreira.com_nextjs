"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Period, RecentPeriod } from "../types";

export function usePeriodParam(key: string, defaultPeriod: Period | RecentPeriod = "overall"): [Period | RecentPeriod, (p: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();

  const period = (searchParams.get(key) as Period | RecentPeriod) || defaultPeriod;

  const setPeriod = useCallback(
    (p: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, p);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [key, router, searchParams],
  );

  return [period, setPeriod];
}
