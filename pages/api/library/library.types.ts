// 
export type ReadStatus = {
  TOREAD: ''
}
export type Book = {
  'additional-authors': string;
  'author-l-f': string;
  'average-rating': number;
  'back-cover'?: string | null;
  'binding': string;
  'bookshelves-with-positions': string;
  'date-added': string;
  'date-read': string;
  'exclusive-shelf': string;
  'cover': string | null;
  'my-rating'?: number;
  'my-review'?: string;
  'number-of-pages': number;
  'original-publication-year': string;
  'owned-copies': number;
  'private-notes'?: string;
  'publisher': string;
  'read-count': number;
  'year-published': number;
  author: string;
  book_id: number;
  bookshelves: string;
  ISBN: string;
  ISBN13: number;
  spoiler?: string;
  title: string;
}
