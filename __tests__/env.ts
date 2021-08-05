describe('Environment variables', () => {
  it('Should load environment variables from .env', () => {
    expect(process.env.API_MOCKING).toBe('enabled');
  });
});

export {};
