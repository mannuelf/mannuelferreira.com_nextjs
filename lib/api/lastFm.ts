const LAST_FM = {
  app_name: `${process.env.LASTFM_APPNAME}`,
  registered_to: `${process.env.LASTFM_REGISTERED_TO}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  api_key: `${process.env.LASTFM_API_KEY}`,
  user: `${process.env.LASTFM_REGISTERED_TO}`,
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  methods: {
    user: {
      info: 'user.getInfo',
      top_artists: 'user.getTopArtists',
      top_tracks: 'user.getTopTracks',
      top_albums: 'user.getTopAlbums',
      loved_tracks: 'user.getLovedTracks',
      weekly_album_chart: 'user.getWeeklyAlbumChart',
      weekly_artist_chart: 'user.getWeeklyArtistChart',
    },
    auth: {
      token: 'auth.getToken',
    },
  },
  format: {
    json: 'json',
    xml: 'xml',
  },
};

export const AUTH_ENDPOINT = `${LAST_FM.base_url}/2.0/?method=${LAST_FM.methods.auth.token}&api_key=${LAST_FM.api_key}&format=${LAST_FM.format.json}`;
export const ARTIST_ENDPOINT = `${LAST_FM.base_url}/2.0/?method=${LAST_FM.methods.user.top_artists}&user=${LAST_FM.user}&limit=100&api_key=${LAST_FM.api_key}&format=${LAST_FM.format.json}`;
export const WEEKLY_ALBUM_CHART = `${LAST_FM.base_url}/2.0/?method=${LAST_FM.methods.user.weekly_album_chart}&user=${LAST_FM.user}&limit=20&api_key=${LAST_FM.api_key}&format=${LAST_FM.format.json}`;

export default LAST_FM;
