import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset request handlers during tests, so to not affect other tests
afterEach(() => {
  server.resetHandlers();
});

// clean up after the tests finish
afterAll(() => {
  server.close();
});
