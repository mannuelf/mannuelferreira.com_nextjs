import fetch from 'node-fetch';
import { USER } from './lastFm';
import { LastFm } from './lastFm.types';

const LastFmApi = function LastFmApi() {
  const getInfo = async (user: string): Promise<LastFm.UserResponse> => {
    const response = await fetch(`${USER}`)
      .then((res) => res.json())
      .then((json) => json)
      .catch((error) => console.log('🚩', error));
    return response;
  };

  return {
    getInfo,
  };
};

export default LastFmApi;
