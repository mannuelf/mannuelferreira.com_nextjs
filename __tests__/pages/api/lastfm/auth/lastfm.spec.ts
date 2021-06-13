import { rest } from 'msw';

const apiURL = `${process.env.NEXT_PUBLIC_LASTFM_API_URL}/?method=auth.getToken&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`;

it('Returns OK, code 200 when API call is made', async () => {
  rest.post(apiURL, async (req, res, ctx) => {
    return await res(ctx.status(200));
  });
});

it('Should return an object { token: "edxCgH4i7RNIrVbIjuPpc" }', () => {
  rest.post(apiURL, async (req, res, ctx) => {
    return await res(ctx.json({ token: 'edxCgH4i7RNIrVbIjuPpc-3FUomwp4CP' }));
  });
});
