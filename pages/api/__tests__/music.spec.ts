import { rest } from 'msw';

it('Returns OK, code 200 when API call is made', async () => {
  rest.get('/api/music', async (req, res, ctx) => {
    return await res(ctx.status(200));
  });
});
