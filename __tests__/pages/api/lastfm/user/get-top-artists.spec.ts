import {
  LASTFM_API_KEY,
  LASTFM_BASE_URL,
  LASTFM_METHOD,
  LASTFM_USER,
} from '../../../../../shared/constants';
import axios from 'axios';

console.log('🚧', LASTFM_API_KEY);

describe('getTopArtists', () => {
  it('Returns 200 OK responses', () => {
    const API_URL = `${LASTFM_BASE_URL}/?method=${LASTFM_METHOD.TOP_ARTISTS}&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`;
    console.log('🚨', API_URL);
  });
});
