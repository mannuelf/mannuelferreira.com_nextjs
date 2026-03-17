# PRD: Scrobbles Page — Per-Section Date Filters

**Date:** 2026-03-17
**Status:** Draft

---

## Overview

Add interactive date period filters to each section of the `/scrobbles` page, allowing users to independently change the time range for Top Albums, Top Artists, and Top Tracks. Each section retains its own filter state client-side via URL search params so filters are shareable and survive page refresh.

---

## Goals

- Let visitors explore listening history across different time windows without navigating away
- Make each section independently filterable (not a single global filter)
- Persist filter state in the URL so links are shareable
- No page reload; instant refetch via React Query on filter change

---

## Non-Goals

- Pagination (already has `page` param in hooks but unused — leave it)
- User authentication or personalised data
- Saving filter preferences to localStorage or a backend
- Filtering `RecentTracks` (it's a real-time feed with no period concept)
- Filtering `WeeklyAlbums` (uses `from`/`to` timestamps — different API surface; out of scope for v1)

---

## Sections & API Support

| Section | API Method | Period Param | Supported Values |
|---|---|---|---|
| Top Artists | `user.getTopArtists` | `period` | `7day \| 1month \| 3month \| 6month \| 12month \| overall` |
| Top Albums | `user.getTopAlbums` | `period` | `7day \| 1month \| 3month \| 6month \| 12month \| overall` |
| Top Tracks *(new)* | `user.getTopTracks` | `period` | `7day \| 1month \| 3month \| 6month \| 12month \| overall` |
| Recent Tracks | `user.getRecentTracks` | — | No filter; always shows latest |
| Weekly Albums | `user.getWeeklyAlbumChart` | — | Uses `from`/`to`; out of scope v1 |

---

## URL Schema

Filters live in search params so they are shareable and bookmarkable.

```
/scrobbles?artists_period=1month&albums_period=overall&tracks_period=7day
```

| Param | Default | Controls |
|---|---|---|
| `artists_period` | `overall` | Top Artists section |
| `albums_period` | `overall` | Top Albums section |
| `tracks_period` | `overall` | Top Tracks section |

---

## UX Design

### Filter Control

Each filterable section gets a small inline tab/pill group at its header, e.g.:

```
Top Artists  [7d] [1M] [3M] [6M] [12M] [All]
```

- Active period is visually highlighted (e.g. filled/underlined pill)
- Changing a period immediately triggers a React Query refetch for that section only
- While loading, the section shows a skeleton overlay — existing cards fade slightly (opacity-50) to indicate stale data
- Default: `overall` ("All")

### Label Map

| API Value | Display Label |
|---|---|
| `7day` | `7d` |
| `1month` | `1M` |
| `3month` | `3M` |
| `6month` | `6M` |
| `12month` | `12M` |
| `overall` | `All` |

---

## Implementation Plan

### 1. Shared `PeriodFilter` component

**File:** `app/scrobbles/_components/periodFilter.tsx`

- Pure client component
- Accepts `value`, `onChange`, and optional `label` props
- Renders pill group with the 6 period options
- Calls `onChange(period)` on click

```typescript
type Period = "7day" | "1month" | "3month" | "6month" | "12month" | "overall";

interface PeriodFilterProps {
  value: Period;
  onChange: (period: Period) => void;
}
```

### 2. URL state hook

**File:** `app/scrobbles/_hooks/usePeriodParam.ts`

- Wraps `useSearchParams` + `useRouter` (Next.js `"use client"`)
- Returns `[period, setPeriod]` pair
- `setPeriod` calls `router.replace` with updated search params (shallow, no scroll)
- Accepts a `paramKey` argument (e.g. `"artists_period"`) and a default period

```typescript
function usePeriodParam(key: string, defaultPeriod: Period = "overall"): [Period, (p: Period) => void]
```

### 3. Update API routes to accept `period` param

**Files:**
- `app/api/lastfm/top-albums/route.ts`
- `app/api/lastfm/top-artists/route.ts`
- `app/api/lastfm/top-tracks/route.ts` *(new)*

Add `period` query param extraction with `"overall"` fallback. Validate against allowed values.

### 4. Update server-side lib functions

**File:** `app/lib/lastfm-server.ts`

Update signatures:
```typescript
getTopAlbums(limit = 50, period: Period = "overall")
getTopArtists(limit = 50, period: Period = "overall")
getTopTracks(limit = 50, period: Period = "overall")  // new
```

Pass `period` through to the `lastfm-nodejs-client` call.

### 5. Update React Query hooks

**File:** `app/scrobbles/_hooks/useScrobbles.ts`

Update signatures:
```typescript
useTopAlbums(page = 1, limit = 50, period: Period = "overall")
useTopArtists(page = 1, limit = 50, period: Period = "overall")
useTopTracks(page = 1, limit = 50, period: Period = "overall")  // new
```

- Include `period` in the query key so React Query refetches on change
- Include `period` as a query param in the fetch URL

### 6. Add Top Tracks section

**File:** `app/scrobbles/_components/topTracks.tsx` *(new)*

- Mirror pattern of `topAlbums.tsx`
- Uses `useTopTracks()` hook
- Integrates `PeriodFilter` at section header
- Last.fm `user.getTopTracks` returns tracks with `image[]` — same card pattern applies

### 7. Wire filters into existing section components

**Files:**
- `app/scrobbles/_components/topAlbums.tsx`
- `app/scrobbles/_components/topArtists.tsx`

Add `PeriodFilter` to each section's header. Read/write period via `usePeriodParam`. Pass period to data hook.

### 8. Update loading skeletons

**File:** `app/scrobbles/loading.tsx`

Add `TopTracksLoading` skeleton (mirrors existing ones). No changes needed to filter UI in skeletons — stale-data opacity handles the loading feel within sections.

---

## File Change Summary

| File | Change |
|---|---|
| `app/scrobbles/_components/periodFilter.tsx` | **New** — shared filter pill component |
| `app/scrobbles/_hooks/usePeriodParam.ts` | **New** — URL search param state hook |
| `app/scrobbles/_components/topTracks.tsx` | **New** — Top Tracks section |
| `app/scrobbles/_components/topAlbums.tsx` | **Update** — add period filter |
| `app/scrobbles/_components/topArtists.tsx` | **Update** — add period filter |
| `app/scrobbles/_hooks/useScrobbles.ts` | **Update** — add period to hooks + new `useTopTracks` |
| `app/lib/lastfm-server.ts` | **Update** — add period param to functions + new `getTopTracks` |
| `app/api/lastfm/top-albums/route.ts` | **Update** — accept `period` query param |
| `app/api/lastfm/top-artists/route.ts` | **Update** — accept `period` query param |
| `app/api/lastfm/top-tracks/route.ts` | **New** — API route for top tracks |
| `app/scrobbles/loading.tsx` | **Update** — add `TopTracksLoading` skeleton |
| `app/scrobbles/page.tsx` | **Update** — add Top Tracks section + wrap in Suspense |

---

## Open Questions

1. Should `WeeklyAlbums` be replaced with a proper `TopTracks` section, or kept as-is? The weekly chart is a different API surface and cannot take a period filter.
2. Should the filter state reset when navigating away and back, or always persist in the URL? (Current proposal: URL — always persists.)
3. Any preference on pill vs. dropdown for the filter control on mobile?

---

## Out of Scope (v2 ideas)

- `WeeklyAlbums` with date-range picker (`from`/`to` unix timestamps)
- Global "apply all" filter that sets all sections at once
- `RecentTracks` with a `from` timestamp filter
