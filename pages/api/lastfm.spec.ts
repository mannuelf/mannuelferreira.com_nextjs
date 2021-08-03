import LAST_FM from '@lib/api/lastFm';
import { rest } from 'msw';

const URL = `${LAST_FM.base_url}/?method=auth.getToken&api_key=${LAST_FM.api_key}&format=json`;

it('Returns OK, code 200 when API call is made', async () => {
  rest.post(URL, async (req, res, ctx) => {
    return await res(ctx.status(200));
  });
});

it('Should return an object { token: "edxCgH4i7RNIrVbIjuPpc" }', () => {
  rest.post(URL, async (req, res, ctx) => {
    return await res(ctx.json({ token: 'edxCgH4i7RNIrVbIjuPpc-3FUomwp4CP' }));
  });
});
