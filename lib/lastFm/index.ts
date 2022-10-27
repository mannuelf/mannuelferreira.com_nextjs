import { ARTIST_ENDPOINT, USER } from './config';

import { getData } from './getData';
import { UserResponse, TopArtistsResponse } from './lastFm.types';

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
