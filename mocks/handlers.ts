import { rest } from 'msw';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';

/**
 * Handle API call to LastFm to get auth token
 * @endpoint /api/lastfm
 * @response 200
 */
export const handlers = [
  /*rest.post(apiURL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(apiURL, (req, res, ctx) => {
    return res(ctx.json({ token: 'edxCgH4i7RNIrVbIjuPpc-3FUomwp4CP' }));
  }),*/

  rest.get(ARTIST_ENDPOINT, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
