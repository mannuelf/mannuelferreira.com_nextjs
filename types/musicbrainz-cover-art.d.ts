declare module MusicBrainzCoverArt {
  export interface Thumbnails {
    1200: string;
    250: string;
    500: string;
    large: string;
    small: string;
  }

  export interface Image {
    approved: boolean;
    back: boolean;
    comment: string;
    edit: number;
    front: boolean;
    id: any;
    image: string;
    thumbnails: Thumbnails;
    types: string[];
  }

  export interface RootObject {
    images: Image[];
    release: string;
  }
}
