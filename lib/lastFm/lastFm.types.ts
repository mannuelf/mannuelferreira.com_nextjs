export interface User {
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

export interface TopArtistsResponse {
  topartists: {
    artist: Artist[];
    '@attr': Attribs;
  };
  images: ArtistImage;
}

export interface WeeklyAlbumChartResponse {
  weeklyalbumchart: Weeklyalbumchart;
}

export interface Weeklyalbumchart {
  album: WeeklyAlbum[];
  '@attr': WeeklyalbumchartAttr;
}

export type WeeklyAlbum = {
  artist: { mbid: string; '#text': string };
  mbid: string;
  url: string;
  name: string;
  '@attr': { rank: string };
  playcount: string;
  image?: string;
};

export interface WeeklyalbumchartAttr {
  from: string;
  to: string;
  user: string;
}

export interface AlbumAttr {
  rank: string;
}

export type Artist = {
  '@attr': {
    rank: number;
  };
  cover: ArtistImage;
  image?: string;
  mbid: string;
  name: string;
  playcount: number;
  streamable: number;
  url: string;
};

export type Image = {
  size: string;
  '#text': string;
};

export type Attribs = {
  page: number;
  perPage: number;
  user: string;
  total: number;
  totalPages: number;
};

export type ArtistImage = {
  name: string;
  photo: string;
  attribution: string;
  playcount: number;
};

export declare module LastFmRecentTracks {
  export interface Artist {
    mbid: string;
    '#text': string;
  }

  export interface Image {
    size: string;
    '#text': string;
  }

  export interface Album {
    mbid: string;
    '#text': string;
  }

  export interface Attr {
    nowplaying: string;
  }

  export interface Date {
    uts: string;
    '#text': string;
  }

  export interface Track {
    artist: Artist;
    streamable: string;
    image: '';
    mbid: string;
    album: Album;
    name: string;
    '@attr': Attr;
    url: string;
    date: Date;
  }

  export interface Attr2 {
    user: string;
    totalPages: string;
    page: string;
    perPage: string;
    total: string;
  }

  export interface Recenttracks {
    track: Track[];
    '@attr': Attr2;
  }

  export interface RecentTracksResponse {
    recenttracks: Recenttracks;
  }
}

export enum LastFmErrors {
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
