import fetch from 'node-fetch';

import { ARTIST_ENDPOINT, USER } from './config';
import { UserResponse, TopArtistsResponse } from './lastFm.types';

const getData = async (url: string) =>
  await fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥', error))
    .finally(() => {});

const LastFmApi = function LastFmApi() {
  const getTopArtists = (): Promise<TopArtistsResponse> => {
    return getData(`${ARTIST_ENDPOINT}`);
  };

  const getInfo = (): Promise<UserResponse> => {
    return getData(`${USER}`);
  };

  return {
    getInfo,
    getTopArtists,
  };
};

export default LastFmApi;
