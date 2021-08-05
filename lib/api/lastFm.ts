const LAST_FM = {
  app_name: `${process.env.LASTFM_APPNAME}`,
  registered_to: `${process.env.LASTFM_REGISTERED_TO}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  api_key: `${process.env.LASTFM_API_KEY}`,
  user: `${process.env.LASTFM_REGISTERED_TO}`,
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  methods: {
    get_top_artists: 'user.getTopArtists',
    get_token: 'auth.getToken',
  },
  format: {
    json: 'json',
    xml: 'xml',
  },
};

export const AUTH_ENDPOINT = `${LAST_FM.base_url}/2.0/?method=${LAST_FM.methods.get_token}&api_key=${LAST_FM.api_key}&format=json`;
export const ARTIST_ENDPOINT = `${LAST_FM.base_url}/2.0/?method=${LAST_FM.methods.get_top_artists}&user=${LAST_FM.user}&api_key=${LAST_FM.api_key}&format=${LAST_FM.format.json}`;

export default LAST_FM;
