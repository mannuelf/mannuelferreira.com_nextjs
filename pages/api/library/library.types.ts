export type Book = {
  'additional-authors': string;
  'author-l-f': string;
  'average-rating': number;
  'binding': string;
  'bookshelves-with-positions': string;
  'date-added': string;
  'date-read': string;
  'exclusive-shelf': string;
  'cover': string;
  'my-rating': number;
  'my-review': string;
  'number-of-pages'?: number | undefined;
  'original-publication-year'?: number | undefined;
  'owned-copies': number;
  'private-notes': string;
  'publisher': string;
  'read-count': number;
  'year-published'?: number | undefined;
  author: string;
  book_id: number;
  bookshelves: string;
  ISBN?: string | undefined;
  ISBN13?: number | undefined;
  spoiler: string;
  title: string;
}
