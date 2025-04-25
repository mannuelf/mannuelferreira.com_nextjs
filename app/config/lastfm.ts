export const LASTFM_CONFIG = {
  API_BASE_URL: "https://ws.audioscrobbler.com/2.0",
  USER: process.env.LASTFM_USER,
  // Only use these server-side
  API_KEY: process.env.LASTFM_API_KEY,
  API_SECRET: process.env.LASTFM_API_SECRET,
  APP_NAME: process.env.LASTFM_APPNAME,
} as const;
