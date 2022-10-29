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
import request from './request';

const LastFmApi = function LastFmApi() {
  /**
   * POST: Auth - LastFM
   *
   * https://www.last.fm/api/show/auth.getToken
   *
   * Authentication tokens are API account specific.
   * They are valid for 60 minutes from the moment they are granted.
   * Can only used once (they are consumed when a session is created).
   * @returns Auth token
   */
  const auth = (method: string, user: string): Promise<AuthResponse> => {
    return request(method, user);
  };

  /**
   * GET: User profile information - LastFM
   *
   * https://www.last.fm/api/show/user.getInfo
   * @returns User profile data
   */
  const getInfo = (method: string, user: string): Promise<UserResponse> => {
    return request(method, user);
  };

  /**
   * GET: Love Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getLovedTracks
   * @returns Loved Tracks
   */
  const getLovedTracks = (method: string, user: string): Promise<LovedTracksResponse> => {
    return request(method, user);
  };

  /**
   * GET: Recent Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getRecentTracks
   * @returns Recent Tracks
   */
  const getRecentTracks = (method: string, user: string): Promise<RecentTracksResponse> => {
    return request(method, user);
  };

  /**
   * GET: Top Albums - LastFM
   *
   * https://www.last.fm/api/show/user.getTopAlbums
   * @returns Top Albums
   */
  const getTopAlbums = (method: string, user: string): Promise<TopAlbumsResponse> => {
    return request(method, user);
  };

  /**
   * GET: Top Artist - LastFM
   *
   * https://www.last.fm/api/show/user.getTopArtists
   * @returns Top Artists
   */
  const getTopArtists = (method: string, user: string): Promise<TopArtistsResponse> => {
    return request(method, user);
  };

  /**
   * GET: Top Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getTopTracks
   * @returns Top Tracks
   */
  const getTopTracks = (method: string, user: string): Promise<TopTrackResponse> => {
    return request(method, user);
  };

  /**
   * GET: Weekly album chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyAlbumChart
   * @returns Weekly album chart
   */
  const getWeeklyAlbumChart = (method: string, user: string): Promise<WeeklyAlbumChartResponse> => {
    return request(method, user);
  };

  /**
   * GET: Weekly artist chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyArtistChart
   * @returns Weekly artist chart
   */
  const getWeeklyArtistChart = (method: string, user: string): Promise<WeeklyArtistChartResponse> => {
    return request(method, user);
  };

  /**
   * GET: Weekly chart list - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyChartList
   * @returns Weekly chart list
   */
  const getWeeklyChartList = (method: string, user: string): Promise<WeeklyChartListResponse> => {
    return request(method, user);
  };

  /**
   * GET: Weekly track chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyTrackChart
   * @returns Weekly track chart
   */
  const getWeeklyTrackChart = (method: string, user: string): Promise<WeeklyTrackChartResponse> => {
    return request(method, user);
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
