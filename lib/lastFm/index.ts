import fetch from 'node-fetch';
import { ARTIST_ENDPOINT, USER } from './lastFm';
import { LastFm } from './lastFm.types';

const getData = async (url: string) =>
  await fetch(`${url}`)
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥', error));

const LastFmApi = function LastFmApi() {
  const getTopArtists = (): Promise<LastFm.TopArtistsResponse> => {
    return getData(`${ARTIST_ENDPOINT}`);
  };

  const getInfo = (): Promise<LastFm.UserResponse> => {
    return getData(`${USER}`);
  };

  return {
    getInfo,
    getTopArtists,
  };
};

export default LastFmApi;
