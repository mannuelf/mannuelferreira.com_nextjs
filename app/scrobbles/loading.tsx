const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="h-80 md:h-[340px] bg-muted rounded-lg" />
  </div>
);

const SkeletonChips = ({ count = 6 }: { count?: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-7 w-10 bg-muted rounded-full animate-pulse" />
    ))}
  </div>
);

const SkeletonHeader = ({
  title,
  subtitle,
  chipCount = 6,
}: {
  title: string;
  subtitle: string;
  chipCount?: number;
}) => (
  <div className="flex items-start justify-between pb-2 pl-4 pr-1">
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-medium">{title}</h2>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
    <SkeletonChips count={chipCount} />
  </div>
);

const SkeletonLoadMore = () => (
  <div className="flex justify-center pb-8 pt-2">
    <div className="h-12 w-32 bg-black dark:bg-white rounded-full animate-pulse opacity-30" />
  </div>
);

export const RecentTracksLoading = () => (
  <div>
    <SkeletonHeader title="Recent Tracks" subtitle="Listened to today" chipCount={6} />
    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={`recent-track-loading-${i}`} />
      ))}
    </div>
    <SkeletonLoadMore />
  </div>
);

export const TopArtistsLoading = () => (
  <div>
    <SkeletonHeader title="Top Artists" subtitle="Scrobbles since 2008" chipCount={6} />
    <div className="grid grid-flow-row-dense gap-2 top-artist sm:grid-cols-2 md:grid-cols-2 md:min-h-[1036px] lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={`top-artist-loading-${i}`} />
      ))}
    </div>
    <SkeletonLoadMore />
  </div>
);

export const TopAlbumsLoading = () => (
  <div>
    <SkeletonHeader title="Top Albums" subtitle="Top Albums of all time" chipCount={6} />
    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={`top-album-loading-${i}`} />
      ))}
    </div>
    <SkeletonLoadMore />
  </div>
);

export const WeeklyAlbumsLoading = () => (
  <div>
    <div className="pb-2 pl-4">
      <h2 className="text-2xl font-medium">Weekly Album Charts</h2>
      <p className="text-muted-foreground text-sm">Scrobbles this week</p>
    </div>
    <div className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={`weekly-album-loading-${i}`} />
      ))}
    </div>
  </div>
);

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="p-2">
        <div className="flex items-center gap-3 py-6 lg:py-10">
          <div className="h-12 w-48 bg-muted rounded-lg animate-pulse" />
        </div>
        <RecentTracksLoading />
        <TopArtistsLoading />
        <TopAlbumsLoading />
        <WeeklyAlbumsLoading />
      </div>
    </div>
  );
}
