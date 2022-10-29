import { TOP_ARTIST_URL, TOP_ALBUMS_URL, USER_URL, AUTH_URL, RECENT_TRACKS_URL } from './config';

import fetchData from './fetchData';
import {
  AuthResponse,
  RecentTracksResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  UserResponse,
} from './lastFm.types';

const LastFmApi = function LastFmApi() {
  const auth = (): Promise<AuthResponse> => {
    return fetchData(`${AUTH_URL}`);
  };

  const getInfo = (): Promise<UserResponse> => {
    return fetchData(`${USER_URL}`);
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

  return {
    auth,
    getInfo,
    getRecentTracks,
    getTopAlbums,
    getTopArtists,
  };
};

export default LastFmApi;
