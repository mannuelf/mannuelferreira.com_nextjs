import { RequestMethod } from '@api/server.types';
import fetch from 'cross-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import BOOKS from './library';
import type { Book } from './library.types';

const readBooks = BOOKS.filter(books => books['read-count'] >= 1).splice(BOOKS.length/4);

const API_BASE_URL = `http://covers.openlibrary.org/b/isbn/`;
const coverSize = {
  S: 'S', M: 'M', L: 'L'
}

const fetchBookCovers = async (books: Book[]) => {
  for (let i = 0; i < (books.length); i++) {
    const book = books[i];
    const { ISBN, ISBN13, cover } = book;

    if (cover !== undefined) {
      continue;
    }

    const url = `${API_BASE_URL}${ISBN || ISBN13}-${coverSize.M}.jpg`;

    try {
      const response = await fetch(url);
      if (response) {
        const imageUrl =  url;
        book.cover =  imageUrl;
      }
    } catch (error) {
      console.log(`🔥 Failed to fetch cover for book with ISBN ${ISBN}: ${error}`);
    }
  }

  return books;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === RequestMethod.GET) {
    const books = await fetchBookCovers(readBooks);
    res.status(200).json(books)
  }
}
