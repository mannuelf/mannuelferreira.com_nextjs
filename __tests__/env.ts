describe('Environment variables', () => {
  it('Should load environment variables from .env', () => {
    expect(process.env.NEXT_PUBLIC_API_MOCKING).toBe('enabled');
  });
});

export {};
