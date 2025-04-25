import type { FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import type { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import { useQuery } from "@tanstack/react-query";

export const useRecentTracks = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["recentTracks", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/recent-tracks?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTopAlbums = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["topAlbums", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/top-albums?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useWeeklyAlbums = (page = 1, limit = 22) => {
  return useQuery({
    queryKey: ["weeklyAlbums", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/weekly-albums?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useTopArtists = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["topArtists", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/top-artists?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useAlbumCoverArt = (albumMbId: string) => {
  return useQuery({
    queryKey: ["albumCoverArt", albumMbId],
    queryFn: async () => {
      const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`, {
        cache: "no-store",
      });
      return response.json() as Promise<MusicBrainzCoverArt.RootObject>;
    },
    enabled: !!albumMbId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useFanartTvData = (mbid: string) => {
  return useQuery({
    queryKey: ["fanartTv", mbid],
    queryFn: async () => {
      const response = await fetch(`/api/fanart/${mbid}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<FanArtArtistResponse>;
    },
    enabled: !!mbid,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
