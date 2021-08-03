import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset request handlers during tests, so to not affect other tests
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// clean up after the tests finish
afterAll(() => {
  cleanup();
  server.close();
});
