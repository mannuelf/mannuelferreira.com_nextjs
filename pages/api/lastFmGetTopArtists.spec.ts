import LAST_FM from '@lib/api/lastFm';

describe('getTopArtists', () => {
  it('Returns 200 OK responses', () => {
    const URL = `${LAST_FM.base_url}/?method=${LAST_FM.methods.top_artists}&user=${LAST_FM.user}&api_key=${LAST_FM.api_key}&format=json`;
    console.log('🚨', URL);
  });
});
