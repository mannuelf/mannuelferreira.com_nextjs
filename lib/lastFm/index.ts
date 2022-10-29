import {
  AUTH_URL,
  RECENT_TRACKS_URL,
  TOP_ALBUMS_URL,
  TOP_ARTIST_URL,
  TOP_TRACKS,
  USER_URL,
  WEEKLY_ALBUM_CHART_URL,
} from './config';

import fetchData from './fetchData';
import {
  AuthResponse,
  LovedTracksResponse,
  RecentTracksResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  TopTrackResponse,
  UserResponse,
  WeeklyAlbumChartResponse,
} from './lastFm.types';

const LastFmApi = function LastFmApi() {
  const auth = (): Promise<AuthResponse> => {
    return fetchData(`${AUTH_URL}`);
  };

  const getInfo = (): Promise<UserResponse> => {
    return fetchData(`${USER_URL}`);
  };

  const getLovedTracks = (): Promise<LovedTracksResponse> => {
    return fetchData(`${RECENT_TRACKS_URL}`);
  };

  const getRecentTracks = (): Promise<RecentTracksResponse> => {
    return fetchData(`${RECENT_TRACKS_URL}`);
  };

  const getTopAlbums = (): Promise<TopAlbumsResponse> => {
    return fetchData(`${TOP_ALBUMS_URL}`);
  };

  const getTopArtists = (): Promise<TopArtistsResponse> => {
    return fetchData(`${TOP_ARTIST_URL}`);
  };

  const getTopTracks = (): Promise<TopTrackResponse> => {
    return fetchData(`${TOP_TRACKS}`);
  };

  const getWeeklyAlbumChart = (): Promise<WeeklyAlbumChartResponse> => {
    return fetchData(`${WEEKLY_ALBUM_CHART_URL}`);
  };

  return {
    auth,
    getLovedTracks,
    getInfo,
    getRecentTracks,
    getTopAlbums,
    getTopArtists,
    getTopTracks,
    getWeeklyAlbumChart,
  };
};

export default LastFmApi;
