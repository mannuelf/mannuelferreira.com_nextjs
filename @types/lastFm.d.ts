interface User {
  user: {
    playlists: string;
    playcount: string;
    gender: string;
    name: string;
    subscriber: string;
    url: string;
    country: string;
    image: Image[];
    registered: {
      unixtime: string;
      '#text': number;
    };
    type: string;
    age: string;
    bootstrap: string;
    realname: string;
  };
}

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
  image: Image[];
  name: string;
  streamable: number;
  cover: [];
};

type Image = {
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
