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

interface TopArtistsResponse {
  topartists: {
    artist: Artist[];
    '@attr': Attribs;
  };
  images: ArtistImage;
}

interface WeeklyAlbumChartResponse {
  weeklyalbumchart: Weeklyalbumchart;
}

interface Weeklyalbumchart {
  album: WeeklyAlbum[];
  '@attr': WeeklyalbumchartAttr;
}

type WeeklyAlbum = {
  artist: { mbid: string; '#text': string };
  mbid: string;
  url: string;
  name: string;
  '@attr': { rank: string };
  playcount: string;
  image?: string;
};

interface WeeklyalbumchartAttr {
  from: string;
  user: string;
  to: string;
}
interface AlbumAttr {
  rank: string;
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
  cover: ArtistImage;
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

type ArtistImage = {
  name: string;
  photo: string;
  attribution: string;
  playcount: number;
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
