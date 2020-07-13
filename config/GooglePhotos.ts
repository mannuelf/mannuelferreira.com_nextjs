export const config: object = {
  apiKey: process.env.NEXT_GOOGLE_API_KEY, // The OAuth client ID from the Google Developers console.
  oAuthClientID: process.env.NEXT_GOOGLE_CLIENT_ID, // The OAuth client ID from the Google Developers console.
  oAuthClientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET, // The OAuth client secret from the Google Developers console.
  oAuthCallbackUrl: {
    local: process.env.NEXT_GOOGLE_LOCAL_REDIRECT_URI,
    production: process.env.NEXT_GOOGLE_PRODUCTION_REDIRECT_URI,
  }, // The callback to use for OAuth requests. This is the URL where the app is running. For testing and running it locally, use 127.0.0.1.
  port: 3000, // The port where the app should listen for requests.
  scopes: {
    // The scopes to request. The app requires the photos library.readonly and plus.me scopes.
    photosLibrary: process.env.NEXT_GOOGLE_PHOTOS_SCOPE_LIBRARY,
  },
  photosToLoad: 5, // The number of photos to load for search requests.
  searchPageSize: 100, // The page size to use for search requests. 100 is recommended.
  albumPageSize: 10, // The page size to use for the listing albums request. 50 is recommended.
  apiEndpoint: 'https://photoslibrary.googleapis.com', // The API end point to use. Do not change.
};
