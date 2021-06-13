import { rest } from 'msw';

const apiURL = `${process.env.NEXT_PUBLIC_LASTFM_API_URL}/?method=auth.getToken&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`;

/**
 * Handle API call to LastFm to get auth token
 * @endpoint /api/lastfm
 * @response 200
 */
export const handlers = [
  rest.post(apiURL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(apiURL, (req, res, ctx) => {
    return res(ctx.json({ token: 'edxCgH4i7RNIrVbIjuPpc-3FUomwp4CP' }));
  }),
];
