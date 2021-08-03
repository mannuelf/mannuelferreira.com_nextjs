const LAST_FM = {
  app_name: process.env.NEXT_PUBLIC_LASTFM_APPNAME,
  registered_to: process.env.NEXT_PUBLIC_LASTFM_REGISTERED_TO,
  base_url: process.env.NEXT_PUBLIC_LASTFM_API_URL,
  api_key: process.env.NEXT_PUBLIC_LASTFM_API_KEY,
  user: process.env.NEXT_PUBLIC_LASTFM_REGISTERED_TO,
  share_secret: process.env.NEXT_PUBLIC_LASTFM_SHARED_SECRET,
  methods: {
    top_artists: 'user.getTopArtists',
  },
};

export default LAST_FM;
