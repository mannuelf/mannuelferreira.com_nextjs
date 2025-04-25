export const RecentTracksLoading = () => (
  <div>
    <div className="pb-2 pl-4" id="#recenttracks">
      <h2 className="text-2xl font-medium">Recent Tracks</h2>
      <p>Listened to today</p>
    </div>
    <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`recent-track-loading-${index}`} className="animate-pulse">
          <div className="h-80 md:h-85 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export const TopAlbumsLoading = () => (
  <div>
    <div className="pb-2 pl-4">
      <h2 className="text-2xl font-medium">Top Albums</h2>
      <p>Top Albums of all time</p>
    </div>
    <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`top-album-loading-${index}`} className="animate-pulse">
          <div className="h-80 md:h-85 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export const WeeklyAlbumsLoading = () => (
  <div>
    <div className="pb-2 pl-4" id="#weeklyalbumcharts">
      <h2 className="text-2xl font-medium">Weekly Album Charts</h2>
      <p>Scrobbles this week</p>
    </div>
    <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`weekly-album-loading-${index}`} className="animate-pulse">
          <div className="h-80 md:h-85 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export const TopArtistsLoading = () => (
  <div>
    <div className="pb-2 pl-4" id="#topartists">
      <h2 className="text-2xl font-medium">Top Artists</h2>
      <p>Scrobbles since 2008</p>
    </div>
    <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 top-artist sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`top-artist-loading-${index}`} className="animate-pulse">
          <div className="h-80 md:h-85 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export default function Loading() {
  return (
    <div>
      <div className="container mx-auto">
        <div className="p-2">
          <RecentTracksLoading />
          <TopAlbumsLoading />
          <WeeklyAlbumsLoading />
          <TopArtistsLoading />
        </div>
      </div>
    </div>
  );
}
