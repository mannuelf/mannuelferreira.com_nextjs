export interface Albumcover {
  id: string;
  url: string;
  likes: string;
}

export interface Cdart {
  id: string;
  url: string;
  likes: string;
  disc: string;
  size: string;
}

export interface Album {
  albumcover: Albumcover[];
  cdart: Cdart[];
}

export interface Hdmusiclogo {
  id: string;
  url: string;
  likes: string;
}

export interface Artistbackground {
  id: string;
  url: string;
  likes: string;
}

export interface Musiclogo {
  id: string;
  url: string;
  likes: string;
}

export interface Artistthumb {
  id: string;
  url: string;
  likes: string;
}

export interface Musicbanner {
  id: string;
  url: string;
  likes: string;
}

export interface FanArtArtistResponse {
  name: string;
  mbid_id: string;
  albums: Albums;
  hdmusiclogo: Hdmusiclogo[];
  artistbackground: Artistbackground[];
  musiclogo: Musiclogo[];
  artistthumb: Artistthumb[];
  musicbanner: Musicbanner[];
}
