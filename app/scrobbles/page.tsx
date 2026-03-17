// Force dynamic rendering for real-time data
export const dynamic = "force-dynamic";

import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import RecentTracks from "./_components/recentTracks";
import TopAlbums from "./_components/topAlbums";
import TopArtists from "./_components/topArtists";
import UserProfile from "./_components/userProfile";
import WeeklyAlbums from "./_components/weeklyAlbums";
import {
  RecentTracksLoading,
  TopAlbumsLoading,
  TopArtistsLoading,
  WeeklyAlbumsLoading,
} from "./loading";

export default async function Scrobbles() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="p-2">
          <div className="flex items-center gap-3 py-6 lg:py-10">
            <PageTitle>Scrobbles</PageTitle>
            <UserProfile />
          </div>
          <Suspense fallback={<RecentTracksLoading />}>
            <RecentTracks />
          </Suspense>
          <Suspense fallback={<TopArtistsLoading />}>
            <TopArtists />
          </Suspense>
          <Suspense fallback={<TopAlbumsLoading />}>
            <TopAlbums />
          </Suspense>
          <Suspense fallback={<WeeklyAlbumsLoading />}>
            <WeeklyAlbums />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
