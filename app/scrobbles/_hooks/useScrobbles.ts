import type { FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import type { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import { useQuery } from "@tanstack/react-query";

export const useRecentTracks = (page = 1, limit = 12, period = "7day") => {
  return useQuery({
    queryKey: ["recentTracks", page, limit, period],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/recent-tracks?limit=${limit}&period=${period}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTopAlbums = (page = 1, limit = 12, period = "7day") => {
  return useQuery({
    queryKey: ["topAlbums", page, limit, period],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/top-albums?limit=${limit}&period=${period}`);
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

export const useTopArtists = (page = 1, limit = 12, period = "7day") => {
  return useQuery({
    queryKey: ["topArtists", page, limit, period],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/top-artists?limit=${limit}&period=${period}`);
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

export const useUserTopTags = (limit = 50) => {
  return useQuery({
    queryKey: ["userTopTags", limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/top-tags?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useLovedTracks = (limit = 12) => {
  return useQuery({
    queryKey: ["lovedTracks", limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/loved-tracks?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useTagTopTracks = (tag: string, limit = 12) => {
  return useQuery({
    queryKey: ["tagTopTracks", tag, limit],
    queryFn: async () => {
      const response = await fetch(`/api/lastfm/tag-top-tracks?tag=${encodeURIComponent(tag)}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!tag,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useMultipleArtistsFanart = (mbids: string[]) => {
  return useQuery({
    queryKey: ["fanartTv", "multiple", mbids],
    queryFn: async () => {
      const promises = mbids.map(async (mbid) => {
        if (!mbid) return null;
        const response = await fetch(`/api/fanart/${mbid}`);
        if (!response.ok) return null;
        return response.json() as Promise<FanArtArtistResponse>;
      });
      return Promise.all(promises);
    },
    enabled: mbids.length > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
