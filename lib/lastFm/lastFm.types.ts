export declare namespace LastFm {
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

  export interface Image {
    size: string;
    '#text': string;
  }

  export interface Registered {
    unixtime: string;
    '#text': number;
  }

  export interface User {
    name: string;
    age: string;
    subscriber: string;
    realname: string;
    bootstrap: string;
    playcount: string;
    artist_count: string;
    playlists: string;
    track_count: string;
    album_count: string;
    image: Image[];
    registered: Registered;
    country: string;
    gender: string;
    url: string;
    type: string;
  }

  export interface UserResponse {
    user: User;
  }

  export enum Errors {
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
}
