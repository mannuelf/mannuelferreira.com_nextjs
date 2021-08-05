interface TopArtists {
  topartists: {
    artist: Artist[];
    '@attr': Attribs;
  };
}

type Artist = {
  '@attr': {
    rank: number;
  };
  mbid: number;
  url: string;
  playcount: number;
  image: ArtistImage[];
  name: string;
  streamable: number;
};

type ArtistImage = {
  size: string;
  '#text': string;
};

type Attribs = {
  page: number;
  perPage: number;
  user: string;
  total: number;
  totalPages: number;
};

enum LastFmErrors {
  'InvalidService' = 2,
  'InvalidMethod' = 3,
  'AuthenticationFailed' = 4,
  'Invalid format' = 5,
  'Invalid parameters' = 6,
  'InvalidResourceSpecified' = 7,
  'OperationFailed' = 8,
  'Invalid session key' = 9,
  'InvalidApiKey' = 10,
  'ServiceOffline' = 11,
  'InvalidMethodSignatureSupplied' = 13,
  'TemporaryErrorRequest' = 16,
  'SuspendedApiKey' = 26,
  'RateLimitExceeded' = 29,
}
