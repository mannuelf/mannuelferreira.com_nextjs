import {
  AUTH_URL,
  LOVED_TRACKS_URL,
  RECENT_TRACKS_URL,
  TOP_ALBUMS_URL,
  TOP_ARTIST_URL,
  TOP_TRACKS,
  USER_URL,
  WEEKLY_ALBUM_CHART_URL,
  WEEKLY_ARTIST_CHART_URL,
  WEEKLY_CHART_LIST_URL,
  WEEKLY_TRACK_CHART_URL,
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
  WeeklyArtistChartResponse,
  WeeklyChartListResponse,
  WeeklyTrackChartResponse,
} from './lastFm.types';

const LastFmApi = function LastFmApi() {
  const auth = (): Promise<AuthResponse> => {
    return fetchData(`${AUTH_URL}`);
  };

  const getInfo = (): Promise<UserResponse> => {
    return fetchData(`${USER_URL}`);
  };

  const getLovedTracks = (): Promise<LovedTracksResponse> => {
    return fetchData(`${LOVED_TRACKS_URL}`);
  };

  /**
   * GET: Recent Tracks - LastFM
   * docs: https://www.last.fm/api/show/user.getRecentTracks
   * @returns RecentTracksResponse.
   */
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

  const getWeeklyArtistChart = (): Promise<WeeklyArtistChartResponse> => {
    return fetchData(`${WEEKLY_ARTIST_CHART_URL}`);
  };

  const getWeeklyChartList = (): Promise<WeeklyChartListResponse> => {
    return fetchData(`${WEEKLY_CHART_LIST_URL}`);
  };

  const getWeeklyTrackChart = (): Promise<WeeklyTrackChartResponse> => {
    return fetchData(`${WEEKLY_TRACK_CHART_URL}`);
  };

  return {
    auth,
    getInfo,
    getLovedTracks,
    getRecentTracks,
    getTopAlbums,
    getTopArtists,
    getTopTracks,
    getWeeklyAlbumChart,
    getWeeklyArtistChart,
    getWeeklyChartList,
    getWeeklyTrackChart,
  };
};

export default LastFmApi;
